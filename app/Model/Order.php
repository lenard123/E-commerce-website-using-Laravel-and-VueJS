<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    public function order_item()
    {
    	return $this->hasMany('App\Model\OrderItem', 'order_id');
    }

    public function customer()
    {
    	return $this->belongsTo('App\Model\Customer', 'customer_id');
    }

    public function product()
    {
    	return $this->belongsTo('App\Model\Products', 'product_id');
    }
}
