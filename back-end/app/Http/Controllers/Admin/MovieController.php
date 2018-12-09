<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Movie;
use App\Models\Category; 
use App\Models\Genre; 
use App\Models\Country;
use App\Models\Movie_genre;
use App\Models\Movie_country;
use Validator;

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
    		'genre' => 'required|array',
    		'country' => 'required|array',

    	];


        
    	if($type === 'insert'){
            $rules['images'] = 'required|array';
            $rules['images.*'] = 'image|mimes:jpeg,jpg,bmp,png|max:10000';
        }
        else if($type === 'update'){
            $rules['listidimages_old'] = 'array';            
            
            if(empty($req->listidimages_old) || count($req->listidimages_old) == 0){
                $rules['images'] = 'required|array';
                $rules['images.*'] = 'image|mimes:jpeg,jpg,bmp,png|max:10000';
            } else {
                $rules['images'] = 'array';
                $rules['images.*'] = 'image|mimes:jpeg,jpg,bmp,png|max:10000|nullable';
            }
    		
    	}
        
    	$validator = Validator::make($req->all(), $rules);
        if ($validator->fails()) {
            

            
        	return [
        		'type' => 'error',
        		'message' => $validator->errors()->has('images') ? 'Hãy chọn ít nhất 1 ảnh' : 'Vui lòng kiểm tra lại các trường nhập'
        	];
        }
        $item->name = $req->name;
        $item->slug = $req->slug;
        
        $item->is_hot = (int)$req->input('is_hot', 0);
        $item->is_new = (int)$req->input('is_new', 0);
        // $item->type = (int)$req->input('type', 0);
        $item->runtime = (int)$req->input('runtime', 0);
        $item->epi_num = (int)$req->input('epi_num', 1);
        $item->title = $req->input('title', '');
        $item->short_des = $req->input('short_des', '');
        $item->long_des = $req->input('long_des', '');
        $item->release_date = strtotime($req->input('release_date',date("Y-m-d")));
        $item->ad_id = $req->authUser->id;
        $item->cat_id = $req->input('cat_id');

        if($type === 'insert'){
            $item->total_rate = 0;
            $item->avg_rate = 0;
        }
        
        
		if(!Category::find($item->cat_id)){
			return [
        		'type' => 'error',
        		'message' => 'Danh mục không tồn tại'
        	];
		}

        $images = [];

        if($type == 'update'){
            $images_old = $req->input('listidimages_old' , []);
            foreach ($item->images as $index => $img) {
                if(in_array($img->id, $images_old) ){                    
                    array_push($images, $img);
                } else {
                    File::delete(public_path().$img->path);
                }
            }
            
        }
        
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

        if(empty($images)){
            return [
                'type' => 'error',
                'message' => 'Hãy chọn ảnh cho phim'
            ];
        }
		$item->images = json_encode($images);
        return [
        	'type' => 'success'
        ];

    }

    public function store(Request $request) {

        $item = $this->model;
        $result = $this->setItem('insert',$request, $item);
        $data = $this->getDataNeed();
        if($result['type'] == 'success'){
            if($item->save()){


                //add data genre and country
                $arr_gen = array();
                $arr_cot = array();

                //check exists genre
                for ($i = 0; $i < count($request->genre); $i++) {
                    $gen_id = $request->genre[$i];
                    
                    if(Genre::find($gen_id)){
                        $arr_gen[] = [
                            'gen_id' => $gen_id,
                            'mov_id' => $item->id
                        ];
                    }
                }
                //check exists country
                for ($i = 0; $i < count($request->country); $i++) {
                    $cot_id = $request->country[$i];
                    
                    if(Country::find($cot_id)){
                        $arr_cot[] = [
                            'cot_id' => $cot_id,
                            'mov_id' => $item->id
                        ];
                    }
                }               
                
                //insert genre
                if(!empty($arr_gen)){
                    Movie_genre::insert($arr_gen);
                }
                //insert country
                if(!empty($arr_cot)){
                    Movie_country::insert($arr_cot);
                }

                $result['message'] = 'Thêm dữ liệu thành công';
            } else {
                $result['message'] = 'Thêm dữ liệu thất bại';
            }
            
        }
        return view($this->view_folder."add")
                ->withData($item)
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

        $dataMovGen = Movie_genre::where('mov_id',$item->id)->get();
        $dataMovCot = Movie_country::where('mov_id',$item->id)->get();
        $item->genre = $dataMovGen->toArray();
        $item->country = $dataMovCot->toArray();

        $item->images = json_decode($item->images);
        
        $data = $this->getDataNeed();
        
        return view($this->view_folder."detail")
                ->withData($item)
                ->withDataCat($data['data_cat'])
                ->withDataGen($data['data_gen'])
                ->withDataCot($data['data_cot']);

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
        $item->images = json_decode($item->images);
        $result = $this->setItem('update',$request, $item);
        if($result['type'] == 'success'){
            if($item->save()){
                //add data genre and country
                $arr_gen = array();
                $arr_cot = array();

                //check exists genre
                for ($i = 0; $i < count($request->genre); $i++) {
                    $gen_id = $request->genre[$i];
                    
                    if(Genre::find($gen_id)){
                        $arr_gen[] = [
                            'gen_id' => $gen_id,
                            'mov_id' => $item->id
                        ];
                    }
                }
                //check exists country
                for ($i = 0; $i < count($request->country); $i++) {
                    $cot_id = $request->country[$i];
                    
                    if(Country::find($cot_id)){
                        $arr_cot[] = [
                            'cot_id' => $cot_id,
                            'mov_id' => $item->id
                        ];
                    }
                }         

                $data_mov_gen = Movie_genre::where(['mov_id' => $item->id])->get();
                $data_mov_cot = Movie_country::where(['mov_id' => $item->id])->get();

                for ($i = 0; $i < count($data_mov_gen); $i++) {
                    if(!in_array($data_mov_gen[$i], $arr_gen)){
                        Movie_genre::where(
                            ['mov_id'=> $data_mov_gen[$i]->mov_id],
                            ['gen_id' => $data_mov_gen[$i]->gen_id]
                        )->delete();
                    } else {
                        array_push($arr_gen, $data_mov_gen[$i]);
                    }
                }
                for ($i = 0; $i < count($data_mov_cot); $i++) {
                    if(!in_array($data_mov_cot[$i], $arr_cot)){
                        Movie_country::where(['mov_id'=> $data_mov_cot[$i]->mov_id],['cot_id' => $data_mov_cot[$i]->cot_id])->delete();
                    } else {
                        array_push($arr_cot, $data_mov_cot[$i]);
                    }
                }
                
                //insert genre
                if(!empty($arr_gen)){
                    Movie_genre::insert($arr_gen);
                }
                //insert country
                if(!empty($arr_cot)){
                    Movie_country::insert($arr_cot);
                }
                $item->genre = $arr_gen;
                $item->country = $arr_cot;
                $item->images = json_decode($item->images);
                $result['message'] = 'Cập nhật dữ liệu thành công';
            } else {
                $result['message'] = 'Cập nhật dữ liệu thất bại';
            }
        }

        
        if(!isset($item->genre) || !isset($item->country)){
            $dataMovGen = Movie_genre::where('mov_id',$item->id)->get();
            $dataMovCot = Movie_country::where('mov_id',$item->id)->get();
            $item->genre = $dataMovGen->toArray();
            $item->country = $dataMovCot->toArray();
        }
        
        
        $data = $this->getDataNeed();
        return view($this->view_folder."detail")
                ->withData($item)
                ->withDataCat($data['data_cat'])
                ->withDataGen($data['data_gen'])
                ->withDataCot($data['data_cot'])
                ->withMessage($result);

        
    }

    public function search(Request $request)
    {
        $res = [];
        $mov_name = $request->mov_name;
        // $default_select = ['id','title','name'];
        if(empty($mov_name)){
            $res['error'] = true;
            $res['msg'] = 'Tên phim không được để trống';
        } else {
            $data = $this->model->search(['name','like',"%$mov_name%"]);
            $res['success'] = true;
            $res['data'] = $data;
        }
        return Response()->json($res,200);
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
