<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Home page
Route::get('/', 'View\IndexController@index');
Route::get('/signup', 'View\IndexController@signup');
Route::get('/login', 'View\IndexController@login');

//Admin page
Route::group(['middleware' => 'VerifyLogin'], function() {
	Route::get('admin/login', 'View\AdminController@login');
	Route::get('admin', 'View\AdminController@index');
});


//Authentication
Route::post('api/v1/login', 'API\v1\AuthController@login');
Route::get('api/v1/logout', 'API\v1\AuthController@logout');	


Route::group(['middleware' => ['XSSProtection', 'ActivityLog']], function() {
	Route::resource('api/v1/admin', 'API\v1\AdminController');
	Route::resource('api/v1/category', 'API\v1\CategoryController');
	Route::resource('api/v1/subcategory', 'API\v1\SubcategoryController');
	Route::resource('api/v1/product', 'API\v1\ProductController');

	Route::get('api/v1/order', 'API\v1\OrderController@getAllOrders');
	Route::get('api/v1/order/{id}', 'API\v1\OrderController@getOrderDetails');
	Route::get('api/v1/order/cancel/{id}', 'API\v1\OrderController@cancelOrder');
	Route::get('api/v1/order/complete/{id}', 'API\v1\OrderController@completeOrder');

	Route::get('api/v1/customer', 'API\v1\CustomerController@index');
	Route::get('api/v1/customer/{id}', 'API\v1\CustomerController@getOrders');
});

Route::group(['middleware' => 'UserMiddleware'], function() {
	Route::get('api/v1/user/subcategory', 'API\v1\SubcategoryController@allSubcategory');
	Route::get('api/v1/user/category', 'API\v1\CategoryController@index');
	Route::post('api/v1/user/cart/add', 'API\v1\CartController@add');
	Route::get('api/v1/user/order', 'API\v1\OrderController@getOrder');
	Route::post('api/v1/user/order/add', 'API\v1\OrderController@add');
	Route::get('api/v1/user/order/{id}', 'API\v1\OrderController@getOrderItem');
	Route::get('api/v1/user/order/cancel/{id}', 'API\v1\OrderController@cancelOrder');
	Route::get('api/v1/user/customer/logout', 'API\v1\CustomerController@logout');
});


Route::post('api/v1/user/customer', 'API\v1\CustomerController@store')->middleware('XSSProtection');
Route::post('api/v1/user/customer/login', 'API\v1\CustomerController@login');

//Test case
use App\Model\Category;
use App\Model\Subcategory;
use App\Model\Products;
use App\Model\Customer;
use App\Model\Order;
use App\Model\OrderItem;
use App\Http\Fpdf\Fpdf;

class Pdf extends Fpdf
{
	// Simple table
	function BasicTable($data)
	{
	    // Data
	    foreach($data as $row)
	    {
	        foreach($row as $col)
	            $this->Cell(120,9,$col,0);
	        $this->Ln();
	    }
	}	
}

Route::get('a', function(Request $request) {
	$data = [
		['2 X Apple', '$20.00'],
		['4 X Orange', '$5.25'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75'],
		['4 X Grapes', '$10.75']
	];

	$height = (8*count($data)); //28
	$width = 170;
	$orientation = $width > $height ? 'L' : 'P';//P'60
	$pdf = new Pdf('P', 'pt', array($height, $width));
	$pdf->setMargins(1, 4);
	$pdf->AddPage();
	$pdf->SetFont('Arial','', 8);
	$pdf->BasicTable($data);
	$output = $pdf->Output();
	/*$orderItem = OrderItem::where('order_id',6)->get()*/
	return response($output)->file();
});