<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Movie extends Model
{
    protected $table = 'movie';
    // public function getDateFormat()
    // {
    //     return 'U';
    // }

    public function get($limit = 20 , $sort = 'asc')
    {
    	$data = DB::table($this->table)
    				->orderBy('id', $sort)
    				->paginate($limit);    				
    	return $data;
    }

    public function search(Array $data,$field_get = [])
    {
        $data = DB::table($this->table)
                    ->select('id','name','title')
                    ->where([$data])
                    ->first();              
        return $data;
    }

}