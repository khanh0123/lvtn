<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Validator;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;

class UserController extends Controller
{
	
    private $domain_graph_fb = "https://graph.facebook.com/v2.6/";

    protected $model;
    protected $limit = 20;
    protected $rules = [
        'login' => [
            'access_token' => 'required',
        ]
    ];
    protected $columns_filter = [

    ];
    protected $columns_search = [];


    public function __construct(Request $request) {
        $this->model = new User;
    }
    /*
     * Show view add new item.
     */

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules['login']);
        if ($validator->fails()) {
            $response =  [
                'error' => true,
                'msg'  => 'An access token is required'
            ];
            
        }
        //data need to request graph facebook api
        $access_token = $request->access_token;
        $url = $this->domain_graph_fb."me";
        $params = ['access_token' => $access_token,'fields' => 'id,name,email'];
        

        //request to get info
        $info_user = apiCurl($url,'GET',$params,'array');        


        //check valid token facebook
        if(!is_string($info_user) && (isset($info_user->id) || isset($info_user['id'])) ){

            //define time expire of token
            $max_time   = !empty(env("MAX_TIME_LOGIN")) ? (double)env("MAX_TIME_LOGIN") : 60*60*2;
            $time_curr  = time();
            $time_exp   = $time_curr+$max_time; // Expiration time default 2 hours
            $clientIps  = $request->getClientIps();
            $user_agent = $request->header('User-Agent');
            
            
            //check exists user already register
            $this->model = $this->model::where('fb_id',$info_user->id)->first();

            //user not exits
            if(empty($this->model->id)){
                //get info facebook user
                $email  = $info_user->email ? $info_user->email : '';
                $fb_id  = $info_user->id;
                $name   = $info_user->name;
                $avatar = "http://graph.facebook.com/$fb_id/picture?type=large";

                //insert new user
                $this->model         = new User();
                $this->model->fb_id  = $fb_id;
                $this->model->name   = $name;
                $this->model->email  = $email;
                $this->model->avatar = $avatar;

                //insert success
                if($this->model->save()){
                    $id_user = $this->model->id;
                } else {
                    $response = ['error' => true,'msg'  => 'error 500'];
                }
                
            } else { //user already exists
                $id_user = $user->id;
                $email   = $user->email;
                $fb_id   = $user->fb_id;
                $name    = $user->name;
                $avatar  = $user->avatar;
            }

            if(!isset($response['error'])){
                $data_token = [
                    'id'  => $id_user,
                    'iat' => $time_curr,// Time when JWT was issued.
                    'exp' => $time_exp,
                ];   

                $data_encrypt_to_key  = array(//data need to create MD5 key to verify request
                    'id'         => $id_user,
                    'fb_id'      => $fb_id,
                    'name'       => $name,
                    'visitorIp'  => end($clientIps),
                    'user_agent' => $request->header('User-Agent'),
                );
                $data_token['key'] = createMD5Key($data_encrypt_to_key);

                $token = $this->generate_access_token($data_token);

                unset($this->model->password);
                unset($this->model->created_at);
                unset($this->model->updated_at);
                $response =  [
                    'info'         => $this->model,
                    'access_token' => $token
                ];

            } else {
                $response =  ['error' => true,'msg'  => 'login failed'];
            }

            
        } else {
            $response =  ['error' => true,'msg'  => 'access token is incorrect'];
        }

        return $this->template_api($response);
    }
}
