<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Model\Customer;

class CustomerController extends Controller
{
	private $default_status = ['status'=>'success', 'message'=>[]];

    public function index()
    {
        $customer = Customer::all();
        foreach (Customer::all() as $key => $value) {
            $customer[$key]['orders'] = $value->order->count();
        }
        return $customer;
    }

    public function store(Request $request)
    {
    	$this->isValid($request);
    	$this->insertCustomer($request);
    	return response()->json($this->default_status);
    }

    public function getOrders($id)
    {
        $customer = Customer::find($id);
        $orders = [];
        foreach ($customer->order as $key => $value) {
            $orders[$key]['id'] = $value->id;
            $orders[$key]['order_status'] = $value->order_status;
            $orders[$key]['created_at'] = $value->created_at;
            $orders[$key]['order_quantity'] = $value->order_item->sum('order_item_quantity');
            $orders[$key]['order_price'] = 0;
            foreach ($value->order_item as $index => $order_item) {
                $orders[$key]['order_price'] += $order_item->order_item_quantity*$order_item->product->product_price;

            }
        }
        return $orders;
    }

    public function login(Request $request)
    {
    	$this->validate($request,[
    		'user'=>'required',
    		'password'=>'required'
    	]);

    	$user = $request->user;
    	$password = $request->password;

    	$column = '';

    	if (Customer::where('customer_user', $user)->count() == 1) 
    		$column = 'customer_user';
    	else if (Customer::where('customer_email', $user)->count() == 1) 
    		$column = 'customer_email';
    	else {
    		$this->default_status['status'] = 'failed';
    		$this->default_status['message'] = ['Invalid username or password1'];
    	}

    	if ($column != '' && $this->chkPassword($user, $password, $column)) {
    		$id = Customer::where($column, $user)->first()->id;
    		session(['USERLOG'=>'IN', 'USERID'=>$id]);
    		$this->default_status['message'] = ['Successfully Login'];
    	} else {
    		$this->default_status['status'] = 'failed';
    		$this->default_status['message'] = ['Invalid username or password'];
    	}

    	return response()->json($this->default_status);
    }

    public function logout(Request $request)
    {
        session(['USERLOG'=> 'OUT']);
        $request->session()->forget('USERID');
        return response()->json($this->default_status);
    }




    /**
     * Check Password
     * @param {String} usename
     * @param {String} password
     * @param {String} (customer_user|customer_email)
     * @return {Boolean} Is password match
     */
    private function chkPassword($user, $pass, $col)
    {
    	$password = Customer::where($col ,$user)->first()->customer_pass;
    	return Hash::check($pass, $password);
    }

    private function insertCustomer($request) {
    	try {
	    	$customer = new Customer;
	    	$customer->customer_name = $request->name;
	    	$customer->customer_user = $request->username;
	    	$customer->customer_email = $request->email;
	    	$customer->customer_pass = Hash::make($request->password);
	    	$customer->save();
	    	$this->default_status['message'] = ['Account created successfully'];
    	} catch (Exception $error) {
    		$this->default_status['status'] = 'failed';
	    	$this->default_status['message'] = ['An error occured'];
    	}
    }





    private function isValid($request)
    {
    	return $this->validate($request, [
    		'name' => 'required|unique:customers,customer_name',
    		'username' => 'required|unique:customers,customer_user',
    		'email' => 'required|email|unique:customers,customer_email',
    		'password' => 'required'
    	]);
    }
}
