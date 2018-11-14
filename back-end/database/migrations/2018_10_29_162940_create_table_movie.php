<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableMovie extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movie', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('is_hot');
            $table->integer('is_new');
            $table->integer('type');
            $table->string('name');
            $table->string('title');
            $table->string('short_descriptio');
            $table->string('long_descriptio');
            $table->timestamp('runtime');
            $table->timestamp('release_date');
            $table->integer('total_rate');
            $table->doubleval('avg_rate');
            $table->string('slug');
            $table->integer('epi_num');
            $table->string('cat_id')->unsigned();
            $table->integer('ad_id')->unsigned();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->foreign('cat_id', 'fk_movie_category')->references('id')->on('category')->onDelete('cascade');
            $table->foreign('ad_id', 'fk_movie_admin')->references('id')->on('admin')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movie');
    }
}
