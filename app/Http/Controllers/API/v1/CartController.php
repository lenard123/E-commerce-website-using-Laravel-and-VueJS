<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Cart;
use App\Model\Products;

class CartController extends Controller
{
    public function add(Request $request)
    {
    	/*
		 * 1st check if product already on cart
		 * 2nd if Not Insert
		 * 3rd else Update
    	 */
    	//$this->validateRequest($request);

    	$carts = Cart::where(['customer_id'=>session('USERID'), 'product_id'=>$request->id]);
    	if ($carts->count() < 1) {
    		$this->insertCart($request);
    	} else {
    		if ($request->quantity > 0)
 		   		$this->updateCart($request, $carts);
 		   	else 
 		   		$this->deleteCart($request, $carts);
    	}
    }

    private function validateRequest($request)
    {
    	$this->validate($request, [
    		'quantity' => 'required|numeric',
    		'id' => 'required|exists:products,id'
    	]);    }

    private function deleteCart($request, $carts)
    {
    	$quantity = $carts->first()->cart_quantity - $request->quantity;
    	$carts->first()->delete();
    	$this->updateProduct($request->id, $quantity); 	
    }

    private function insertCart($request)
    {
    	if ($this->validateQuantity($request)) return;

    	$id = $request->id;

    	$cart = new Cart();
    	$cart->customer_id = session('USERID');
    	$cart->product_id = $id;
    	$cart->cart_quantity = $request->quantity;

    	$cart->save();

    	$this->updateProduct($id, $request->quantity*-1);
    }

    private function updateCart($request, $carts)
    {
    	if ($this->validateQuantity($request, $carts)) return;
    	$quantity = $carts->first()->cart_quantity - $request->quantity;

    	$carts = $carts->first();
    	$carts->cart_quantity = $request->quantity;
    	$carts->save();

    	$this->updateProduct($request->id, $quantity);
    }

    private function updateProduct($id, $quantity)
    {
    	$products = Products::find($id);
    	$products->product_quantity = $products->product_quantity+$quantity;
    	$products->save();
    }

    private function validateQuantity($request, $carts = null)
    {
    	$x = isset($carts) ? $carts->first()->cart_quantity : 0;
    	$quantity = $request->quantity - $x;
    	return $quantity > Products::find($request->id)->product_quantity;
    }
}
