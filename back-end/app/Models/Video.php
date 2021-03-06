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

    public function api_get($mov_id,$episode)
    {
        
        $select = [
            'video.id',
            'episode.id as episode_id',
            'source_link',
            'source_name',
            'max_qualify',
            'link_play',
            'more_info',
            'video.updated_at',
        ];
    	$data = DB::table($this->table)
            ->select($select)
            ->join("episode_video","episode_video.video_id","=" , "video.id")
            ->join("episode","episode.id","=" , "episode_video.epi_id")
            ->where('episode.mov_id',$mov_id)
            ->where('episode.episode',$episode);


        $data = $data->get();
        
        return $data;
    }

}