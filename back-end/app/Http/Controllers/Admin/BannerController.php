<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Banner;
use App\Models\Movie;
use Validator;
class BannerController extends MainAdminController
{
	protected $model;
	protected $view_folder = 'admin/banner/';
	protected $rules = [
        'mov_id' => 'required',
       	
    ];

	public function __construct(Request $request) {
        $this->model = new Banner;
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
        
        $item->mov_id = $req->mov_id;
        $item->mov_name = Movie::where('id',$item->mov_id)->first()->name;
        $item->id = generate_id();
        $item->created_at = time();
        $item->updated_at = $item->created_at;
        return [
            'type' => 'success'
        ];
        
    }

    public function index(Request $request ) {        
        // $limit = $request->input('limit', $this->limit);
        // $sort = $request->input('sort') == 'asc' ? 'asc' : 'desc';
        $result = $this->model->get();
        
        $message = session()->get( 'message' );
        return view($this->view_folder."index")
                ->withData($result)
                ->withMessage($message);
    }
    /*
     * Show view add new item.
     */
    public function add(Request $request) {
        $message = session()->get( 'message' );
        return view($this->view_folder."add")
            ->withMessage($message);
    }

    /*
     * Show detail item that belongs to passed id.
     */
    public function detail(Request $request,$id)
    {
        return abort(404);
        // $item = $this->model->getById($id);

        // if(empty($item)){
        //     return abort(404);
        // }
        // $message = session()->get( 'message' );
        // return view($this->view_folder."detail")
        //         ->withData($item)
        //         ->withMessage($message);
    }

    /*
     * Update item that belongs to passed id.
     */
    public function update(Request $request,$id)
    {
        return abort(404);
        // $item = $this->model::find($id);
        // if(empty($item)){
        //     return abort(404);
        // }
        
        // $result = $this->setItem('update',$request, $item);
        // if($result['type'] == 'success'){
        //     $item->save();   
        //     $result['message'] = 'Cập nhật dữ liệu thành công';         
        // }
        // return view($this->view_folder."detail")
        //         ->withData($item)
        //         ->withMessage($result);

        
    }
    /*
     * Delete item that belongs to passed id.
     */

    public function delete(Request $request, $id) {
        $item = $this->model->getById($id);
        if(empty($item)){
            return abort('404');
        }
        $item->delete($id);

        return Redirect::route('Admin.'.getUriFromUrl($request->url()).'.index')
                ->withMessage(['type' => 'success','message' => 'Xóa dữ liệu thành công']);
    }
    /*
     * Create new resource item.
     */

    public function store(Request $request) {

        $item = $this->model;
        $result = $this->setItem('insert',$request, $item);
        if($result['type'] == 'success'){

            $this->model->insert($item);
            $result['message'] = 'Thêm banner thành công';
        }
        return Redirect::back()->withMessage($result);
    }
}
