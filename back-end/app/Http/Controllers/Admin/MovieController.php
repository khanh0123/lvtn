<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Movie;
use Validator;
use App\Models\Category; 
use App\Models\Genre; 
use App\Models\Country;
use Illuminate\Support\Facades\Storage;

class MovieController extends MainAdminController
{
	protected $model;
	protected $limit = 20;
	protected $view_folder = 'admin/movie/';
	

	public function __construct(Request $request) {
        $this->model = new Movie;
        parent::__construct($request);
    }

    /*
     * Show view add new item.
     */
    public function add(Request $request) {

        $data = $this->getDataNeed();
        
        return view($this->view_folder."add")
                ->withDataCat($data['data_cat'])
                ->withDataGen($data['data_gen'])
                ->withDataCot($data['data_cot']);
    }


    public function setItem($type , $req , &$item){
    	$rules = [
    		'name' => 'required',
    		'slug' => '',
    		'runtime' => 'required',
    		'release_date' => 'required',
    		'epi_num' => 'required',
    		'cat_id' => 'required',
    		'genre' => 'required',
    		'country' => 'required',

    	];
    	if($type === 'insert'){
    		// $rules['images'] = 'required|mimes:jpeg,jpg,bmp,png';
    	}
    	$validator = Validator::make($req->all(), $rules);
        if ($validator->fails()) {
        	// echo "<pre>";
        	// var_dump($validator->errors());
        	// echo "</pre>";
        	// die();
        	
        	return [
        		'type' => 'error',
        		'message' => 'Vui lòng kiểm tra lại các trường nhập'
        	];
        }
        $item->name = $req->name;
        $item->slug = $req->slug;
        $item->is_hot = (int)$req->input('is_hot', 0);
        $item->is_new = (int)$req->input('is_new', 0);
        $item->type = (int)$req->input('type', 0);
        $item->runtime = (int)$req->input('runtime', 0);
        $item->epi_num = (int)$req->input('epi_num', 1);
        $item->total_rate = 0;
        $item->avg_rate = 0;
        $item->title = $req->input('title', '');
        $item->short_des = $req->input('short_des', '');
        $item->long_des = $req->input('long_des', '');
        $item->release_date = strtotime($req->input('release_date', date("Y-m-d")));
        $item->ad_id = $req->authUser->id;
		$item->cat_id = $req->input('cat_id');

		if(!Category::find($item->cat_id)){
			return [
        		'type' => 'error',
        		'message' => 'Danh mục không tồn tại'
        	];
		}

		$images = array();

		//upload multiple images
		if($files = $req->file('images')){
			foreach($files as $file){
				$filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
				$extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
				
				$name = preg_replace("/\ /", '-', $filename).'-'.time().'.'.$extension;
				$file->move('uploaded/',$name);
				$images[] = [
					'id' => generate_id(),
					'path' => base_url().'/uploaded/' . $name
				];
			}
		}

		$item->images = json_encode($images);



        
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
                ->withDataCat($data['data_cat'])
                ->withDataGen($data['data_gen'])
                ->withDataCot($data['data_cot']);
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
        $cat_model = new Category();
        $gen_model = new Genre();
        $cot_model = new Country();

        $data_cat = $cat_model->getall();
        $data_gen = $gen_model->getall();
        $data_cot = $cot_model->getall();
        return [
        	'data_cat' => $data_cat,
        	'data_gen' => $data_gen,
        	'data_cot' => $data_cot,
        ];
    }

}
