<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\Config;
use App\Models\User_end_times_episode;
use Validator;


class VideoController extends Controller
{   
    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->model = new Video;
    }

    private $domain_graph_FB = "https://graph.facebook.com/v2.6/";
    protected $columns_filter = [
        'source_link' => 'video.source_link',
        'source_name' => 'video.source_name',
        'max_qualify' => 'video.max_qualify',
        'duration'    => 'video.duration',
        'created_at'  => 'video.created_at',
        'created_at'  => 'video.updated_at',
        
        
    ];
    protected $columns_search = [];

    public function detail(Request $request,$mov_id,$episode)
    {


        $links = $this->model->api_get($mov_id,$episode);

        $data = [
            'mov_id' => (int)$mov_id,
            'episode_id' => count($links) > 0 ? $links[0]->episode_id : '',
            'sources' => [],
            'time_current' => 0,
        ];
        if(count($links) > 0 && $request->header("Authorization")){
            $user = $this->getUserFromAccessToken($request->header("Authorization"));            
            if(!empty($user)) {
                $endtime              = new User_end_times_episode();
                $endtime              = $endtime->get_current_time($data['episode_id'],$user->id);
                $data['time_current'] = !empty($endtime) ? $endtime->time_current : 0;
            }
            

        }
                
        foreach ($links as $key => $value) {
            
            
            
            $link_play = json_decode($value->link_play);
            $value->more_info = json_decode($value->more_info);
            

            
            switch ($value->source_name) {
                case 'facebook':
                    if(!isset($data['sources']['fb'])){
                        $data['sources']['fb'] = [];
                    }
                    foreach ($link_play as $v) {
                        $data['sources']['fb'][] = [
                            'src'       => $v->src,
                            'thumbnail' => isset($v->thumbnail) ? $v->thumbnail : '',
                            'duration'  => $v->duration,
                            'qualify'   => isset($v->qualify) ? $v->qualify : $value->max_qualify,
                            'type'      => $v->type,
                        ];
                    }
                    
                    break;
                case 'google':
                    if(!isset($data['sources']['gd'])){
                        $data['sources']['gd'] = [];
                    }
                    foreach ($link_play as $v) {
                        $data['sources']['gd'][] = [
                            'src'       => $v->src,
                            'thumbnail' => isset($v->thumbnail) ? $v->thumbnail : '',
                            'duration'  => $v->duration,
                            'qualify'   => isset($v->qualify) ? $v->qualify : $value->max_qualify,
                            'type'      => $v->type,
                        ];
                    }
                    break;
                case 'fimfast':
                    $need_update = time()-strtotime($value->updated_at) > 10500; //3hours
                    if(empty($link_play) || $need_update ){
                        $link_play = $this->get_link_fimfast($value);
                        $link_play = json_encode($link_play['sources']);
                        Video::where('id',$value->id)->update(['link_play' => $link_play]);
                        $link_play = json_decode($link_play);
                    }
                    $data['sources'] = $link_play;
                    break;
                                        
                default:
                    foreach ($link_play as $v) {
                        $data['sources']['others'][] = [
                            'src'       => isset($v->src) ? $v->src : '',
                            'thumbnail' => isset($v->thumbnail) ? $v->thumbnail : '',
                            'duration'  => isset($v->duration) ? $v->duration : '',
                            'qualify'   => isset($v->qualify) ? $v->qualify : $value->max_qualify,
                            'type'      => isset($v->type) ? $v->type : '',
                        ];
                    }
                    break;
            }
                
        }
        return Response()->json(['info' => $data]);
        
    }

    private function get_link_fimfast($item)
    {
        $data = apiCurl($item->more_info->link_api,'GET',[],'json','v4',['referer' => $item->more_info->referer]);

        if(isset($data->id)){
            $result['sources'] = $data->sources;
            return $result;
        }
        return ['sources' => []];
    }
    
}
