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
    public function get($limit = 2 , $sort = 'asc')
    {
    	$data = DB::table($this->table)
    				// ->select('id','key','value','created_at','updated_at')
    				->orderBy('id', $sort)
    				->paginate($limit);    				
    	return $data;
    }

    public function findById($id)
    {
        $data = DB::table($this->table)
                    ->join('admin_group_permission', 'admin_group.id', '=', 'admin_group_permission.gad_id')
                    ->select('id','name','gad_id','per_id','admin_group.created_at','admin_group.updated_at')
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
