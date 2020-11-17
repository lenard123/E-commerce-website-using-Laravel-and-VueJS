<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilityController;
use App\Model\Products;

class ProductController extends Controller
{
	var $default_image = 'images/product/default.jpg';
	var $default_directory = 'images/product';
	var $default_result = ['status' => 'success', 'message'=>[]];










    /**
     * Get all products
     * @param {Request} $request
     * @return {Response} JSON encode
     */
   	public function index(Request $request)
   	{
   		//Filter result
   		$products = Products::all(); 
   		$x = [];
   		foreach($products as $product) 
   			if ($product->subcategory->category_id == $request->id) 
   				array_push($x, $product);
   		
   		return response()->json($x);
   	}

   	/**
   	 * Add Product
   	 * @param {Request} $request
   	 * @return {Response} JSON encode
   	 */
   	public function store(Request $request)
   	{
   		$this->validateInput($request);					//Validate Request
   		$this->insertProduct($request);					//Insert Product
   		return response()->json($this->default_result);	//Return Response
   	}

   	/**
   	 * Delete Product
   	 * @param {Int} $id
   	 * @return {Response} JSON encode
   	 */
   	public function destroy($id)
   	{
   		$image = Products::find($id)->product_image;	//Get image
   		$delete = $this->deleteProduct($id);			//Delete Product
   		if ($delete) $this->deleteImage($image);		//Delete if image if product delete successfully
   		return response()->json($this->default_result); //Return Result
   	}

   	/**
   	 * Get Product
   	 * @param {Int} $id
   	 * @return {Response} JSON encode
   	 */
   	public function show($id)
   	{
   		return response()->json(Products::find($id));
   	}

   	/**
   	 * Update Product
   	 * @param {Request} $request
   	 * @param {Int} $id Product id
   	 * @return {Response} JSON encode
   	 */
   	public function update(Request $request, $id)
   	{
   		$this->validateInput($request);								//Validate request
   		$oldImage = Products::find($id)->product_image;				//Get old image
   		$newImage = $this->getPath($request, $oldImage);			//Upload image and get it's path
   		$update = $this->updateProduct($request, $id, $newImage);	//Update product
   		if ($update) $this->deleteImage($oldImage, $newImage);		//delete image is updated successfully
   		return response()->json($this->default_result); 			//Return response
   	}










   	/**
   	 * Insert product on database
   	 * @param {Request} $request
   	 *
   	 */
   	private function insertProduct($request)
   	{
   		try {
   			$products = new Products;
   			$products->subcategory_id = $request->subcategory_id;
   			$products->product_name = $request->product_name;
   			$products->product_description = $request->product_description;
   			$products->product_price = $request->product_price;
   			$products->product_quantity = $request->product_quantity;
   			$products->product_image = $this->getPath($request);
   			$products->save();
   			array_push($this->default_result['message'], 'Product inserted successfully');
   		} catch (Exception $e) {
   			$this->default_result['status'] = 'failed';
   			array_push($this->default_result['message'], 'Failed to insert product');
   		}
   	}

   	/**
   	 * Update Product on database
   	 * @param {Request} $request
	 * @param {Int} $id Product id
	 * @param {String} $image New image
	 * @return {Boolean} Is updated
	 */
   	private function updateProduct($request, $id, $image)
   	{
   		try {
   			$product = Products::find($id);
   			$product->subcategory_id = $request->subcategory_id;
   			$product->product_name = $request->product_name;
   			$product->product_description = $request->product_description;
   			$product->product_price = $request->product_price;
   			$product->product_quantity = $request->product_quantity;
   			$product->product_image = $image;
   			$product->save();
   			$this->pushMessage('Product updated successfully');
   			return true;
   		} catch (Exception $e) {
   			$this->default_result['status'] = 'failed';
   			$this->pushMessage('Failed to update product');
   			return false;
   		}
   	}

   	/**
   	 * Delete product on database
   	 * @param {Int} $id Product id
   	 * @return {Boolean} Is deleted
   	 */
   	private function deleteProduct($id)
   	{
   		try {
   			$product = Products::find($id);
   			$product->delete();
   			array_push($this->default_result['message'], 'Product has been deleted successfully');
   			return true;
   		} catch (Exception $e) {
   			array_push($this->default_result['message'], 'Failed to delete product');
   			return false;
   		}
   	}










   	/**
   	 * Upload image and get it's path
   	 * @param {Request} $request
   	 * @param {String} OPTIONAL specify default image
   	 * @return {String} path
   	 */
   	private function getPath($request, $image = null)
    {
        $path = is_null($image) ? $this->default_image : $image;
    	$file = $request->file('product_image');

    	if (!is_null($file)) {    	
			$upload = UtilityController::upload($file, $this->default_directory, time() . '.jpg');  			
			if ($upload['status']) 
				$path = $upload['path'];
			else
				array_push($this->default_result['message'], 'An error occured while uploading your image');
    	} 

    	return $path;
    }

    /**
     * Push message
     * @param {String} message
     * 
     */
    private function pushMessage($message)
    {
    	array_push($this->default_result['message'], $message);
    }

    /**
     * Delete an image
     * @param {String} $path Location of image
     * @param {String} $default OPTIONAL specify the default image
     */
    private function deleteImage($path, $default_image=null)
    {
    	$default_image = is_null($default_image) ? $this->default_image : $default_image;
        if ($path != $default_image)
            UtilityController::deleteFile($path);
    }


   	/**
   	 * Validate request
   	 * @param {Request} $request
   	 * 
   	 */
   	private function validateInput($request)
   	{
   		$this->validate($request, [
   			'subcategory_id' => 'required|exists:subcategories,id',
   			'product_name' => 'required',
   			'product_image' => 'nullable|image',
   			'product_price' => 'required|numeric',
   			'product_quantity' => 'required|numeric'
   		]);
   	}
}