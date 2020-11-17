<?php

use Illuminate\Database\Seeder;

class ShopconfigTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shopconfig')->insert([
        	'shopconfig_name'=>'Lenard',
        	'shopconfig_address'=>'',
        	'shopconfig_phone'=>'',
        	'shopconfig_email'=>'',
        	'shopconfig_shippingcost'=>0,
        	'currency_id'=>1
        ]);
    }
}
