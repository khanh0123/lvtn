<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class Admin_group extends Model
{
    protected $table = 'admin_group';
    

    public function getall($sort = 'desc'){
        $data = DB::table($this->table)
                    // ->select('id','key','value','created_at','updated_at')
                    ->orderBy('id', $sort)
                    ->get();
        return $data;

    }
    public function get($limit = 2 , $sort = 'desc')
    {
    	$data = DB::table($this->table)
    				->select('id','admin_group.name as name','admin_group_permission.name as gad_per_name','gad_id','per_id')
                    ->join('admin_group_permission' , 'gad_id' , '=' , 'id')
    				->orderBy('id', $sort)
    				->paginate($limit);		
    	return $data;
    }

    public function findById($id)
    {
        $data = DB::table($this->table)
                    ->select('id','admin_group.name','gad_id','per_id','admin_group.created_at','admin_group.updated_at')
                    ->join('admin_group_permission', 'admin_group.id', '=', 'admin_group_permission.gad_id')
                    ->where('id' , $id)
                    ->first();     
        return $data;
    }

    public function check_group_exists_admin($id)
    {
        $data = DB::table('admin')
                    ->where('gad_id' , $id)
                    ->first();
        return $data;
    }
}
