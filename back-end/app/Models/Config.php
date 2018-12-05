<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Config extends Model
{
    protected $table = 'config';

    public function get($limit = 2 , $sort = 'asc')
    {
    	$data = DB::table($this->table)
    				// ->select('id','key','value','created_at','updated_at')
    				->orderBy('id', $sort)
    				->whereNotIn('key' , ['banner'])
    				->paginate($limit);
    	return $data;
    }
    public function getById($id)
    {
    	$data = DB::table($this->table)
    				// ->select('id','key','value','created_at','updated_at')
    				->where('id' , $id)
    				->whereNotIn('key' , ['banner'])
    				->first();
    	return $data;
    }

}
