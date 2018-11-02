<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
// use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
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

    public function index(Request $request) {        
        $limit = $request->input('limit', $this->limit);
        $sort = ($request->input('sort') && (int)$request->input('sort') == 1) ? 'asc' : 'desc';
        $result = $this->model->get($limit,$sort);
        // $result = $result->withPath('admin/config');
        $result = $result->appends($request->all());
        // echo "<pre>";
        // var_dump($result);
        // echo "</pre>";
        // die();
        
        
        return view($this->view_folder."index")
        		->withData($result);
    }

    /*
     * Get resource list (all). 
     * You can remove this function named all.
     */

    public function all(Request $request) {
        
        $status = $request->input('status', $this->statusAll);
        $sort = ($request->input('sort') && (int)$request->input('sort') == 1) ? 'asc' : 'desc';

        $result = $this->model::orderBy('id', $sort);
        $result = $result->where('status', $status)->get();
        return response()->json(['data' => $result], 200);
    }

    /*
     * Get resource item with id.
     */

    public function show(Request $request, $id) {

        $status = $request->input('status', $this->statusAll);

        $result = $this->model::where('status', $status);
        $item = $result->find($id);
        if(empty($item)){
            $error = ['messages' => ['notfound' => 'Item not exist']];
            return response()->json(['error' => $error], 400);
        }
        return response()->json(['data' => $item], 200);
    }

    /**
     * For validate request.
     */
    public function validateRequest(Request $request) {
        $this->validate($request, $this->rules);
    }

    /*
     * Create new resource item.
     */

    public function store(Request $request) {
        $validator = Validator::make($request->all(), $this->rules);
        if ($validator->fails()) {
            $error = [
                'messages' => $validator->errors()
            ];
            return response()->json(['error' => $error],400);
        }
        $item = $this->model;
        $this->setItem($request, $item);
        $item->save(); // $this->model::create($item);
        return response()->json($item, 200);
    }

    /*
     * Update item that belongs to passed id.
     */

    public function update(Request $request, $id) {

        $validator = Validator::make($request->all(), $this->rules);
        if ($validator->fails()) {

            return response()->json(['error' => ['messages' => $validator->errors()]],400);
        }

        $item = $this->model::find($id);
        if(empty($item)){
            $error = ['messages' => ['notfound' => 'Item not exist']];
            return response()->json(['error' => $error], 400);
        }
        $this->setItem($request, $item);
        $item->save();
        return response()->json(['data' => $item], 200);
    }

    /*
     * Delete item that belongs to passed id.
     */

    public function destroy(Request $request, $id) {
        $item = $this->model::find($id);
        if(empty($item)){
            $error = ['messages' => ['notfound' => 'Item is not exist']];
            return response()->json(['error' => $error], 400);
        }
        $item->status = -1;
        $item->save();
        // $item->delete();
        return response()->json(['data' => ['success' => true]], 200);
    }
}
