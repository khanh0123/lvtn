<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableMovieCountry extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movie_country', function (Blueprint $table) {
            $table->string('cot_id');
            $table->integer('mov_id');
            $table->foreign('cot_id', 'fk_movie_country_country')->references('id')->on('country')->onDelete('cascade');
            $table->foreign('mov_id', 'fk_movie_country_movie')->references('id')->on('movie')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movie_country');
    }
}
