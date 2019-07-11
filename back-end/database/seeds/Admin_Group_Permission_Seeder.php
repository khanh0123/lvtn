<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class Admin_Group_Permission_Seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $result = DB::table('admin_group_permission')->get();
    	if(count($result) == 0){
    		DB::table('admin_group_permission')->insert([
    			[
    			'gad_id' => 5,
    			'per_id' => 5,
    			// 'name' => 'Xem',
    			],
    			[
    			'gad_id' => 4,
    			'per_id' => 4,
    			// 'name' => 'Thêm',
    			],
    			[
    			'gad_id' => 3,
    			'per_id' => 3,
    			// 'name' => 'Sửa',
    			],
    			[
    			'gad_id' => 2,
    			'per_id' => 2,
    			// 'name' => 'Xóa',
    			],
    			[
    			'gad_id' => 1,
    			'per_id' => 1,
    			// 'name' => 'Quản Trị',
    			],
    		]);
    	}
    }
}
