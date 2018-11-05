<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
// use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Redirect;
use Validator;

// use Illuminate\Foundation\Validation\ValidatesRequests;
// use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MainAdminController extends BaseController
{
	private $limit = 20;
    public function __construct(Request $request) {
        if (!isset($this->model)) {
            throw new Exception("ModelNotSet");
        }
        if (!isset($this->view_folder)) {
            throw new Exception("ViewFolderNotSet");
        }
    }
    /*
     * Show list item.
     */
    public function index(Request $request) {        
        $limit = $request->input('limit', $this->limit);
        $sort = intval($request->input('sort' , 0)) == 1 ? 'desc' : 'asc';
        $result = $this->model->get($limit,$sort);
        $result = $result->appends($request->all());
        $message = session()->get( 'message' );
        return view($this->view_folder."index")
        		->withData($result)
                ->withMessage($message);
    }
    /*
     * Show view add new item.
     */
    public function add(Request $request) {
        return view($this->view_folder."add");
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
        return view($this->view_folder."detail")
                ->withData($item);
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
        
        $result = $this->setItem(2,$request, $item);
        if($result['type'] == 'success'){
            $item->save();            
        }
        return view($this->view_folder."detail")
                ->withData($item)
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
        $item->delete();

        return Redirect::route('Admin.'.getUriFromUrl($request->url()).'.index')
                ->withMessage(['type' => 'success','message' => 'Xóa dữ liệu thành công']);
    }
    /*
     * Create new resource item.
     */

    public function store(Request $request) {

        $item = $this->model;
        $result = $this->setItem(1,$request, $item);
        if($result['type'] == 'success'){
            $item->save();
        }
        return view($this->view_folder."add")
                ->withMessage($result); 
        return response()->json($item, 200);
    }
    
}
