<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            // $table->unsignedBigInteger('id')->unique()->primary();
            $table->increments('id');
            $table->string('name')->default('regular_user');
            $table->string('surname')->default('regular_user');
            $table->string('gender')->default('regular_user');
            $table->date('birth_date')->nullable();
            $table->string('adr')->default('regular_user');
            $table->string('hospital')->default('regular_user');
            $table->string('tel')->default('regular_user');
            $table->string('usertype')->default('donor');
            $table->string('blood_type')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->default('password**************');
            $table->string('status')->nullable();
            $table->string('image')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
