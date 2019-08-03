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
    private $domain_google_drive = [
        'https://docs.google.com/e/get_video_info',
    ];
	protected $rules = [
        'insert' => [
            'source_link' => 'required',
            'source_name' => 'required|in:facebook,google,others,fimfast',
            'max_qualify' => 'required|in:0,360,480,720,1080',
            'return_type' => 'required|in:json,view',
        ],
        'update' => [
            'source_link' => 'required',
            'source_name' => 'required|in:facebook,google,others,fimfast',
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
        // $link_play = $this->getLink($item->source_link,$item->source_name);
        // $link_play = !empty($link_play) ? json_encode($link_play) : '';
        
        $item->more_info = json_encode($this->getMoreInfo($item->source_link,$item->source_name));
        $item->link_play = '';
        

        
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
                $result['msg'] = 'Thêm dữ liệu thành công';
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
    
    private function getLink($source_link , $name)
    {
        
        switch ($name) {
            case 'facebook':
                $token = Config::where("key" , 'facebook_access_token')->first();
                $token = $token->value;
                if(!$token) break;
                $url = $this->domain_graph_FB.getIdFromLinkFb($source_link);                
                $params = [
                    'access_token' => $token,
                    'fields' => 'id,source,length,picture'
                ];
                $data = apiCurl($url,'GET',$params , 'json');
                
                if(!empty($data) && isset($data->id)){
                    return [[
                        'src' => $data->source,
                        'thumbnail' => $data->picture,
                        'duration' => $data->length,                        
                    ]];


                }
                break;
            case 'fimfast':
                $link_play = $this->get_link_fimfast($value);
                $link_play = json_encode($link_play['sources']);
                Video::where('id',$value->id)->update(['link_play' => $link_play]);
                $link_play = json_decode($link_play);
                return $link_play;
                break;
            case 'google':
                $url = htmlspecialchars($source_link);
                $support_domain = 'drive.google.com';
                
                if(empty($url)) {
                      $url = 'https://drive.google.com/file/d/0123456789abcdefghijklmnopqr/view?usp=sharing'; // sample link
                }
                if($url) {
                    preg_match('@^(?:https?://)?([^/]+)@i', $url, $matches);
                    $host = $matches[1];
                    if($host != $support_domain) {
                        return [];
                    }
                }

                preg_match('/(file\/d\/)(.*)(\/)/', $url, $matches);
                $docid = $matches[2];
                // $ip = htmlspecialchars($_GET['ip']);
                if(empty($ip)) {
                  $ip = 'v4';
                }
                $params = [
                    'docid' => $docid,
                    // 'access_token' => env('GOOGLE_DRIVE_REFRESH_TOKEN'),
                    // 'authuser' => '',
                ];
                if($ip) {
                  if($ip == 'v4') {                    
                    $result = apiCurl($this->domain_google_drive[0],'GET', $params , 'json');
                  } else {
                    $result = apiCurl($this->domain_google_drive[0],'GET', $params , 'json');                    
                  }
                }

                
                if(isset($result['http_code']) || empty($result)){
                    return [];
                }

                $result = urldecode($result);
                return $this->get_output($result,2);
            
            default:
                break;
        }
        return [];
        
    }

    private function get_output($result , $case = 1)
    {
        $output = [];
        switch ($case) {
            case 1:
                preg_match('/(&fmt_stream_map=)(.*)/', $result, $matches);
                // $result = urldecode($result);
                
                $result = urldecode($matches[2]);
                $result = preg_replace('/[^\/]+\.(drive|docs|mail)\.google\.com/', 'redirector.googlevideo.com', $result);
                $quality = [
                  '37' => ['label' => '1080p', 'type' => 'video/mp4'],
                  '22' => ['label' => '0720p', 'type' => 'video/mp4'],
                  '59' => ['label' => '0480p', 'type' => 'video/mp4'],
                  '18' => ['label' => '0360p', 'type' => 'video/mp4']
                ];
                $links = explode(',', $result);

                
                
                
                foreach($links as $key => $direct_link) {
                    
                    $direct_link = urldecode($direct_link);
                    preg_match('/https.*/', $direct_link, $matches);
                    if($key == 0 || count($matches) == 0) continue;


                        // $matches = preg_replace('/&docid=.*/', '', $matches); // remove docid
                        // $matches = preg_replace('/&driveid=.*/', '', $matches); // remove driveid

                        preg_match('/(.*)(\|)/', $direct_link, $itag);
                        preg_match('/&dur=([0-9.]+).*&/', $direct_link, $dur);
                        $duration = count($dur) > 1 ? $dur[1] : '';
                        // echo "<pre>";
                        // var_dump($matches);
                        // echo "</pre>";
                        // die();
                        
                        if(count($itag) > 1){
                            if(!is_null($itag[1]) || !is_null($matches[0])) {
                            if(!is_null($quality[$itag[1]])) {
                                $output[] = [
                                    'qualify'  => $quality[$itag[1]]['label'],
                                    'src'      => $matches[0],
                                    'type'     => $quality[$itag[1]]['type'],
                                    'duration' => (double)$duration
                                ];
                                
                            }
                        }
                    }
                  
                }

                rsort($output);
                
                
                $output = json_encode($output);
                $output = preg_replace('/(0)(720|480|360)(p)/', '$2$3', $output); // sort fix
                $output = json_decode($output);
                return $output;
            case 2:
                // $data = urldecode($result);
                $arr = explode("&", $result);
                
                foreach ($arr as $value) {
                    if(strpos($value, "url=https") === 0){
                        $url = str_replace("url=", "", $value);
                        $url = urldecode($url);
                        $output[] = [
                            'qualify'  => '',
                            'src'      => $url,
                            'type'     => '',
                            'duration' => ''
                        ];
                        break;
                    }
                }
                
                

                break;            
            default:
                break;
        }
        return $output;
        
    }

    // private function get_link_fimfast($item)
    // {
    //     $data = apiCurl($item->source_link,'GET',[],'json','v4',['referer' => $item->more_info->referer]);

    //     if(isset($data->id)){
    //         $result['sources'] = $data->sources;
    //         return $result;
    //     }
    //     return ['sources' => []];
    // }

    private function getMoreInfo($source_link,$source_name)
    {

        switch ($source_name) {
            case 'fimfast':
                $pat_case = "/.*.tap-([0-9]+)/";
                $matches = [];
                if(preg_match($pat_case, $source_link , $matches)){
                    $case = $matches[1];
                } else {
                    $case = 0;
                }


                $source_view = curlGetSourceView($source_link);
                $pat_id = '/data-id="([0-9]+)"/';
                $matches = [];
                if(preg_match($pat_id, $source_view , $matches)){
                    $id = $matches[1];
                    $url_api_episode = "https://fimfast.com/api/v2/films/".$id."/episodes?sort=name";
                    $header['referer'] = $source_link;
                    $dt = apiCurl($url_api_episode,'GET',[],'array','v4',$header);
                    if(isset($dt->data)){

                        switch ($case) {
                            case 0:
                                //phim lẻ
                                $more = [
                                    'link_api' => 'https://fimfast.com/api/v2/films/'.$id.'/episodes/'.$dt->data[0]->id,
                                    'X-Requested-With' => 'XMLHttpRequest',
                                    'referer' => $source_link,
                                ];
                                return $more;
                            
                            default:
                                foreach ($dt->data as $episode) {
                                    if((int)$episode->name != (int)$case)continue;
                                    $more = [
                                        'link_api' => 'https://fimfast.com/api/v2/films/'.$id.'/episodes/'.$episode->id,
                                        'X-Requested-With' => 'XMLHttpRequest',
                                        'referer' => $source_link,
                                    ];
                                    return $more;

                                }
                                $more = [
                                    'link_api' => 'https://fimfast.com/api/v2/films/'.$id.'/episodes/'.$dt->data[0]->id,
                                    'X-Requested-With' => 'XMLHttpRequest',
                                    'referer' => $source_link,
                                ];
                                return $more;
                        }
                        
                        
                    }
                }
            
            default:
                return null;
                
        }
        return null;
    }
}
