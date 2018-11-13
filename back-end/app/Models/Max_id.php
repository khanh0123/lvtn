<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Max_id extends Model
{
    protected $table = 'max_id';
    public $timestamps = false;

    public function get($limit = 2 , $sort = 'desc')
    {
    	$data = DB::table($this->table)
    				// ->select('id','key','value','created_at','updated_at')
    				->orderBy('id', $sort)
    				->paginate($limit);    				
    	return $data;
    }

}