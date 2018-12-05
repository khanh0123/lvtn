<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$result = DB::table('category')->get();
    	if(count($result) == 0){
    		DB::table('category')->insert([
    			[
    				'id' => 'cat000001',
    				'name' => 'Phim Bộ',
    				'slug' => 'phim-bo'
    			],
    			[
    				'id' => 'cat000002',
    				'name' => 'Phim Lẻ',
    				'slug' => 'phim-le'
    			],
    		]);
    		DB::table('genre')->insert([
    			[
    				'id' => 'gen000001',
    				'name' => 'Phim Tình Cảm',
    				'slug' => 'phim-tinh-cam'
    			],
    			[
    				'id' => 'gen000002',
    				'name' => 'Phim Hành Động',
    				'slug' => 'phim-hanh-dong'
    			],
    			[
    				'id' => 'gen000003',
    				'name' => 'Phim Khoa Học Viễn Tưởng',
    				'slug' => 'phim-khoa-hoc-vien-tuong'
    			],
    		]);
    		DB::table('country')->insert([
    			[
    				'id' => 'cot000001',
    				'name' => 'Phim Việt Nam',
    				'slug' => 'phim-viet-nam'
    			],
    			[
    				'id' => 'cot000002',
    				'name' => 'Phim Mỹ',
    				'slug' => 'phim-my'
    			],
    			[
    				'id' => 'cot000003',
    				'name' => 'Phim Trung Quốc',
    				'slug' => 'phim-trung-quoc'
    			],
    		]);
    		DB::table('max_id')->insert([
    			[
    				'table_name' => 'category',
    				'max_id' => 'cat000003'
    			],
    			[
    				'table_name' => 'genre',
    				'max_id' => 'gen000003'
    			],
    			[
    				'table_name' => 'country',
    				'max_id' => 'cot000003'
    			],
    		]);
    	}
		
    }
}
