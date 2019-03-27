<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\Config;
use Validator;


class VideoController extends Controller
{   

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

    public function __construct(Request $request) {
        $this->model = new Video;
    }
    public function detail(Request $request,$mov_id,$episode)
    {
        $data = ['sources' => []];
        $links = $this->model->api_get($mov_id,$episode);

        
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
                    $need_update = time()-strtotime($value->updated_at) > 43200; //12hours
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
        $data = apiCurl($item->source_link,'GET',[],'json','v4',['referer' => $item->more_info->referer]);

        if(isset($data->id)){
            $result['sources'] = $data->sources;
            return $result;
        }
        return ['sources' => []];
    }
    
}
