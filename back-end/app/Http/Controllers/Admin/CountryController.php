<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Country;
use App\Models\Max_id;
use Validator;
class CountryController extends MainAdminController
{
	protected $model;
	protected $view_folder = 'admin/country/';
	protected $rules = [
        'name' => 'required',
        'slug' => '',
        'seo_des' => '',
        'seo_title' => '',
    ];

	public function __construct(Request $request) {
        $this->model = new Country;
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
        $item->slug = create_slug($req->slug ? $req->slug : $req->name);
        if($type == 'insert'){

            $result = Max_id::where(['table_name' => 'country'])->first();
            if(empty($result)){
                Max_id::insert(['table_name' => 'country','max_id' => 'cot000000']);
                $max_id = 'cot000000';
            } else {                
                $max_id = $result->max_id;
            }

            // var_dump($max_id);die;
            // $item->id = generate_id($this->model->getTable());
            $id_auto = auto_generate_id($max_id,6);
            $item->id =  $id_auto;
            Max_id::where(['table_name' => 'country'])->update(['max_id' => $id_auto]);
            
        }
        return [
            'type' => 'success'
        ];
        
    }
}
