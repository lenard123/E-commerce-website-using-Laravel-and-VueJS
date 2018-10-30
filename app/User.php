<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 
        'middle_name', 
        'last_name',
        'email', 
        'password',
        'type',
        'image_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];


    public function profile()
    {
        return $this->hasOne('App\UserProfiles');
    }

    public function image()
    {
        return $this->belongsTo('App\Image');
    }

    public function orders()
    {
        return $this->hasMany('App\Orders');
    }
}
