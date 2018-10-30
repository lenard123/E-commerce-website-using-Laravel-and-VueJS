<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = [
        'image_id',
        'product_id'
    ];

    public function image()
    {
        return $this->belongsTo('App\Image');
    }
}
