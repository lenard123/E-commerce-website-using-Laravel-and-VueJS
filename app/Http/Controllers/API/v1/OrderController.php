<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Order;
use App\Model\Cart;
use App\Model\OrderItem;
use App\Model\Products;

class OrderController extends Controller
{
	private $default_result = ['status'=>'success', 'message'=>[]];


    public function getOrderDetails($id)
    {
        $order = Order::find($id);
        $order->order_item;
        foreach ($order->order_item as $key => $value) {
            $value->product;
        }
        return response()->json($order);
    }

    /**
     * Get Order of current user
     *
     * @return  {Order[]}
     */
	public function getOrder()
	{
		$order = Order::where('customer_id', session('USERID'))->latest()->get();
		foreach ($order as $item => $value) {
			
			$quantity = 0;
			$price = 0;

			foreach ($value->order_item as $order_item) {
				$quantity += $order_item->order_item_quantity;
				$price += $order_item->order_item_quantity*Products::find($order_item->product_id)->product_price;
			}

			$order[$item]['order_quantity'] = $quantity;
			$order[$item]['order_price'] = $price;

		}
		return response()->json($order);
	}


    /**
     * Get all orders
     * 
     * @return  {Order[]} all orders
     */
    public function getAllOrders()
    {
        $order = Order::select('*')->latest();
        $x = [];
        foreach ($order->get() as $key => $item) {
            $x[$key]['id'] = $item->id; 
            $x[$key]['customer_name'] = $item->customer->customer_name;
            $x[$key]['order_item'] = $item->order_item->sum('order_item_quantity');
            $x[$key]['order_price'] = 0;

            foreach ($item->order_item as $i => $order) {//20000
                $x[$key]['order_price'] += $order->order_item_quantity*$order->product->product_price;
            }

            $x[$key]['order_status'] = $item->order_status;
            $x[$key]['created_at'] = $item->created_at;
        }
        return response()->json($x);
    }


    /**
     * Get Order's item
     * @param {Order->order_id} $id
     * @return  {OrderItem}
     */
    public function getOrderItem($id)
	{
		$order_item = OrderItem::where('order_id', $id)->get();
		foreach ($order_item as $key => $value) {
			$order_item[$key]['product'] = $value->product;
		}
		$order_item['order'] = Order::find($id);
		return $order_item;
	}

	public function cancelOrder($id)
	{
		$order = Order::find($id);
		foreach ($order->order_item as $key => $value) {
			$this->updateProduct($value->product_id, $value->order_item_quantity);
		}
		$order->order_status = 'cancel';
		$order->save();
		return response()->json($this->default_result);
	}

    public function completeOrder($id)
    {
        $order = Order::find($id);
        $order->order_status = 'complete';
        $order->save();
        return response()->json($this->default_result);
    }

	/**
	 * Place Order
	 * @param 	{Request} 	$request
	 * @return 	{Response}	JSON result
	 */
    public function add(Request $request)
    {

    	$cart = Cart::where('customer_id', session('USERID'));

    	if ($cart->count() < 1) {
    		return response()->json(['status'=>'failed', 'message'=>['You have no item in cart.']]);
    	}

    	$this->validateRequest($request);

    	$orderId = $this->createOrder($request);

    	return response()->json($this->transferCart($orderId, $cart));

    }

    private function updateProduct($id, $quantity)
    {
    	$products = Products::find($id);
    	$products->product_quantity = $products->product_quantity+$quantity;
    	$products->save();
    }    

    /**
     * Validate Request
     * @param 	{Request} 	$request
     * @param 	{Cart} 		$cart
     *
     */
    private function validateRequest($request)
    {

    	$this->validate($request, [
    		'firstname' => 'required',
    		'lastname' => 'required',
    		'address1' => 'required',
    		'phone' => 'required',
    		'city' => 'required',
    		'state' => 'required',
    		'postalcode' => 'required'
    	]);
    }

    /**
     * Create Order
     * @param 	{Request}	$request
     * @return 	{Integer}	$orderId
     */
    private function createOrder($request)
    {
    	$order = new Order;
    	$order->customer_id = session('USERID');
    	$order->order_firstname = $request->firstname;
    	$order->order_lastname = $request->lastname;
    	$order->order_address1 = $request->address1;
    	$order->order_address2 = $request->address2;
    	$order->order_phone = $request->phone;
    	$order->order_city = $request->city;
    	$order->order_state = $request->state;
    	$order->order_postalcode = $request->postalcode;
    	$order->save();

    	return Order::all()->last()->id;
    }

    /**
     * Transfer cart item to order item
     * @param 	{Integer} 	OrderId
     * @param 	{Cart}		$cart 
     *
     */
    private function transferCart($orderId, $cart)
    {
    	try {
	    	foreach ($cart->get() as $item) {
    			$orderItem = new OrderItem;
    			$orderItem->order_id = $orderId;
    			$orderItem->product_id = $item->product_id;
    			$orderItem->order_item_quantity = $item->cart_quantity;
    			$orderItem->save(); 
    		}	
	    	$cart->delete();
	    	return ['status'=> 'success', 'message'=>['Your order place, successfully']];
	    } catch (Exception $err) {
	    	OrderItem::where('order_id', $orderId)->delete();
	    	return ['status'=>'failed', 'message'=>['failed to place order']];
	    }
    }

}
