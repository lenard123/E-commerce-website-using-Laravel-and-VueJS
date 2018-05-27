<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilityController;
use App\Model\Admins;

class AuthController extends Controller
{
	private $admins;
	private $status;
    private $util;



	/*
	 * Constructor
	 *
	 *
	 */
	public function __construct()
	{
		$this->admins = new Admins;
		$this->status = array('status'=>'success', 'message'=>array());
        $this->util = new UtilityController;
	}



	/**
	 * Verify Credential
	 * @param Request $request
	 * @return response
	 */
    public function login (Request $request)
    {
        //Initialize data
    	$email = $request->email;
    	$password = $request->password;

    	$this->validateRequest($request); //validate request
    	$isValid = $this->chkLogin($email, $password);
    	$status = $this->getStatus($isValid, $email); //Get status

    	return response()->json($status);
    }



    /**
     * Logout - End Session
     * 
     * 
     */
    public function logout () 
    {
        session(['LOG' => 'OUT']);
    }



    /**
     * Get Status
     * @param Boolean $isLogin, String $user
     * @return Array status
     */
    private function getStatus($isLogin, $user)
    {
        if ($isLogin) {
            session(['LOG'=> 'IN']);
            session(['ID' => $this->getId($user)]);
            return ['status'=>'success', 'message'=>['Login Successfully']];
        } else {
            return ['status'=>'failed', 'message'=>['Invalid User or password']];
        }
    }



    /**
     * Validate Request
     * @param Request $request
     *
     */
    private function validateRequest ($request)
    {
    	$this->validate($request, [
    		'email' => 'required',
    		'password' => 'required'
    	]);
    }



    /**
     * Check Username and Password
     * @param String $user, String $pass
     * @return Boolan login
     */
    private function chkLogin ($user, $pass)
    {
    	$username = $this->getUser($user);
    	return ($username->count() && $this->chkPassword($username, $pass)); 
    }



    /**
     * get username
     * @param String username
     * @return Boolean is valid username
     */
    private function getUser ($user)
    {
    	return $this->admins->where('admin_user', $user);
    } 



    /**
     * get ID
     * @param String user
     * @return Integer id
     */
    private function getId ($user)
    {
    	return $this->getUser($user)->get()->first()->id;
    }



    /**
     * Check Password
     * @param Admins user, String pass
     * @return Boolean is valid password
     */
    private function chkPassword ($user, $pass)
    {
    	return Hash::check($pass, $user->get()->first()->admin_pass);
    }
}
