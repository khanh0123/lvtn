<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Permission extends Model
{
    protected $table = 'permission';

    public function get($limit = 2 , $sort = 'desc')
    {
    	$data = DB::table($this->table)
    				// ->select('id','key','value','created_at','updated_at')
    				->orderBy('id', $sort)
    				->paginate($limit);    				
    	return $data;
    }
    public function getall($sort = 'desc'){
        $data = DB::table($this->table)
                    // ->select('id','key','value','created_at','updated_at')
                    ->orderBy('id', $sort)
                    ->get();
        return $data;

    }

}
