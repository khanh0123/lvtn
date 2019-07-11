<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Movie extends Model
{
    protected $table = 'movie';

    public function get_page($filter = [] , $req)
    {
        //get list id movie 
        $result     = $this->getListId($filter , $req);
        $list_mov_id = array_column($result->items(), "id");

        $data = DB::table($this->table)
            ->select([
                "movie.*",
                "category.name as cat_name",
                "category.slug as cat_slug",
                "movie_country.cou_id",                        
                "country.name as cou_name",
                "country.slug as cou_slug",
                "movie_genre.gen_id",
                "genre.name as gen_name",
                "genre.slug as gen_slug",
                'views',
            ])
            ->leftJoin("category"       ,"category.id"          ,"=" , "movie.cat_id")
            ->leftJoin("movie_country"  ,"movie_country.mov_id" ,"=" , "movie.id")
            ->leftJoin("movie_genre"    ,"movie_genre.mov_id"   ,"=" , "movie.id")
            ->leftJoin("country"        ,"country.id"           ,"=" , "movie_country.cou_id")
            ->leftJoin("genre"          ,"genre.id"             ,"=" , "movie_genre.gen_id")
            ->orderBy($filter['orderBy'], $filter['sort'])
            ->whereIn('movie.id',$list_mov_id);
        // $data = addConditionsToQuery($filter['conditions'],$data);
        $data = $data->get();
        return new \Illuminate\Pagination\LengthAwarePaginator($data,$result->total(),$result->perPage(),$result->currentPage(),['path' => $req->url(), 'query' => $req->all()]);
    }



    public function search(Array $data,$field_get = [])
    {
        $data = DB::table($this->table)
                    ->select("movie.*","category.name as cat_name")
                    ->join("category" , "category.id" , "=" , "movie.cat_id")
                    ->orderBy('movie.id', "desc")
                    ->where([$data])
                    ->first();              
        return $data;
    }

    private function getListId($filter , $req){
        $result = DB::table($this->table)
        ->select('movie.id')
        ->leftJoin("category"       ,"category.id"          ,"=" , "movie.cat_id")
        ->leftJoin("movie_country"  ,"movie_country.mov_id" ,"=" , "movie.id")
        ->leftJoin("movie_genre"    ,"movie_genre.mov_id"   ,"=" , "movie.id")
        ->leftJoin("country"        ,"country.id"           ,"=" , "movie_country.cou_id")
        ->leftJoin("genre"          ,"genre.id"             ,"=" , "movie_genre.gen_id")
        ->groupBy('movie.id')
        ->orderBy($filter['orderBy'], $filter['sort']);
        
        $result = addConditionsToQuery($filter['conditions'],$result);
        $result = $result->paginate($filter['limit']);
        $result->appends($req->all())->links();
        
        return $result;
    }

    public function getRecommendMovies()
    {
        $data = DB::table($this->table)
            ->select([
                "movie.*",
                "category.name as cat_name",
                "category.slug as cat_slug",
                "movie_country.cou_id",                        
                "country.name as cou_name",
                "country.slug as cou_slug",
                "movie_genre.gen_id",
                "genre.name as gen_name",
                "genre.slug as gen_slug",
                'views',

            ])
            ->leftJoin("category"       ,"category.id"          ,"=" , "movie.cat_id")
            ->leftJoin("movie_country"  ,"movie_country.mov_id" ,"=" , "movie.id")
            ->leftJoin("movie_genre"    ,"movie_genre.mov_id"   ,"=" , "movie.id")
            ->leftJoin("country"        ,"country.id"           ,"=" , "movie_country.cou_id")
            ->leftJoin("genre"          ,"genre.id"             ,"=" , "movie_genre.gen_id")
            ->orderBy('movie.views', 'desc')
            ->limit(20)
            ->get();
        return $data;
    }
}