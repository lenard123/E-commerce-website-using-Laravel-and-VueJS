<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';

    protected $fillable = [
        'name',
        'description',
        'image_id',
    ];

    public function subcategories()
    {
        return $this->hasMany('App\Subcategory');
    }

    public function image()
    {
        return $this->belongsTo('App\Image');
    }
}
