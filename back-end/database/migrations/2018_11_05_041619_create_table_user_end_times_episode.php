<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
class CreateTableUserEndTimesEpisode extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_end_times_episode', function (Blueprint $table) {
            $table->integer('user_id')->unsigned()->index();
            $table->integer('episode_id')->unsigned()->index();
            $table->double('time_watched')->default(0);
            $table->double('time_current');
            $table->foreign('user_id', 'fk_user_end_times_episode_user')->references('id')->on('user')->onDelete('cascade');
            $table->foreign('episode_id', 'fk_user_end_times_episode_episode')->references('id')->on('episode')->onDelete('cascade');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

            $table->primary(array('user_id', 'episode_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_end_times_episode');
    }
}
