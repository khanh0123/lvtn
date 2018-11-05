<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use DB;
class CreateTableMovieGenre extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movie_genre', function (Blueprint $table) {
            $table->integer('gen_id');
            $table->integer('mov_id');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->foreign('gen_id', 'fk_movie_genre_genre')->references('id')->on('genre')->onDelete('cascade');
            $table->foreign('mov_id', 'fk_movie_genre_movie')->references('id')->on('movie')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movie_genre');
    }
}
