<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Video;
use App\Models\Config;
use Validator;

class VideoController extends MainAdminController
{	

	private $domain_graph_FB = "https://graph.facebook.com/v2.6/";
	protected $rules = [
        'insert' => [
            'source_link' => 'required',
            'source_name' => 'required|in:facebook,google,others',
            'max_qualify' => 'required|in:0,360,480,720,1080',
            'return_type' => 'required|in:json,view',
        ],
        'update' => [
            'source_link' => 'required',
            'source_name' => 'required|in:facebook,google,others',
            'max_qualify' => 'required|in:0,360,480,720,1080',
            'return_type' => 'required|in:json,view',
        ]
    ];
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
        parent::__construct($request);
    }

    public function setItem($type , $req , &$item){

        $validator = Validator::make($req->all(), $this->rules[$type]);
        if ($validator->fails()) {
            return [
                'type' => 'error',
                'msg' => 'Vui lòng kiểm tra lại các trường nhập'
            ];
        }

        switch ($type) {
            case 'insert':
                $item->ad_id = $req->authUser->id;
                break;
            
            default:
                // code...
                break;
        }

        $item->source_link = $req->get("source_link");
        $item->source_name = $req->get("source_name");
        $item->max_qualify = $req->get("max_qualify");
        $item->duration    = $req->get("duration");

        //get link play video
        $link_play = $this->getLink($item->source_link,$item->source_name);
        $link_play = json_encode($link_play);
        $item->link_play = $link_play;
        

        
        return [
            'type' => 'success',
            'msg' => $type == 1 ? 'Thêm dữ liệu thành công' : 'Cập nhật thành công',
        ];

    }

    public function store(Request $request , $mov_id = '')
    {
        $return_type = $request->return_type;
        if($request->isMethod("post")){ //insert
            $item = $this->model;
            $result = $this->setItem('insert',$request, $item);
            if($result['type'] == 'success'){                
                $item->save();
                $result['message'] = 'Thêm dữ liệu thành công';
            }
            $data['info'] = $item;
        } else {
            $result = '';
            $data = '';
        }

        switch ($return_type) {
            case 'view':
                return $this->template($this->view_folder."add",$data,$result);
                break;
            case 'json':
                return Response()->json($data,200);
                break;
            default:
                // code...
                break;
        }
        
        
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
