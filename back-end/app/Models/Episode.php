<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class Episode extends Model
{
   	protected $table = 'episode';

    // public function get($limit = 20 , $sort = 'asc')
    // {
    // 	$data = DB::table($this->table)
    // 				->orderBy('id', $sort)
    // 				->paginate($limit);    				
    // 	return $data;
    // }
    public function get($mov_id , $limit = 20 , $sort = 'asc')
    {
    	$data = DB::table($this->table)
    				->where('mov_id', $mov_id)
    				->orderBy('episode', $sort)
    				->paginate($limit);
    	return $data;
    }

    public function get_all_episode_has_create($mov_id , $sort = 'asc')
    {
    	$data = DB::table($this->table)
    				->select('episode')
    				->where('mov_id', $mov_id)
    				->orderBy('episode', $sort)
    				->get();
    	return $data;
    }
}