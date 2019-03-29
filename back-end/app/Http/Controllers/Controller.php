<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use DB;
class Controller extends BaseController
{
    protected $req;
    protected $jwt_secret_key;
    protected $limit = 20;
    protected $columns_filter = [];
    protected $columns_search = [];
    protected $columns_search_multi = [];
    
    public function __construct(Request $request)
    {
        $this->req = $request;
        $this->jwt_secret_key = env('JWT_SECRET','gKnoIKZmWLX91ibxLE1fYqp3DTSUx5Z6');
    }
    protected function template_api($data = []){

        return !isset($data['error']) ? Response()->json($data , 200) : Response()->json($data , 400);
    }
    protected function template_err($msg = ''){    


        return Response()->json(['error' => true,'msg' => $msg],400);
    }
    protected function generate_access_token($request,$result){
        //info user
        $id_user = $result->id;
        $email   = $result->email;
        $fb_id   = $result->fb_id;
        $name    = $result->name;
        $avatar  = $result->avatar;

        //JWT progress
        $max_time   = $request->remember ? 60*60*24*7 : ( !empty(env("MAX_TIME_LOGIN")) ? (double)env("MAX_TIME_LOGIN") : 60*60*2 );
        $time_curr  = time();
        $time_exp   = $time_curr+$max_time; // Expiration time default 2 hours
        $clientIps  = $request->getClientIps();
        $user_agent = $request->header('User-Agent');
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
        $token = \Firebase\JWT\JWT::encode($data_token, $this->jwt_secret_key , 'HS256');
        return $token;
    }

    protected function getUserFromAccessToken($token){
        if(!$token) {
            // Unauthorized response if token not there
            return null;
        }

        try {
            $credentials = \Firebase\JWT\JWT::decode($token, $this->jwt_secret_key, ['HS256']);
        } catch(\Firebase\JWT\ExpiredException $e) {
            return null;
        } catch(Exception $e) {
            return null;
        }

        
        $result = \App\Models\User::where([
            ['id', '=', $credentials->id],
            ['status', '=', 1],
        ])->first();
                

        if(!empty($result)){
            //get the visitor ip
            $clientIps = $this->req->getClientIps();
            $visitorIp = end($clientIps);

            $data_encrypt_to_key  = array(//data need to create MD5 key to verify request
                'id'         => $result->id,
                'fb_id'      => $result->fb_id,
                'name'       => $result->name,
                'visitorIp'  => $visitorIp,
                'user_agent' => $this->req->header('User-Agent'),
            );
            
            if($credentials->key === createMD5Key($data_encrypt_to_key)){
                // put the user in the request class
                return $result;
            }
        } 

        return null;
    }

    /*
     * check exists slug on 3 table.
     */
    protected function check_exist_slug($slug)
    {        
        
        
        $data = \App\Models\Category::where(['slug' => $slug ])->first();
        // $data = DB::table('category')->where(['slug' => $slug ])->first();
        if(!empty($data)){            
            return $data;
        }
        $data = \App\Models\Genre::where(['slug' => $slug ])->first();
        // DB::table('genre')->where(['slug' => $slug ])->first();
        if(!empty($data)){
            return $data;
        }
        $data = \App\Models\Country::where(['slug' => $slug ])->first();
        // $data = DB::table('country')->where(['slug' => $slug ])->first();
        if(!empty($data)){
            return $data;
        }
        return false;
    }

    

    /*
     * get filter (sort , orderby , limit )
     */
    protected function getFilter($request)
    {
        $filter['sort']       = $request->get("sort") == "asc" ? "asc" : "desc";
        $filter['orderBy']    = $this->getOrderBy($request);
        $limit                = (int)$request->get("limit");
        $filter['limit']      = ($limit < 1 || $limit > 100)? $this->limit : $limit;
        $filter['conditions'] = $this->getConditionByRequest($request,$this->columns_filter);
        return $filter;
    }

    /*
     * get orderBy from request(default orderBy id)
     */

    protected function getOrderBy($req) {
        $order_by = $req->input('orderBy');
        if(isset($this->columns_filter[$order_by]) && Schema::hasColumn($this->model->getTable(), $order_by)){
            return $this->columns_filter[$order_by];
        }
        
        //default orderby first field in table
        $default = $this->model->getTable().".".DB::getSchemaBuilder()->getColumnListing($this->model->getTable())[0];
        return $default;
    }

    /*
     * get conditions to filter data from request.
     */
    protected function getConditionByRequest($req,$columns,$table = ''){
        $conditions = [
            'and'   => [],
            'or'    => [],
            'multi' => [],
        ];
        foreach ($columns as $key => $value) {
            if( $req->get($key) !== null ){
                if($key === "name"){                    
                    if(in_array($key, $this->columns_search)){
                        $conditions['or'][] = [$value, 'like' ,"%".$req->input($key)."%"];
                    }
                    continue;
                }

                if(!in_array($key, $this->columns_search)){
                    
                    //multiple value filter
                    if(in_array($key, $this->columns_search_multi)){
                        
                        $arr_val = explode(",", $req->input($key));
                        
                        if(count($arr_val) > 0) {
                            $conditions['multi'][$key] = $arr_val;
                        }
                        

                    } else {
                        $conditions['and'][] = [$value, '=' ,$req->input($key)];
                    }
                } else {
                    $conditions['or'][] = [$value, 'like' ,"%".$req->input($key)."%"];
                }
                
            }
        }      
        return $conditions;
    }

}
