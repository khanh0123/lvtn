<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class User extends Model
{
    protected $table = 'user';

    public function get_page($filter, $req)
    {
    	$data = DB::table($this->table)
    				->select('id','email','name','fb_id','avatar','status','created_at','updated_at')
    				->orderBy($filter['orderBy'], $filter['sort']);
        $data = addConditionsToQuery($filter['conditions'],$data);        
        $data = $data->paginate($filter['limit']);
        $data->appends($req->all())->links();
    	return $data;
    }
}