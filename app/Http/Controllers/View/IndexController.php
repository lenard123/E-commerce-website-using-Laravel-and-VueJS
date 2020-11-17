<?php

namespace App\Http\Controllers\View;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IndexController extends Controller
{
	/**
	 * View the index page
	 * 
	 * @return View index page
	 */
    public function index()
    {
    	return view('index.index');
    }

    /**
     * View the sign up page
     * @param {Request} $request
     * @return {View} sign up page
     */
    public function signup(Request $request)
    {
    	$data['request'] = $request;
    	return view('index.signup', $data);
    }

    /**
     * View the login page
     * @param {Request} $request
     * @return {View} login page
     */
    public function login(Request $request)
    {
    	$data['request'] = $request;
    	return view('index.login', $data);
    }

}
