<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Menu;
use Validator;
class MenuController extends MainAdminController
{
	protected $model;
	protected $limit = 20;
	protected $view_folder = 'admin/menu/';
	

	public function __construct(Request $request) {
        $this->model = new Menu;
        parent::__construct($request);
    }


    public function setItem($type , $req , &$item){
    	$rules = [
    		'name' => 'required',
    		'slug' => 'required',
    		''
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

    /*
     * Show list item.
     */
    // public function add(Request $request) {   
    	    
    //     $limit = $request->input('limit', $this->limit);
    //     $sort = intval($request->input('sort' , 0)) == 1 ? 'desc' : 'asc';
    //     $result = $this->model->get($limit,$sort);
    //     $result = $result->appends($request->all());
    //     $message = session()->get( 'message' );
    //     return view($this->view_folder."index")
    //     		->withData($result)
    //             ->withMessage($message);
    // }


}
