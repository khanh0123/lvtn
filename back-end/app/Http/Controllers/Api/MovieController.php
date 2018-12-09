<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\Category;
use App\Models\genre;
use App\Models\movie_genre;


class MovieController extends Controller
{
	public function get(Request $request){
		$movie_new=$this->getnew($request);
		//return response()->json($movie_new);  
		//print_r($movie_new);
		//die();
		$series_movie_hot=$this->get_series_movie_hot($request);
		$movie_hot=$this->get_movies_hot($request);
		$movie_theater_comedy=$this->get_theater_comedy($request);

		$data_movie_new=array('name'=>'10 Phim mới nhất','items'=>$movie_new);
		$data_series_movie_hot=array('name'=>'10 Phim bộ hot nhất','items'=>$series_movie_hot);
		$data_movie_hot=array('name'=>'10 Phim lẻ hot nhất','items'=>$movie_hot);
		$data_movie_theater_comedy=array('name'=>'20 Phim hài chiếu rạp mới nhất','items'=>$movie_theater_comedy);

		$banner=array();
		$ribbon=array($data_movie_new,$data_series_movie_hot,$data_movie_hot,$data_movie_theater_comedy);
		//$data_movie=array("name",)

		$data=array(
			'banner'=>$banner,
			'ribbon'=>$ribbon
		);
		return response()->json($data);
	}
	
    public function getnew(Request $request){
    	// $count=1;
    	// $data=Movie::all();
    	// $ribbon=array();
    	// foreach ($data as $key =>$value) {
    	// 	//var_dump($data);
    	// 	if ($count <= 10) {
    	// 		if ($data[$key]->is_new == 1) {
	    // 			//echo $value;
	    // 			array_push($ribbon,$value);
	    // 			$count++;
    	// 		}
    	// 	}
    	// 	else{
    	// 		die();
    	// 	}    		
    	// }
    	// return $ribbon; 
    	$data=Movie::where('is_new',1)
    		->orderBy('id','desc')
    		->limit(10)
    		->get();
    	return $data;    	 	
    }	//lấy 10 bộ phim mới nhất


    public function get_series_movie_hot(Request $request){ 
    	$count=1;
    	$data=Movie::all();    	
    	$ribbon=array();
    	foreach ($data as $key => $value) {    		
    		if ($count <= 10) {
    			# code... 
    			$data_category=Category::find($value->cat_id); 		
	    		if ($data_category->slug == 'phim-bo' && $value->is_hot == 1) {    			
	    			array_push($ribbon,$value);
	    			$count++;    			
	    		}
	    	}
	    	else{
	    		die();
	    	}
    	}
    	return $ribbon;
    } //lấy 10 phim bộ hot


    public function get_movies_hot(Request $request){ 
    	$count=1;
    	$data=Movie::all();    	
    	$ribbon=array();
    	foreach ($data as $key => $value) {    		
    		if ($count <= 10) {
    			# code... 
    			$data_category=Category::find($value->cat_id); 		
	    		if ($data_category->slug == 'phim-le' && $value->is_hot == 1) {    			
	    			array_push($ribbon,$value);
	    			$count++;    			
	    		}
	    	}
	    	else{
	    		die();
	    	}
    	}
    	return $ribbon;
    }//lấy 10 phim lẻ hot

    public function get_theater_comedy(Request $request){ 
    	$count=1;
    	$data=Movie::all();    	
    	$ribbon=array();
    	foreach ($data as $key => $value) {
	    	if($count <= 20){    		
	    		$data_movie_genre=movie_genre::all();
	    		foreach ($data_movie_genre as $k => $v) {
	    			if($v->mov_id == $value->id){
	    				$data_genne=genre::find($v->gen_id);
	    				$data_category=Category::find($value->cat_id);
	    				if($data_genne->slug == 'phim-hai'){
	    					if($data_category->slug == 'phim-chieu-rap' && $value->is_new == 1){
		    					array_push($ribbon,$value);
			    				$count++;
			    			}
			    			break;
	    				} 
	    			}
	    		}  		   		
	    	}  
	    	else{
	    		die();
	    	} 		
    	}
    	return $ribbon;
    }//lấy 20 phim hài chiếu rạp
}
