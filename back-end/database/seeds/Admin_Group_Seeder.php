<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class Admin_Group_Seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $result = DB::table('admin_group')->get();
    	if(count($result) == 0){
    		DB::table('admin_group')->insert([
    			[
                    'id' => 1,
        			'name' => 'Super Admin',
    			],
    			[
                    'id' => 2,
        			'name' => 'Editer With Delete',
    			],
    			[
                    'id' => 3,
    			    'name' => 'Editer',
    			],
    			[
                    'id' => 4,
    			'name' => 'Writer',
    			],
    			[
                    'id' => 5,
    			'name' => 'Demo',
    			],
    		]);
    	}
    }
}
