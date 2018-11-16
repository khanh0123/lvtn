<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
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
            // $table->collation = 'utf8_unicode_ci';
            // $table->charset = 'utf8';

            $table->increments('id');
            $table->tinyInteger('is_hot');
            $table->tinyInteger('is_new');
            $table->tinyInteger('type');

            $table->integer('ad_id')->unsigned()->index();

            $table->string('name');
            $table->string('title');
            $table->string('slug');
            $table->text('images');
            $table->string('short_des');
            $table->string('long_des');
            $table->int('runtime');
            $table->double('release_date');
            $table->integer('total_rate');
            $table->double('avg_rate');            
            $table->integer('epi_num');
            $table->string('cat_id',255);
            
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->foreign('cat_id', 'fk_movie_category')->references('id')->on('category')->onDelete('cascade');
            $table->foreign('ad_id', 'fk_movie_admin_')->references('id')->on('admin')->onDelete('cascade');
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
