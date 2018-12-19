<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Movie extends Model
{
    protected $table = 'movie';

    public function get($limit = 20 , $sort = 'asc')
    {
    	$data = DB::table($this->table)
                    ->select("movie.*","category.name as cat_name")
                    ->join("category" , "category.id" , "=" , "movie.cat_id")
    				->orderBy('movie.id', $sort)
    				->paginate($limit);
                		
    	return $data;
    }

    public function search(Array $data,$field_get = [])
    {
        $data = DB::table($this->table)
                    ->select("movie.*","category.name as cat_name")
                    ->join("category" , "category.id" , "=" , "movie.cat_id")
                    ->orderBy('movie.id', "desc")
                    ->where([$data])
                    ->first();              
        return $data;
    }

}