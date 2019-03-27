<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Movie;
use Validator;
class CommentController extends Controller
{
	protected $rules = [
        'insert' => [
			'content'  => 'required|max:255',
			'reply_id' => 'exists:comment,id',
			'mov_id'   => 'required|exists:movie,id'
        ],
        // 'get_by_movie' => [
        // 	'mov_id' => 'required|exists:movie,id',
        // ],
        
    ];
    protected $columns_filter = [
        'reply_id' => 'comment.reply_id'
        
    ];
    protected $columns_search = [];

    public function __construct(Request $request) {
        $this->model = new Comment;
    }

    public function setItem($type , $req , &$item){

    	$validator = Validator::make($req->all(), $this->rules[$type]);
    	if ($validator->fails()) {
    		return [
    			'error' => true,
    			'msg' => $validator->errors()
    		];
    	}

		$item->content = $req->content;
		$item->mov_id  = $req->mov_id;
		$item->user_id = $req->authUser->id;
		if($req->reply_id){
			$item->reply_id = $req->reply_id;
		}

    	return ['msg' => 'success'];

    }
    public function index(Request $request , $mov_id)
    {
    	// $validator = Validator::make($request->all(), $this->rules['get_by_movie']);
    	$movie = Movie::find($mov_id);

    	if (empty($movie)) {
    		$result = [
    			'error' => true,
    			'msg' => '400'
    		];
    	} else {
    		$filter = $this->getFilter($request);
    		// $filter['limit'] = 5;
    		$filter['conditions']['and'][] = ['comment.reply_id', '=' ,0];
    		$filter['conditions']['and'][] = ['comment.mov_id', '=' ,$mov_id];
    		$filter['conditions']['and'][] = ['comment.status', '=' ,'1'];
    		$result['info'] = $this->model->get_page($filter , $request);
            

    		foreach ($result['info'] as $key => $value) {
    			$filter['conditions']['and'] = [];
				$filter['conditions']['and'][] = ['comment.reply_id', '=' ,$value->id];
				$filter['conditions']['and'][] = ['comment.mov_id', '=' ,$mov_id];
				$filter['conditions']['and'][] = ['comment.status', '=' ,'1'];
    			$filter['limit'] = 20;
                $filter['sort'] = 'asc';
    			$data = $this->model->get_subcomment($filter , $request);
    			$result['info'][$key]->reply = $data;
    		}
            $count = Comment::where('mov_id',$mov_id)->count();
            
            $result['info'] = $result['info']->toArray();
            $result['info']['total'] = $count;
    		
    	}
    	return $this->template_api($result);
    }
    public function store(Request $request)
    {
    	$result = $this->setItem('insert',$request, $this->model);
    	if(!isset($result['error'])){

    		if($this->model->save()){
    			$result = [
    				'success' => true,
    				'info' => [
                        'id'         => $this->model->id,
                        'content'    => $this->model->content,
                        'user_id'    => $request->authUser->id,
                        'status'     => 1,
                        'created_at' => (string)$this->model->created_at,
                        'updated_at' => (string)$this->model->updated_at,
                        'reply_id'   => (int)$this->model->reply_id,
                        'avatar'     => $request->authUser->avatar,
                        'name'       => $request->authUser->name,
                        'reply'      => [],
    				],
    			];
    		} else {
    			$result = ['error' => true,'code' => 500];
    		}
    	}

    	return $this->template_api($result);
    }
}
