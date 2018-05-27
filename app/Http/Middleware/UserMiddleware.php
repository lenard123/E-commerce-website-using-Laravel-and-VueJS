<?php

namespace App\Http\Middleware;

use Closure;
use App\Model\Cart;
use App\Model\Order;
use App\Model\Customer;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $x = [
                'result'=> $response->original, 
                'status' => ['LOG'=> session('USERLOG')]
            ];
        
        if ($x['status']['LOG'] == 'IN') {
            $x['status']['USERID'] = session('USERID');
            $x['status']['ORDER_QUANTITY'] = $this->getOrder();
            $x['status']['CARTS'] = $this->getCart();
            $x['status']['USER'] = Customer::find(session('USERID'));
        }

        $result = response()->json($x);
        

        return $result;
    }

    private function getOrder(){
        return Order::where('customer_id', session('USERID'))->count();
    }

    private function getCart()
    {
        $cart = [];
        $carts = Cart::where('customer_id', session('USERID'))->get();
        foreach ($carts as $value) {
            $x = [];
            $x['id'] = $value->id;
            $x['product_id'] = $value->product_id;
            $x['customer_id'] = $value->customer_id;
            $x['cart_quantity'] = $value->cart_quantity;
            $x['product'] = $value->product;
            array_push($cart, $x);
        }  
        return $cart;
    }
}
