<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class EpisodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('episode')->insert([[
			'id'   => '1',
			'mov_id' => 1462,
			'slug' => 'the-grinch-2018-tap-1',
			'title' => 'The Grinch (2018) tập 1',
			'episode' => '1',
			'images' => '',
			'short_des' => '',
			'long_des' => '',
		]]);
    }
}
