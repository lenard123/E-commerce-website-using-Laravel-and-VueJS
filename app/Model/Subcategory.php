<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $table = 'subcategories';

    public function products()
    {
    	return $this->hasMany('App\Model\Products', 'subcategory_id');
    }
}
