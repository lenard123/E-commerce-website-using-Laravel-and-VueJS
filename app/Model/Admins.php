<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Admins extends Model
{
	protected $table = 'admins';

    public function test()
    {
    	return response()->json($this->all());
    }
}
