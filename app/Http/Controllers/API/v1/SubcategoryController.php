<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilityController;
use App\Model\Subcategory;

class SubcategoryController extends Controller
{
	var $default_image = 'images/subcategory/default.jpg';
	var $default_directory = 'images/subcategory';
	var $default_result = ['status' => 'success', 'message'=>[]];

	/**
	 * Get all subcategory
     *
	 * @return Response JSON result
	 */
    public function index()
    {
    	return response()->json(Subcategory::all()); //Return all Subcategory in JSON form
    }

    /**
     * Get All Subcategory (User end)
     * @param Request $request
     * @return Response JSON result
     */
    public function allSubcategory(Request $request)
    {
        $this->validate($request, ['id'=>'required|exists:categories,id']);
        $allSubcat = Subcategory::where('category_id', $request->id)->get();
        $subcat = [];
        foreach ($allSubcat as $subcategory) {
            $x = [];
            $x['id'] = $subcategory->id;
            $x['category_id'] = $subcategory->category_id;
            $x['subcategory_name'] = $subcategory->subcategory_name;
            $x['subcategory_description'] = $subcategory->subcategory_description;
            $x['subcategory_image'] = $subcategory->subcategory_image;
            $x['created_at'] = $subcategory->created_at;
            $x['updated_at'] = $subcategory->updated_at;
            $x['products'] = $subcategory->products;
            array_push($subcat, $x);
        }
        return $subcat;
    }

    /**
     * Add/insert Subcategory
     *
     * @return Response JSON result
     */
    public function store(Request $request)
    {
    	$this->validateInput($request);

    	$category_id = $request->category_id;
    	$subcategory_name = $request->subcategory_name;
    	$subcategory_description = $request->subcategory_description;
    	$subcategory_image = $this->getPath($request);

    	$this->insertSubcategory($category_id, $subcategory_name, $subcategory_description, $subcategory_image);

    	return response()->json($this->default_result);
    }

    /**
     * Delete Subcategory 
     * @param SubcategoryId $id
     * @return Response JSON result
     */
    public function destroy($id)
    {
    	$image = Subcategory::find($id)->subcategory_image;	//1. Get Old Image
    	$delete = $this->deleteSubcategory($id);			//2. Delete Subcategory 
    	if ($delete) $this->deleteImage($image);			//3. Delete Image if deleted
    	return response()->json($this->default_result);		//4. Return Response
    }

    /**
     * Update Subcategory
     * @param {Request} $request
     * @param {int} $id Subcategory Id
     * @return {Response} JSON result
     */
    public function update(Request $request, $id)
    {
    	$this->validateInput($request); 							//1. Validate Request
    	$default_image = Subcategory::find($id)->subcategory_image; //2. Get old image
    	$newImage = $this->getPath($request, $default_image); 		//3. Uploaded image
    	$update = $this->updateCategory($request, $id, $newImage);  //4. Update Subcategory
    	if ($update) $this->deleteImage($default_image, $newImage); //5. Delete Image if updated
    	return response()->json($this->default_result);				//6. return Response
    }

    /**
s     * Show Category
     * @param (id) Subcategory id
     * @return {Response} JSON result
     */
    public function show($id)
    {
    	return response()->json(Subcategory::find($id));
    }




    





    /**
     * @param {Request} $request 
     * @param (int) $id Subcategory id
     * @param "String" $newImage
     * @return {Boolean} isUpdated
	 */
    private function updateCategory($request, $id, $newImage)
    {
    	try {
        	$subcategory = Subcategory::find($id);
	    	$subcategory->subcategory_name = $request->subcategory_name;
	    	$subcategory->subcategory_description = $request->subcategory_description;
	    	$subcategory->subcategory_image = $newImage;
	    	$subcategory->save();
	    	array_push($this->default_result['message'], 'Subcategory updated successfully');
	    	return true;
	    } catch (Exception $e) {
	    	$this->default_result = ['status'=>'failed', 'message'=>['Failed to update subcategory']];
	    	return false;
	    }

    }

    /**
     * Delete Subcategory
     * @param SubcategoryId $id
     * @return Boolean deleted
     */
    private function deleteSubcategory($id)
    {
        try {
            $subcategory = Subcategory::find($id);
            $subcategory->delete();
            array_push($this->default_result['message'], 'Subcategory deleted successfully');
            return true; 
        } catch (Exception $e) {
            $this->default_result = ['status'=>'failed', 'message'=>['Failed to delete subcategory']];
            return false;
        }
    }

    /**
     * Insert Subategory
     * @param Int Category id 
     * @param String Subcategory Name
     * @param String Subcategory Description
     * @param String Subcategory Image
     *
     */
    private function insertSubcategory($category_id, $subcategory_name, $subcategory_description, $subcategory_image)
    {
        $message = '';
        try {
            $subcategory = new Subcategory;
            $subcategory->category_id = $category_id;
            $subcategory->subcategory_name = $subcategory_name;
            $subcategory->subcategory_description = $subcategory_description;
            $subcategory->subcategory_image = $subcategory_image;
            $subcategory->save();
            $message = 'Subcategory inserted successfully';
        } catch (Exception $e) {
            $this->default_result['status'] = 'failed';
            $message = 'Failed to insert subcategory';
        } finally {
            array_push($this->default_result['message'], $message);
        }
    }


	







    /**
     * Delete an image
     * @param "String" $path Location of image
     * @param "String" $default image will not be deleted
     */
    private function deleteImage($path, $default_image=null)
    {
        if ($path != $default_image && $path != $this->default_image)
            UtilityController::deleteFile($path);
    }

    /**
     * Get the Image uploaded path for insert
     * @param Request $request
     * @return String path
     */
    private function getPath($request, $image = null)
    {
        $path = is_null($image) ? $this->default_image : $image;
    	$file = $request->file('subcategory_image');

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
     * Validate Input
     * @param Request $request
     *
     */
    private function validateInput($request)
    {
    	$this->validate($request, [
    		'category_id' => 'required|exists:categories,id',
    		'subcategory_name' => 'required',
    		'subcategory_image' => 'nullable|image'
    	]);
    }
}