<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Genre;
use Validator;
class GenreController extends MainAdminController
{
	protected $model;
	protected $view_folder = 'admin/genre/';
	

	public function __construct(Request $request) {
        $this->model = new Genre;
        parent::__construct($request);
    }


    public function setItem($type , $req , &$item){
    	$rules = [
    		'name' => 'required',
    	];
    	$validator = Validator::make($req->all(), $rules);
        if ($validator->fails()) {
        	return [
        		'type' => 'error',
        		'message' => 'Vui lòng kiểm tra lại các trường nhập'
        	];
        }
        $slug = $req->slug ? $req->slug : $req->name;
        $item->name = $req->name;
    	$item->slug = create_slug($slug);
    	
        return [
        	'type' => 'success',
        	'message' => $type == 1 ? 'Thêm dữ liệu thành công' : 'Cập nhật thành công',
        ];
    	
    }
}
