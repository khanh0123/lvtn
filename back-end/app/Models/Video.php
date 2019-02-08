<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Video extends Model
{
    protected $table = 'video';

    public function get_page($filter, $req)
    {
    	$data = DB::table($this->table)->orderBy($filter['orderBy'], $filter['sort']);
        $data = addConditionsToQuery($filter['conditions'],$data);
        $data = $data->paginate($filter['limit']);
        $data->appends($req->all())->links();
    	return $data;
    }

}