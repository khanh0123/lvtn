<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
// use App\Http\Controllers\Admin\MainAdminController;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Redirect;
use App\Models\Episode;
use App\Models\Movie;
use Validator;
class EpisodeController extends BaseController
{
	protected $model;
	protected $limit = 20;
	protected $view_folder = 'admin/episode/';

	public function __construct(Request $request) {
		$mov_id = $request->route('mov_id');
		$movie = Movie::find($mov_id);
		if(empty($movie)){
			abort(404);
		}
		$request->movie = $movie;
        $this->model = new Episode;
    }


    public function setItem($type , $req , &$item){
    	$rules = [
    		'title' => 'required',
    		'slug' => '',
    		'link_play' => 'array',
    		'link_play.*' => 'nullable',
    		'link_play*.source' => 'required',
    		'link_play*.method' => 'required|in:live,graph',
    		'link_play*.from' => 'required|in:facebook,google,others',
    		'link_play*.qualify' => 'required|in:0,360,480,720,1080',
    		'images' => 'array',
            'images.*' => 'image|mimes:jpeg,jpg,bmp,png|max:10000|nullable'
    	];
        if($type == 'update'){
            $rules['link_play_old'] = 'array';
            $rules['listidimages_old'] = 'array';
        }

        $link_play = [];
        $images = [];

        for ( $i = 0; $i < count( $req->link_play ); $i++ ) {           
            
            $link_play[] = json_decode($req->link_play[$i]);            
            $link_play[$i]->id = generate_id();
            
        }
        $req->link_play = $link_play;

        $validator = Validator::make($req->all(), $rules);
        if ($validator->fails()) {            
        	
            return [
                'type' => 'error',
                'message' => 'Vui lòng kiểm tra lại các trường nhập'
            ];
        }

        if($type == 'insert' || (int)$req->episode !== (int)$item->episode){

        	if($this->model::where([
        		['episode',$req->episode],
        		['mov_id',$req->route('mov_id')]
        	])->first()){
        		return [
        			'type' => 'error',
        			'message' => 'Tập phim này đã tồn tại'
        		];
        	}

        } else if($type == 'update'){

            //check link old and push to array link new            
            $link_play_old = $req->link_play_old;
            for ($i = 0; $i < count($link_play_old); $i++) {
                foreach ($item->link_play as $value) {
                    if($link_play_old[$i] == $value->id) {
                        array_unshift($link_play, $value);
                        continue;
                    }
                }
            }

            //check the images old
            $images_old = $req->input('listidimages_old' , []);
            foreach ($item->images as $index => $img) {
                if(in_array($img->id, $images_old) ){                    
                    array_push($images, $img);
                } else {
                    File::delete(public_path().$img->path);
                }
            }
        }

        // $images = array();
        //upload multiple images
		if($files = $req->file('images')){
			foreach($files as $file){
				$filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
				$extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
				
				$name = preg_replace("/\ /", '-', $filename).'-'.time().'.'.$extension;
				$file->move('uploaded/',$name);
				$images[] = [
					'id' => generate_id(),
					'path' => '/uploaded/' . $name
				];
			}
		}

        
        $item->link_play = json_encode($link_play);
        $item->images = json_encode($images);
        $item->mov_id = $req->movie->id;
        $item->title = $req->title;
        $item->episode = (int)$req->episode;
        $item->short_des = $req->input('short_des' , '');
        $item->long_des = $req->input('long_des' , '');
        $item->slug = create_slug($req->slug ? $req->slug : $req->title);

        return [
            'type' => 'success'
        ];
        
    }

    public function index(Request $request , $mov_id ) {        
        $limit = $request->input('limit', $this->limit);
        $sort = $request->input('sort','asc') == 'asc' ? 'asc' : 'desc';
        $result = $this->model->get($request->route('mov_id'),$limit,$sort);
        $result = $result->appends($request->all());
        
        
        $episodes_created = $this->getDataNeed($request);
        
        $message = session()->get( 'message' );
        return view($this->view_folder."index")
                ->withData($result)
                ->withDataEpisodesCreated($episodes_created)
                ->withDataMovie($request->movie)
                ->withSort($sort)
        		->withLimit($limit)
                ->withMessage($message);
    }

    /*
     * Show view add new item.
     */
    public function add(Request $request) {
        $message = session()->get( 'message' );
        $episodes_created = $this->getDataNeed($request);

        return view($this->view_folder."add")
            ->withDataMovie($request->movie)
            ->withDataEpisodesCreated($episodes_created)
            ->withMessage($message);
    }


    public function store(Request $request)
    {
    	$item = $this->model;
        $result = $this->setItem('insert',$request, $item);
        if($result['type'] == 'success'){
            $item->save();
            $result['message'] = 'Thêm dữ liệu thành công';
        }
        $episodes_created = $this->getDataNeed($request);
        return view($this->view_folder."add")
        		->withDataMovie($request->movie)
        		->withDataEpisodesCreated($episodes_created)
                ->withMessage($result); 
    }

