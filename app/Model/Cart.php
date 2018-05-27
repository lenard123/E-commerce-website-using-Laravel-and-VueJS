<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';

    public function product()
    {
    	return $this->belongsTo('App\Model\Products', 'product_id');
    }
}
