<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Comment extends Model
{
    protected $table = 'comment';

    public function get_page($filter = [] , $req)
    {
        //get list id movie 
        $result     = $this->getListId($filter , $req);
        $list_mov_id = array_column($result->items(), "id");
        
        

        $data = DB::table($this->table)
            ->select([
                "comment.*",
                "user.name",
                "user.avatar",
            ])
            ->leftJoin("user", "user.id" , "=" , "comment.user_id")
            ->orderBy($filter['orderBy'], $filter['sort'])
            ->whereIn('comment.id',$list_mov_id);
        $data = $data->get();

        
        
        
        return new \Illuminate\Pagination\LengthAwarePaginator($data,$result->total(),$result->perPage(),$result->currentPage(),['path' => $req->url(), 'query' => $req->all()]);
    }
    

    private function getListId($filter , $req){
        $result = DB::table($this->table)
        ->select('comment.id')
        ->leftJoin("user", "user.id" , "=" , "comment.user_id")
        ->groupBy('comment.id')
        ->orderBy($filter['orderBy'], $filter['sort']);        
        $result = addConditionsToQuery($filter['conditions'],$result);
        $result = $result->paginate($filter['limit']);
        $result->appends($req->all())->links();        
        return $result;
    }
    public function get_subcomment($filter = [] , $req)
    {
        //get list id movie

        $result = DB::table($this->table)
            ->select([
                "comment.*",
                "user.name",
                "user.avatar",
            ])
            ->leftJoin("user", "user.id" , "=" , "comment.user_id")
            ->orderBy($filter['orderBy'], $filter['sort'])
            ->limit($filter['limit']);
        $result = addConditionsToQuery($filter['conditions'],$result);
        $result = $result->get();
        
        return $result;
    }
}
