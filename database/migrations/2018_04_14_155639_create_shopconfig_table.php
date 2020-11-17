<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopconfigTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopconfig', function (Blueprint $table) {
            $table->increments('id');
            $table->string('shopconfig_name');
            $table->string('shopconfig_address');
            $table->string('shopconfig_phone');
            $table->string('shopconfig_email');
            $table->decimal('shopconfig_shippingcost', 5, 2);
            $table->integer('currency_id')->unsigned();
            $table->foreign('currency_id')->references('id')->on('currencies');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopconfig');
    }
}
