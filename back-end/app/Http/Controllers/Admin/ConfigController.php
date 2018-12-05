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

    public function detail(Request $request,$id)
    {
        $item = $this->model->getById($id);

        if(empty($item)){
            return abort(404);
        }
        $message = session()->get( 'message' );
        return view($this->view_folder."detail")
                ->withData($item)
                ->withMessage($message);
    }

    /*
     * Update item that belongs to passed id.
     */
    public function update(Request $request,$id)
    {
        $item = $this->model->getById($id);
        if(empty($item)){
            return abort(404);
        }
        
        $result = $this->setItem('update',$request, $item);
        if($result['type'] == 'success'){
            $item->save();   
            $result['message'] = 'Cập nhật dữ liệu thành công';         
        }
        return view($this->view_folder."detail")
                ->withData($item)
                ->withMessage($result);

        
    }
    /*
     * Delete item that belongs to passed id.
     */

    public function delete(Request $request, $id) {
        $item = $this->model->getById($id);
        if(empty($item)){
            return abort('404');
        }
        $item->delete();

        return Redirect::route('Admin.'.getUriFromUrl($request->url()).'.index')
                ->withMessage(['type' => 'success','message' => 'Xóa dữ liệu thành công']);
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
