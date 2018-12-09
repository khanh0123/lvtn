<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Category; 
use App\Models\Genre; 
use App\Models\Country;
class MenuController extends Controller
{
	// public function __construct(Request $request) {
 //        $this->model = new Menu;
 //        parent::__construct($request);
 //    }
    public function get(Request $request)
    {
    	$data_api=array();
    	$data= Menu::all();
    	// return response()->json($data);
    	// echo "<pre>";
    	// print_r($data);
    	// echo "</pre>";
    	foreach ($data as $key => $value) {    		
    		//var_dump($value->sub_menu);
    		$id = explode(",", $value->sub_menu);    		
    		//var_dump($id);
    		foreach ($id as $v) {
    			// var_dump($value);
    			// die();
    			$table=get_table_name($v);
    			// var_dump($table);
    			// die();
    			switch ($table) {
					case 'genre':
						$data_api_gen=Genre::find($v);
						if(!empty($data_api_gen)) {	    	
	            			array_push($data_api, $data_api_gen);
	       				}  						
						break;
					case 'country':
						$data_api_cou=Country::find($v);
						if(!empty($data_api_cou)) {	        	
			             	array_push($data_api, $data_api_cou);	    			
			    	 	}
						break;
					case 'category':
						$data_api_cat=Category::find($v);
						if(!empty($data_api_cat)) {	        	
				            array_push($data_api, $data_api_cat);
				        }	
						break;
					
					default:
						# code...
						break;
	    		}					    			
    		}  
	        $data[$key]->sub_menu=$data_api;
    	}  
		return response()->json($data);        	
	}   
}
