<?php

namespace App\Http\Controllers\View;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
	/**
	 * View Index
	 * @param Request $request
	 * @return View
	 */
	public function index(Request $request)
	{
		return view('admin.index');
	}



	/**
	 * View Login
	 * @param Request $request
	 * @return View
	 */
    public function login(Request $request)
    {
    	return view('admin.login');
    }
}
