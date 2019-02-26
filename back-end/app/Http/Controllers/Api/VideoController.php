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
            switch ($value->source_name) {
                case 'facebook':
                    $data['sources']['fb'] = [
                        'src' => $link_play->src,
                        'thumbnail' => $link_play->thumbnail
                    ];
                    break;
                                        
                default:
                    break;
            }
                
        }
        return Response()->json(['info' => $data]);
        
    }
    private function getLink($source , $name)
    {
        
        $token = Config::where("key" , 'facebook_access_token')->first();
        $token = $token->value;
        if(!$token) return;
                        

        switch ($name) {
            case 'facebook':
                $url = $this->domain_graph_FB.getIdFromLinkFb($source);
                
                $params = [
                    'access_token' => $token,
                    'fields' => 'id,source,length,picture'
                ];
                $data = apiCurl($url,'GET',$params , 'json');
                
                if(!empty($data) && $data->id){
                    return [
                        'src' => $data->source,
                        'thumbnail' => $data->picture,
                        'duration' => $data->length,                        
                    ];


                }
                break;
            
            default:
                break;
        }
        return [];
        
    }
}
