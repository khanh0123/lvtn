<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Config;
use Validator;
class ConfigController extends MainAdminController
{
	protected $model;
	protected $view_folder = 'admin/config/';
	

	public function __construct(Request $request) {
        $this->model = new Config;
        parent::__construct($request);
    }


    public function setItem($type , $req , &$item){
    	$rules = [
    		'key' => 'required',
    		'value' => 'required'
    	];
    	$validator = Validator::make($req->all(), $rules);
        if ($validator->fails()) {
        	return [
        		'type' => 'error',
        		'message' => 'Vui lòng kiểm tra lại các trường nhập'
        	];
        }
        $item->key = $req->key;
    	$item->value = $req->value;
        return [
        	'type' => 'success',
        	'message' => $type == 1 ? 'Thêm dữ liệu thành công' : 'Cập nhật thành công',
        ];
    	
    }
}
