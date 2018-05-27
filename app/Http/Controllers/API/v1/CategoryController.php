<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilityController;
use App\Model\Category;

class CategoryController extends Controller
{
	var $default_image = 'images/category/default.jpg';
	var $default_directory = 'images/category';
	var $default_result = ['status' => 'success', 'message'=>[]];

	/**
	 * Get all Categories
	 * 
	 * @return Response JSON result
	 */
    public function index()
    {
    	return response()->json(Category::all());
    }

    /**
     * Insert Category
     * @param Request $request
     * @return Response JSON result
     */
    public function store(Request $request)
    {
    	$this->validateInput($request);

    	$category_name = $request->category_name;
    	$category_description = $request->category_description;
    	$category_image = $this->getPath($request);

    	$this->insertCategory($category_name, $category_description, $category_image);

    	return response()->json($this->default_result);
    }

    /**
     * Delete an item from categories
     * @param Int $id Category Id
     * @return Response JSON result
     */
    public function destroy($id)
    {
        $image = Category::find($id)->category_image;
        if ($this->deleteCategory($id)) 
            $this->deleteImage($image);
        
        return response()->json($this->default_result);
    }

    /**
     * Get Category By Id
     * @param Int $id Category id
     * @return Response JSON result
     */
    public function show($id)
    {
        return response()->json(Category::find($id));
    }

    /**
     * Update Category
     * @param Request $request
     * @param Int $id category id
     * @return Response JSON result
     */
    public function update(Request $request, $id)
    {
        $this->validateInput($request);

        $default_image = Category::find($id)->category_image;

        $category_name = $request->category_name;
        $category_description = $request->category_description;
        $category_image = $this->getPath($request, $default_image);

        if($this->updateCategory($id, $category_name, $category_description, $category_image))
            $this->deleteImage($default_image);

        return response()->json($this->default_result);
    }

    /**
     * Update Category
     * @param Int $id Category id
     * @param String $category name
     * @param String $category description
     * @param String $category image
     * 
     */
    private function updateCategory($id, $category_name, $category_description, $category_image)
    {
        try {
            $category = Category::find($id);
            $category->category_name = $category_name;
            $category->category_description = $category_description;
            $category->category_image = $category_image;
            $category->save();
            array_push($this->default_result['message'], 'Category updated successfully');
            return true;
        } catch (Exception $e) {
            $this->default_result['status'] = 'failed';
            array_push($this->default_result['message'], 'Failed to update category');
            return false;
        } 
    }

    /**
     * Delete an image
     * @param String $path Location of image
     * 
     */
    private function deleteImage($path)
    {
        if ($path != $this->default_image)
            UtilityController::deleteFile($path);
    }

    /**
     * Delete category
     * @param Int $id Category id
     * @return Boolean Is deleted
     */
    private function deleteCategory($id)
    {
        try {
            $category = Category::find($id);
            $category->delete();
            array_push($this->default_result['message'], 'Category deleted successfully');
            return true;
        } catch (Exception $e) {
            $this->default_result = ['status'=> 'failed', 'message'=> ['Failed to delete']];
            return false;
        }
    }

    /**
     * Validate Input
     * @param Request $request
     * @return Response isValid
     */
    private function validateInput($request)
    {
    	return $this->validate($request,[
    		'category_name' => 'required',
    		'category_image' => 'nullable|image'
    	]);
    }

    /**
     * Get the Image uploaded path for insert
     * @param Request $request
     * @return String path
     */
    private function getPath($request, $image = null)
    {
        $path = is_null($image) ? $this->default_image : $image;
    	$file = $request->file('category_image');

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
     * Insert category
     * @param String Category Name
     * @param String Category Description
     * @param String Category Image
     *
     */
    private function insertCategory($category_name, $category_description, $category_image)
    {
    	$message = '';
    	try {
    		$category = new Category;
    		$category->category_name = $category_name;
    		$category->category_description = $category_description;
    		$category->category_image = $category_image;
    		$category->save();
    		$message = 'Category inserted successfully';
    	} catch (Exception $e) {
    		$this->default_result['status'] = 'failed';
    		$message = 'Failed to insert category';
    	} finally {
    		array_push($this->default_result['message'], $message);
    	}
    }
}
