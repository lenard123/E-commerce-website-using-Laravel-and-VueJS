<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'subcategory_id',
    ];

    public function sales()
    {
        return $this->hasMany('App\Sale');
    }

    public function images()
    {
        return $this->hasMany('App\ProductImage');
    }
}
