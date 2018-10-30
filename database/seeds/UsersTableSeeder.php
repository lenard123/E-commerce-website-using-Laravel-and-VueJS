<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create($this->getUser());
    }

    private function getUser()
    {
        $user = config('app.user');
        $user['password'] = bcrypt($user['password']);
        return $user;
    }
}
