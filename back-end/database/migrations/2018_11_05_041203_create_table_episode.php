<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableEpisode extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('episode', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('mov_id')->unsigned()->index();
            $table->text('link_play');
            $table->string('slug');
            $table->string('title');            
            $table->integer('episode')->unique()->index();
            $table->text('images');
            $table->string('short_des');            
            $table->string('long_des');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->foreign('mov_id', 'fk_episode_movie')->references('id')->on('movie')->onDelete('restrict');
        });    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('episode');
    }
}
