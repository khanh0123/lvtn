<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Country extends Model
{
    protected $table = 'country';
    public $timestamps = false;

    public function get($limit = 2 , $sort = 'asc')
    {
    	$data = DB::table($this->table)
    				// ->select('id','key','value','created_at','updated_at')
    				->orderBy('id', $sort)
    				->paginate($limit);    				
    	return $data;
    }

}