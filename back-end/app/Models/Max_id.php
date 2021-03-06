<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Max_id extends Model
{
    protected $table = 'max_id';
    public $timestamps = false;

    public function get_page($filter = [] , $req)
    {
        $data = DB::table($this->table)
                    // ->select('id','key','value','created_at','updated_at')
                    ->orderBy($filter['orderBy'], $filter['sort']);
        $data = addConditionsToQuery($filter['conditions'],$data);
        $data = $data->paginate($filter['limit']);
        $data->appends($req->all())->links();
        return $data;
    }

}