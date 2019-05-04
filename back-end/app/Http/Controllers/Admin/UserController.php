<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class UserController extends MainAdminController
{   
    protected $model;
    protected $view_folder = 'admin/users/';
    protected $rules = [
        'insert' => [
            // 'email'      => 'required|email',
            // 'first_name' => 'required',
            // 'last_name'  => 'required',
            // 'gad_id'     => 'required|exists:admin_group,id',
            // 'password'   => 'required|min:6'
        ],
        'update' => [
            'email'      => 'required|email',
            // 'first_name' => 'required',
            // 'last_name'  => 'required',
            // 'gad_id'     => 'required|exists:admin_group,id',
        ],
    ];
    protected $columns_filter = [
		'id'         =>    'user.id',            
		'email'      =>    'user.email',            
		'name'       =>    'user.name',
		'fb_id'      =>    'user.fb_id',
		'email'      =>    'user.email',
		'avatar'     =>    'user.avatar',
		'status'     =>    'user.status',
		'created_at' =>    'user.created_at',
		'updated_at' =>    'user.updated_at',
    ];
    protected $columns_search = [];

    public function __construct(Request $request) {
        $this->model = new User;
        parent::__construct($request);
    }
    public function setItem($type , $req , &$item)
    {
    	$validator = Validator::make($req->all(), $this->rules[$type]);
        if ($validator->fails()) {
        	return [
        		'type' => 'error',
        		'msg' => $validator->errors()->first()
        	];
        }
    	switch ($type) {
            case 'update':
                $item->email = $req->email;
                return [
                	'type' => 'success'
                ];
            case 'insert':                
                break;            
        }
        return [
        	'type' => 'error'
        ];
    }
    public function lockuser(Request $request,$id)
    {
        $user = $this->model->find($id);
        if(empty($user)){
            abort(404);
        }
        
        $user->status = -1;
        $user->save();
        return Redirect("/admin/users/detail/$id")
                ->withMessage(['type' => 'success','msg' => 'Khóa tài khoản thành công']);

    }
    public function lockcomment(Request $request,$id)
    {
        $user = $this->model->find($id);
        if(empty($user)){
            abort(404);
        }
        
        $user->status = 2;
        $user->save();
        return Redirect("/admin/users/detail/$id")
                ->withMessage(['type' => 'success','msg' => 'Khóa bình luận thành công']);

    }
    public function unlockuser(Request $request,$id)
    {
        $user = $this->model->find($id);
        if(empty($user)){
            abort(404);
        }
        $user->status = 1;
        $user->save();
        return redirect("/admin/users/detail/$id")
                ->withMessage(['type' => 'success','msg' => 'Mở khóa tài khoản thành công']);
    }
    public function logout(Request $request)
    {
        if(session()->has('user')){
            session()->flush();
        }
        return redirect('/admin/login');
    }

    public function delete(Request $request, $id) {
        return abort('404');
    }

}
