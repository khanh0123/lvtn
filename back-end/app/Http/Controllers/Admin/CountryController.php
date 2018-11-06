<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Country;
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
        if($type == 1){
            $item->id = generate_id($this->model->getTable());
        }
        return [
            'type' => 'success'
        ];
        
    }
}
