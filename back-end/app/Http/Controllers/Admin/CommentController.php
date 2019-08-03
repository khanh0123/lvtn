<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
// use App\Http\Controllers\Admin\MainAdminController;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Redirect;
use App\Models\Movie;
use App\Models\Comment;
use Validator;
class CommentController extends MainAdminController
{
	protected $model;
	protected $view_folder = 'admin/comment/';

    protected $rules = [
        'insert' => [
            // 'title'      => 'required',
            // 'video_id'   => 'required|array',
            // 'video_id.*' => 'required|exists:video,id',
            // 'images'     => 'array',
            // 'images.*'   => 'image|mimes:jpeg,jpg,bmp,png|max:10000|nullable'
            
        ],
        'update' => [
            // 'title'            => 'required',
            // 'video_id'         => 'array',
            // 'video_id.*'       => 'exists:video,id',
            // 'images'           => 'array',
            // 'images.*'         => 'image|mimes:jpeg,jpg,bmp,png|max:10000|nullable',
            // 'listidimages_old' => 'array',
        ]
    ];
    protected $columns_filter = [
		'content'    => 'comment.content',
		'user_id'    => 'comment.user_id',
		'reply_id'   => 'comment.reply_id',
		'status'     => 'comment.status',
		'mov_id'     => 'comment.mov_id',
		'created_at' => 'comment.created_at',
		'created_at' => 'comment.updated_at',
    ];
    protected $columns_search = ['content'];

	public function __construct(Request $request) {
		$mov_id = $request->route('mov_id');
		$movie = Movie::find($mov_id);
		if(empty($movie)){
			abort(404);
		}
		$request->movie = $movie;
        $this->model = new Comment;
    }

    public function _index(Request $request , $mov_id ) {        
        $filter                        = $this->getFilter($request);
        $filter['conditions']['and'][] = ['comment.mov_id', '=' , $request->route('mov_id')];
        $data['info']                  = $this->model->getByMovie($filter,$request);
        // $data['more']                  = $this->getDataNeed($request);
        $data['movie']                 = $request->movie;
        $data['filter']                = $request->all();

        $data['info'] = formatResult($data['info'],[],'get');

        return $this->template($this->view_folder."index",$data);
    }

    /*
     * Show view add new item.
     */

    public function store(Request $request)
    {
    	if($request->isMethod("post")){ //insert
            $item = $this->model;
            $result = $this->setItem('insert',$request, $item);
            if($result['type'] == 'success'){
                if($item->save()){
                    //add data genre and country
                    $arr_video = array();

                    //check exists genre
                    for ($i = 0; $i < count($request->video_id); $i++) {

                        $arr_video[] = [
                            'video_id' => $request->video_id[$i],
                            'epi_id'   => $item->id
                        ];
                    }
                    if(!empty($arr_video)){
                        Episode_video::insert($arr_video);
                    }

                    $result['msg'] = 'Thêm dữ liệu thành công';
                }
                
            }
        } else {
            $result = '';
        }
        $data['more']  = $this->getDataNeed($request);
        $data['movie'] = $request->movie;
        return $this->template($this->view_folder."add",$data,$result);
    }

    

    /*
     * Show detail item that belongs to passed id.
     */
    public function _detail(Request $request,$mov_id,$id)
    {
        

        $item = $this->model::find($id);
        if(empty($item)){
            return abort(404);
        }

        if($request->isMethod("post")){
            $item->images = json_decode($item->images);
            $result = $this->setItem('update',$request, $item);
            if($result['type'] == 'success'){
                if($item->update()){
                    //add data genre and country
                    $arr_video = array();

                    //check exists genre
                    for ($i = 0; $i < count($request->video_id); $i++) {

                        $arr_video[] = [
                            'video_id' => $request->video_id[$i],
                            'epi_id'   => $item->id
                        ];
                    }

                    //get 
                    Episode_video::where(['epi_id'=> $id])->delete();
                    if(!empty($arr_video)){
                        Episode_video::insert($arr_video);
                    }
                }
                // $item->images = json_decode($item->images);
                $result['msg'] = 'Cập nhật dữ liệu thành công';         
            }
        } else {
            $result = '';
        }
        $filter                        = $this->getFilter($request);
        // $filter['conditions'];
        $filter['conditions']['and'][] = ['episode.id', '=' , $id];
        
        $items = $this->model->getById($filter,$request);
        
        $items = formatResult($items,[
            'videos' => ['video_id','source_link','source_name','max_qualify','video_created_at','video_updated_at'] ,
        ]);
        $item = $items[0];

        
        $item->images = !empty($item->images) ? json_decode($item->images) : [];
        
        $data['info']  = $item;
        
        $data['more']  = $this->getDataNeed($request);
        $data['movie'] = $request->movie;
        return $this->template($this->view_folder."detail",$data,$result);
    }

    /*
     * Delete item that belongs to passed id.
     */

    public function _delete(Request $request,$mov_id, $id) {
        $item = $this->model::find($id);
        if(empty($item)){
            return abort('404');
        }
        $item->status = -1;
        $item->update();

        return Redirect::to("admin/movie/$mov_id/comment")
                ->withMessage(['type' => 'success','msg' => 'Xóa bình luận thành công']);
    }

    public function recover(Request $request,$mov_id, $id)
    {
    	$item = $this->model::find($id);
        if(empty($item)){
            return abort('404');
        }
        $item->status = 1;
        $item->update();

        return Redirect::to("admin/movie/$mov_id/comment")
                ->withMessage(['type' => 'success','msg' => 'Khôi phục thành công']);
    }
    
}
