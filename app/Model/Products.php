<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $table = 'products';

    public function subcategory()
    {
    	return $this->belongsTo('App\Model\Subcategory');
    }
}
