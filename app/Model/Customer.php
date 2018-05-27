<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';

    public function order()
    {
    	return $this->hasMany('App\Model\Order', 'customer_id');
    }
}