    public function clone(Request $request , $mov_id)
    {

    	$how_creating = $request->how_creating;
    	
    	if(in_array($how_creating, ['default','options'])){
    		$from = (int)$request->from;
    		//check exists episode
    		if($episode = $this->model::where([
    			['episode',$from],
    			['mov_id',$request->route('mov_id')]
    		])->first()){    			
    			

    			//get list episodes exists
    			// $data_episodes = $this->model->get_all_episode_has_create($request->route('mov_id'));
    			$episodes_created = $this->getDataNeed($request);

    			$list_episodes = array();
    			//clone all episode missing
    			if($how_creating == 'default'){
    				for ($i = 1; $i <= $request->movie->epi_num; $i++) {
    					if(!in_array($i, $episodes_created)){
    						$new_episode = array(
    							'mov_id' => $episode->mov_id,
	    						'link_play' => $episode->link_play,
	    						'slug' => str_replace($episode->episode, $i , $episode->slug),
	    						'title' => str_replace($episode->episode, $i , $episode->title),
	    						'images' => $episode->images,
	    						'short_des' => $episode->short_des,
	    						'long_des' => $episode->long_des,
	    						'episode' => $i,
    						);
    						array_push($list_episodes, $new_episode);
    					}
    				}
    				
    			} else { //clone episode by epi_num
    				$list_epi_needs = $request->needs ? $request->needs : [];
    				for ($i = 0; $i < count($list_epi_needs); $i++) {
    					if(!in_array($list_epi_needs[$i],$episodes_created) && $list_epi_needs[$i] > 0 && $list_epi_needs[$i] <= $request->movie->epi_num){
    						$new_episode = array(
    							'mov_id' => $episode->mov_id,
	    						'link_play' => $episode->link_play,
	    						'slug' => str_replace($episode->episode, $list_epi_needs[$i] , $episode->slug),
	    						'title' => str_replace($episode->episode, $list_epi_needs[$i] , $episode->title),
	    						'images' => $episode->images,
	    						'short_des' => $episode->short_des,
	    						'long_des' => $episode->long_des,
	    						'episode' => (int)$list_epi_needs[$i],
    						);
    						
    						array_push($list_episodes, $new_episode);
    					}
    				}
    			}

    			
    			if(Episode::insert($list_episodes)){

    				$message = ['type' => 'success','message' => 'Sao chép thành công'];

    			} else {

    				$message = ['type' => 'error','message' => 'Sao chép không thành công'];

    			}

    		} else {

    			$message = ['type' => 'error','message' => 'Tập phim không tồn tại'];

    		}
    	} else {

    		$message = ['type' => 'error','message' => 'Sao chép không thành công'];

    	}

    	return redirect()->back()
    			->withMessage($message);
    }

    /*
     * Show detail item that belongs to passed id.
     */
    public function detail(Request $request,$mov_id,$id)
    {
        $item = $this->model::find($id);

        if(empty($item)){
            return abort(404);
        }
        $item->images = json_decode($item->images);
        $item->link_play = json_decode($item->link_play);

        $episodes_created = $this->getDataNeed($request);
        $message = session()->get( 'message' );
        return view($this->view_folder."detail")
                ->withData($item)
                ->withDataMovie($request->movie)
            	->withDataEpisodesCreated($episodes_created)
                ->withMessage($message);
    }

    public function update(Request $request,$mov_id,$id)
    {
        $item = $this->model::find($id);
        if(empty($item)){
            return abort(404);
        }
        $item->images = json_decode($item->images);
        $item->link_play = json_decode($item->link_play);

        $result = $this->setItem('update',$request, $item);
        if($result['type'] == 'success'){
            $item->save();
            $item->images = json_decode($item->images);
            $item->link_play = json_decode($item->link_play);
            $result['message'] = 'Cập nhật dữ liệu thành công';         
        }

        $episodes_created = $this->getDataNeed($request);
        
        return view($this->view_folder."detail")
                ->withData($item)
                ->withDataMovie($request->movie)
                ->withDataEpisodesCreated($episodes_created)
                ->withMessage($result);

    }

    /*
     * Delete item that belongs to passed id.
     */

    public function delete(Request $request,$mov_id, $id) {
        $item = $this->model::find($id);
        if(empty($item)){
            return abort('404');
        }
        $item->delete();

        return Redirect::to("admin/movie/$mov_id/episode")
                ->withMessage(['type' => 'success','message' => 'Xóa dữ liệu thành công']);
    }

    private function getDataNeed($request)
    {
    	$data_episodes = $this->model->get_all_episode_has_create($request->route('mov_id'));
    	$episodes_created = [];
    	foreach ($data_episodes as $value) {
    		$episodes_created[] = $value->episode;
    	}
    	return $episodes_created;
    }
}
