<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

		DB::table('user')->insert([
			[
				'id'       => 1,
				'email'    => 'khanhit197@gmail.com',
				'password' => encode_password("123123"),
				'name'     => 'Nguyễn Khánh',
				'fb_id'    => '1402203609912995',
				'avatar'   => 'http://graph.facebook.com/1402203609912995/picture?type=large',
				'status'   => 1,
			],
		]);
    }
}
