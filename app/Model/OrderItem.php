<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $table = 'order_items';

    public function product()
    {
    	return $this->hasOne('App\Model\Products', 'id', 'product_id');
    }

    public function order()
    {
    	return $this->hasOne('App\Model\Order', 'id', 'order_id');
    }
}
