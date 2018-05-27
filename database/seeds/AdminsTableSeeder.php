<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Model\Admins;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*DB::table('admins')->insert([
        	'admin_name' => 'Lenard Mangay-ayam',
        	'admin_type' => 1,
        	'admin_user' => 'admin',
        	'admin_pass' => Hash::make('admin'),
        ]);*/

        $admin = new Admins;
        $admin->admin_name = 'Lenard Mangay-ayam';
        $admin->admin_type = 1;
        $admin->admin_user = 'admin';
        $admin->admin_pass = Hash::make('admin');
        $admin->save();

    }
}
