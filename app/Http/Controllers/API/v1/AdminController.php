<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Admins;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\UtilityController;

class AdminController extends Controller
{

    private $default_image = 'images/admins/default.jpg';
    private $default_directory = 'images/admins';
    private $default_result = [
        'status' => 'success',
        'message'=> []
    ];

    public function index()
    {
        return Admins::where('id', '!=', 1)->get();
    }

    public function destroy($id)
    {
        $admins = Admins::find($id);
        $admins->delete();
        array_push($this->default_result['message'], 'Deleted successfully');
        return response()->json($this->default_result);
    }

    public function store(Request $request)
    {
        $this->validateAdmin($request);

        $admin_image = $this->getPath($request);

        $this->insertAdmin($request, $admin_image);

        return response()->json($this->default_result);
    }

    /**
     * Show admin by Id
     * @param Request $request, Int $id
     * @return Response JSON result
     */
    public function show(Request $Request, $id)
    {
    	return response()->json(Admins::find($id)->get()->first());
    }

    private function validateAdmin($request)
    {
        $this->validate($request, [
            'admin_name' => 'required',
            'admin_user' => 'required|unique:admins,admin_user',
            'admin_type' => 'required|numeric',
            'admin_pass' => 'required',
            'admin_image'=> 'nullable|image'
        ]);
    }

    private function insertAdmin($request, $image)
    {
        try {
            $admin = new Admins;
            $admin->admin_name = $request->admin_name;
            $admin->admin_user = $request->admin_user;
            $admin->admin_pass = Hash::make($request->admin_pass);
            $admin->admin_type = $request->admin_type;
            $admin->admin_image= $image;
            $admin->save();

            array_push($this->default_result['message'], 'Admin added successfully');
        } catch (Exception $e) {
            $this->default_result['status'] = 'failed';
            array_push($this->default_result['message'], 'Failed to add admin');
        }
    }

    private function getPath($request, $image = null)
    {
        $path = is_null($image) ? $this->default_image : $image;
        $file = $request->file('admin_image');

        if (!is_null($file)) {
            $upload = UtilityController::upload($file, $this->default_directory, time() . '.jpg');

            if ($upload['status'])
                $path = $upload['path'];
            else 
                array_push($this->default_result['message'], 'An error occured while uploading your image');
        }

        return $path;

    }
}
