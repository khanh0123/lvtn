<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Permission;
use App\Models\Admin_group;
use App\Models\Admin_group_permission;
use Validator;
class AdminGroupController extends MainAdminController
{
	protected $model;
	protected $view_folder = 'admin/group/';
	protected $rules = [
		'name' => 'required',
		'per_id' => 'required'
	];

	public function __construct(Request $request) {
		$this->model = new Admin_group;
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


    	$permission = Permission::find((int)$req->per_id);
    	if(empty($permission)){
    		return [
    			'type' => 'error',
    			'message' => 'Vui lòng set quyền cho nhóm'
    		];
    	}

    	$item->name = $req->name;

    	return [
    		'type' => 'success'
    	];

    }
    /*
     * Show detail item that belongs to passed id.
     */
    public function detail(Request $request,$id)
    {
    	$item = $this->model->findById($id);

    	if(empty($item)){
    		return abort(404);
    	}
    	$data = $this->getDataNeed();
    	return view($this->view_folder."detail")
    	->withDataPermission($data)
    	->withData($item);
    }

    /*
     * Show view add new item.
     */
    public function add(Request $request) {

    	$data = $this->getDataNeed();
    	return view($this->view_folder."add")
    		->withData($data);
    }
    /*
     * Create new resource item.
     */

    public function store(Request $request) {

        $item = $this->model;
        $result = $this->setItem('insert',$request, $item);
        if($result['type'] == 'success'){
            // if(DB::connection()->getDoctrineColumn($this->model->getTable(), 'id')->getType()->getName() == 'string')
            //     $item->id = generate_id($this->model->getTable());
            if($item->save()){
    			$admin_gr_per = Admin_group_permission::where(array('gad_id' => $item->id))->first();
    			if(empty($admin_gr_per)){
    				$admin_gr_per = new Admin_group_permission();
    			}
    			$admin_gr_per->per_id = (int)$request->per_id;
    			$admin_gr_per->gad_id = $item->id;
    			$admin_gr_per->save();

    			
    			$result['message'] = 'Thêm dữ liệu thành công';
    		} else {
    			$result['message'] = 'Thêm dữ liệu thất bại';
    		}
            
        }

        $data = $this->getDataNeed();
        return view($this->view_folder."add")
        		->withData($data)
                ->withMessage($result); 
    }

    
    /*
     * Update item that belongs to passed id.
     */
    public function update(Request $request,$id)
    {
    	$item = $this->model::find($id);
    	if(empty($item)){
    		return abort(404);
    	}

    	$result = $this->setItem('update',$request, $item);
    	if($result['type'] == 'success'){
    		if($item->save()){
    			$admin_gr_per = Admin_group_permission::where(array('gad_id' => $item->id))->first();
    			if(empty($admin_gr_per)){
    				$admin_gr_per = new Admin_group_permission();
    			}
    			$admin_gr_per->per_id = (int)$request->per_id;
    			$admin_gr_per->gad_id = $item->id;
    			$admin_gr_per->save();

    			
    			$result['message'] = 'Cập nhật dữ liệu thành công';  
    		} else {
    			$result['message'] = 'Cập nhật dữ liệu thất bại';  
    		}
    		       
    	}

    	$item = $this->model->findById($id);
    	$data = $this->getDataNeed();
    	return view($this->view_folder."detail")
		    	->withData($item)
		    	->withDataPermission($data)
		    	->withMessage($result);


    }

    /*
     * Delete item that belongs to passed id.
     */

    public function delete(Request $request, $id) {
        $item = $this->model::find($id);        
        if(empty($item)){
            return abort('404');
        }

        if($this->model->check_group_exists_admin($id)){
            return Redirect::route('Admin.'.getUriFromUrl($request->url()).'.index')
                ->withMessage(['type' => 'error','message' => 'Nhóm này đang chứa thành viên. Lệnh xóa không thể thực hiện']);
        }
        $admin_gr_per = new Admin_group_permission();
        $admin_gr_per->where('gad_id',$id)->delete();
        $item->delete();
        

        return Redirect::route('Admin.'.getUriFromUrl($request->url()).'.index')
                ->withMessage(['type' => 'success','message' => 'Xóa dữ liệu thành công']);
    }
    private function getDataNeed(){
    	$ad_group_model = new Permission();
    	$data = $ad_group_model->getall();        
    	return $data;
    }
}
