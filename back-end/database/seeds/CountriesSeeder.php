<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$result = DB::table('country')->get();
    	if(count($result) == 0){
        	$path = storage_path() . "/jsons/all_countries_codes.json";
        	$jsons = json_decode(file_get_contents($path)); 

        	$id = "cou001";
        	$array_data = [];
        	foreach ($jsons as $key => $value) {

        		$array_data[] = [
        			'id' => $id,
        			'name' => $value->name,
        			'slug' => create_slug($value->name),
        			'country_code' => $value->alpha_2,
        		];
        		$id = auto_generate_id($id);
        	}
        	// echo json_encode($array_data);
        	// die;
        	$array_data = array_reverse($array_data);
        	DB::table('country')->insert($array_data);
        	DB::table('max_id')->insert(
        		[
        			'table_name' => 'country',
        			'max_id' => $id
        		],
        	);
        }
    }
}
