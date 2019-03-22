<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use DB;
class Controller extends BaseController
{
    
    protected $jwt_secret_key;
    public function __construct()
    {
        $this->jwt_secret_key = env('JWT_SECRET','gKnoIKZmWLX91ibxLE1fYqp3DTSUx5Z6');
    }
    protected function template_api($data = []){

        return !isset($data['error']) ? Response()->json($data , 200) : Response()->json($data , 400);
    }
    protected function template_err($msg = ''){    


        return Response()->json(['error' => true,'msg' => $msg],400);
    }
    protected function generate_access_token($data){
        $token = \Firebase\JWT\JWT::encode($data, $this->jwt_secret_key , 'HS256');
        return $token;
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
