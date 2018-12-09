<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\Genre;
use App\Models\Movie_Genre;

class SearchController extends Controller
{
    public function get(Request $request){
    	$data=Movie::where('name','like','%'.$request->q.'%')
    		->get();
    	//print_r($data);
    	return response()->json($data);

    }
    public function get_genre(Request $request){
    	$data=Movie::all();
    	$data_genre=Genre::all();
    	return response()->json($data_genre);
    	die();
    }
}