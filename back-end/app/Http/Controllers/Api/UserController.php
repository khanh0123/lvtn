<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\User_rating_movie;
use App\Models\User_end_times_episode;
use Validator;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;

class UserController extends Controller
{
	
    private $domain_graph_fb = "https://graph.facebook.com/v2.8/";

    protected $model;
    protected $limit = 20;
    protected $rules = [
        'login' => [
            'email'    => 'required|exists:user,email',
            'password' => 'required',
        ],
        'login_fb' => [
            'access_token' => 'required',
        ],
        'rating' => [
            'mov_id' => 'required|exists:movie,id',
            'rate' => 'required|min:0|max:5',
        ],
        'end_time' => [
            'episode_id' => 'required|exists:episode,id',
            'time_watched' => 'min:0',
        ],
    ];
    protected $columns_filter = [

    ];
    protected $columns_search = [];

    public function __construct(Request $request) {
        parent::__construct();
        $this->model = new User;
    }
    /*
     * Show view add new item.
     */
    public function get_login_status(Request $request)
    {
        $token = $request->header("Authorization");
        if(empty($token)){
            $response =  [
                // 'error' => true,
                'isLogged' => false,
                'msg'  => 'An access token is required'
            ];
        } else {
            try {
                $this->jwt_secret_key = env('JWT_SECRET','gKnoIKZmWLX91ibxLE1fYqp3DTSUx5Z6');
                $credentials = JWT::decode($token, $this->jwt_secret_key, ['HS256']);

                //validate


                //end
                $result = $this->model::select('id','name','avatar','email')->where([
                    ['user.id','=',$credentials->id],
                    ['user.status' , '=' , 1],
                ])->first();
                if(empty($result)){
                    $response =  [
                        'isLogged' => false,
                        'msg'  => 'Token is invalid'
                    ];
                } else {
                    $response =  [
                        'info'  => $result,
                        'isLogged' => true,
                    ];
                }
            } catch(ExpiredException $e) {
                $response =  [
                    'isLogged' => false,
                    'msg'  => 'Access Token is expired.'
                ];
            } catch(\Exception $e) {

                $response =  [
                    'isLogged' => false,
                    'msg'  => 'Access Token is invalid.',
                    // 'exception' => $e->getMessage(),
                ];
            }
            
        }

        return $this->template_api($response);
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules['login']);
        if ($validator->fails()) {
            $response =  ['msg'  => 'Email or password maynot be empty'];
            return $this->template_api($response);
        }
        $email    = $request->email;
        $password = $request->password;
        $result   = $this->model::where([['email' , $email] , ['password' , encode_password($password)]])->first();
        if(isset($result->id)){
            
            $token = $this->generate_access_token($request,$result);
            unset($result->password);
            unset($result->created_at);
            unset($result->updated_at);
            $response =  [
                'info'         => $result,
                'access_token' => $token
            ];
            
        } else {
            $response =  [
                'msg' => 'email or password not correct'
            ];
        }

        return $this->template_api($response);

    }
    public function login_fb(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules['login_fb']);
        if ($validator->fails()) {
            $response =  [
                // 'error' => true,
                'msg'  => 'An access token is required'
            ];
            
        }
        //data need to request graph facebook api
        $access_token = $request->access_token;
        $url = $this->domain_graph_fb."me";
        $params = ['access_token' => $access_token,'fields' => 'id,name,email,picture.type(large)'];
        

        //request to get info
        $info_user = apiCurl($url,'GET',$params,'json');        
        
        //check valid token facebook
        if(!is_string($info_user) && (isset($info_user->id) || isset($info_user['id'])) ){

            //check exists user already register
            $this->model = $this->model::where('fb_id',$info_user->id)->first();

            //user not exits
            if(empty($this->model->id)){

                //insert new user
                $this->model         = new User();
                $this->model->fb_id  = $info_user->id;
                $this->model->name   = $info_user->name;
                $this->model->email  = $info_user->email ? $info_user->email : '';
                $this->model->avatar = "http://graph.facebook.com/".$info_user->id."/picture?type=large";

                //insert success
                if(!$this->model->save()){
                    $response = ['error' => true,'msg'  => 'error 500'];
                }
            }

            if(!isset($response['error'])){
                //define time expire of token
                
                $token = $this->generate_access_token($request,$this->model);

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



    public function rating_movie(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules['rating']);
        if ($validator->fails()) {
            $response =  [
                'error' => true,
                'msg'  => 'err'
            ];
            
        } else {
            $rating = User_rating_movie::where([
                ['user_id',$request->authUser->id],['mov_id' => $request->mov_id]
            ])->first();
            if(empty($rating)) {
                $rating = new User_rating_movie();
                $rating->user_id = $request->authUser->id;
                $rating->mov_id = $request->mov_id;
            } 
            $rating->rating = $request->rating;
            $rating->save();
            $response = [
                'success' => true
            ];

        }

        return $this->template_api($response);
    }

    public function end_time_episode(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules['end_time']);
        if ($validator->fails()) {
            $response =  [
                'error' => true,
                'msg'  => 'err'
            ];
            
        } else {
            $end_time = User_end_times_episode::where([
                ['user_id',$request->authUser->id],['episode_id' => $request->mov_id]
            ])->first();
            if(empty($end_time)) {
                $end_time             = new User_rating_movie();
                $end_time->user_id    = $request->authUser->id;
                $end_time->episode_id = $request->episode_id;
                
            } 
            $end_time->time_watched = $request->time_watched;
            $end_time->save();
            $response = [
                'success' => true
            ];

        }

        return $this->template_api($response);
    }
}
