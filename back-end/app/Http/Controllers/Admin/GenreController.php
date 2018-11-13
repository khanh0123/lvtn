<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Genre;
use App\Models\Max_id;
use Validator;
class GenreController extends MainAdminController
{
	protected $model;
	protected $view_folder = 'admin/genre/';
    protected $rules = [
        'name' => 'required',
        'slug' => '',
        'seo_des' => '',
        'seo_title' => '',
    ];
	

	public function __construct(Request $request) {
        $this->model = new Genre;
        parent::__construct($request);
    }


    public function setItem($type , $req , &$item){
    	
    	$validator = Validator::make($req->all(), $this->rules);
        if ($validator->fails()) {
        	return [
        		'type' => 'error',
        		'message' => 'Vui lòng kiểm tra lại các trường nhập'
        	];
        }
        
        $item->name = ucwords($req->name);
        
    	if($type == 'insert'){
            $item->slug = create_slug($req->slug ? $req->slug : $req->name);
            if ($this->check_exist_slug($item->slug)) {
                return [
                    'type' => 'error',
                    'message' => 'slug is unique field'
                ];
            }

            $result = Max_id::where(['table_name' => 'genre'])->first();
            if(empty($result)){
                Max_id::insert(['table_name' => 'genre','max_id' => 'gen000000']);
                $max_id = 'gen000000';
            } else {                
                $max_id = $result->max_id;
            }

            // var_dump($max_id);die;
            // $item->id = generate_id($this->model->getTable());
            $id_auto = auto_generate_id($max_id,6);
            $item->id =  $id_auto;
            Max_id::where(['table_name' => 'genre'])->update(['max_id' => $id_auto]);
            
        } else if($type == 'update' && $item->slug !== create_slug($req->slug ? $req->slug : $req->name)) {
            if ($this->check_exist_slug($item->slug)) {
                return [
                    'type' => 'error',
                    'message' => 'slug is unique field'
                ];
            }
            

        }
        return [
        	'type' => 'success'
        ];
    	
    }
}
