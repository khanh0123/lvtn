<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Menu;
use Validator;
use App\Models\Category; 
use App\Models\Genre; 
use App\Models\Country;
class MenuController extends MainAdminController
{
	protected $model;
	protected $limit = 20;
	protected $view_folder = 'admin/menu/';
	

	public function __construct(Request $request) {
        $this->model = new Menu;
        parent::__construct($request);
    }

    /*
     * Show view add new item.
     */
    public function add(Request $request) {

        $data = $this->getDataNeed();
        
        return view($this->view_folder."add")
                    ->withData($data);
    }


    public function setItem($type , $req , &$item){
    	$rules = [
    		'name' => 'required',
    		'slug' => 'required',
    		'sub_menu'
    	];
    	$validator = Validator::make($req->all(), $rules);
        if ($validator->fails()) {
        	return [
        		'type' => 'error',
        		'message' => 'Vui lòng kiểm tra lại các trường nhập'
        	];
        }
        $item->name = $req->name;
        $item->slug = $req->slug;
        $item->sub_menu = implode(",", $req->sub_menu ? $req->sub_menu : []);

        
        return [
        	'type' => 'success',
        	'message' => $type == 1 ? 'Thêm dữ liệu thành công' : 'Cập nhật thành công',
        ];

    }

    public function store(Request $request) {

        $item = $this->model;
        $result = $this->setItem('insert',$request, $item);
        $data = $this->getDataNeed();
        if($result['type'] == 'success'){
            if($item->save()){
                $result['message'] = 'Thêm dữ liệu thành công';
            } else {
                $result['message'] = 'Thêm dữ liệu thất bại';
            }
            
        }
        return view($this->view_folder."add")
                ->withMessage($result)
                ->withData($data);
    }

    /*
     * Show detail item that belongs to passed id.
     */
    public function detail(Request $request,$id)
    {
        $item = $this->model::find($id);


        if(empty($item)){
            return abort(404);
        }
        $item->sub_menu = explode(",", $item->sub_menu);
        $data = $this->getDataNeed();

        return view($this->view_folder."detail")
                ->withData($item)
                ->withData2( $data);
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
        $data = $this->getDataNeed();
        $result = $this->setItem('update',$request, $item);
        if($result['type'] == 'success'){
            if($item->save()){
                $item->sub_menu = explode(",", $item->sub_menu);
                $result['message'] = 'Cập nhật dữ liệu thành công';
            } else {
                $result['message'] = 'Cập nhật dữ liệu thất bại';
            }
        }
        return view($this->view_folder."detail")
                ->withData($item)
                ->withData2($data)
                ->withMessage($result);

        
    }

    private function getDataNeed(){
        $data = array();

        $cat_model = new Category();
        $gen_model = new Genre();
        $cot_model = new Country();

        $data_cat = $cat_model->getall();
        $data_gen = $gen_model->getall();
        $data_cot = $cot_model->getall();

        if(count($data_cat) > 0) {
            foreach ($data_cat as $value) {
                array_push($data, $value);
            }
        }
        if(count($data_gen) > 0) {
            foreach ($data_gen as $value) {
                array_push($data, $value);
            }
        }
        if(count($data_cot) > 0) {
            foreach ($data_cot as $value) {
                array_push($data, $value);
            }
        }
        return $data;
    }

}
