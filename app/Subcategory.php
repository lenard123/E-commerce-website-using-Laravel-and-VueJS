<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $table = 'subcategories';

    protected $fillable = [
        'name',
        'image_id',
        'category_id',
        'description',
    ];

    public function image()
    {
        return $this->belongsTo('App\Image');
    }

    public function products()
    {
        return $this->hasMany('App\Product');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
}
