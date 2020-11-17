<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UtilityController extends Controller
{
	/** 
	 * Upload File
	 * @param File $file the to be uploaded
	 * @param String $dir Directory of file
	 * @param String $name Name 0f file
	 * @return Object upload status
	 */
	public static function upload($file, $dir, $name) {
		$upload = [];

		try {			
			$upload = [
				'status'=> true, 
				'path' => $file->storeAs($dir, $name)
			];
		} catch (Exception $e) {
			$upload = ['status'=>false];		
		}
		
		return $upload;
	}

	/**
	 * Delete File
	 * @param String $path
	 * @return Boolean delete status
	 */
	public static function deleteFile($path)
	{
		try {
			Storage::delete($path);
			return true;
		} catch (Exception $e) {
			return false;
		}
	}
}
