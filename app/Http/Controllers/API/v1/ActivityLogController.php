<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\ActivityLog;

class ActivityLogController extends Controller
{
	/**
	 * Insert Activity
	 * @param REQUIRED Int $id Admin id
	 * @param REQUIRED String $action
	 */
    public static function insertActivity($action)
    {
    	$activity = new ActivityLog;
    	$activity->admin_id = session('ID');
    	$activity->action = $action;
    	$activity->save();
    }
}
