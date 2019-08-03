<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class EpisodeVideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		DB::table('episode_video')->insert([[
			'epi_id'   => '1',
			'video_id' => '1',
		],[

			'epi_id'   => '1',
			'video_id' => '2',
		]]);
    }
}
