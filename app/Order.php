<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'address',
        'phone',
        'city',
        'state',
        'postalcode',
    ];

    public function items()
    {
        return $this->hasMany('App\OrderItem');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
