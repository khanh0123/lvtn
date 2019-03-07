<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\Category; 
use App\Models\Genre; 
use App\Models\Country;
use App\Models\Movie_genre;
use App\Models\Movie_country;

class MovieController extends Controller
{
	protected $model;
	protected $limit = 20;
    protected $columns_filter = [
        'name'         => 'movie.name',
        'runtime'      => 'movie.runtime',
        'epi_num'      => 'movie.epi_num',
        'is_hot'       => 'movie.is_hot',
        'is_new'       => 'movie.is_new',
        'release_date' => 'movie.release_date',
        'created_at'   => 'movie.created_at',
        'updated_at'   => 'movie.updated_at',
        'cat_id'       => 'movie.cat_id',
        'cat_slug'     => 'category.slug',
        'genre_id'     => 'genre.id',
        'cou_id'       => 'country.id',
        'slug'         => 'movie.slug'

        
    ];
    protected $columns_search = ['name','slug'];
	

	public function __construct(Request $request) {
        $this->model = new Movie;
        // parent::__construct($request);
    }
    /*
     * Show view add new item.
     */

    public function index(Request $request )
    {
        $filter         = $this->getFilter($request);
        $data['info']   = $this->model->get_page($filter , $request);
        $data['info']   = formatResult($data['info'],[
            'genre'         => ['gen_id','gen_name','gen_slug'] ,
            'country'       => ['cou_id' , 'cou_name' , 'cou_slug']
            ],'get');

        foreach ($data['info'] as $key => $value) {
            $data['info'][$key]->images = json_decode($data['info'][$key]->images);
        }
                
        return $this->template_api($data);
    }


    /*
     * Show detail item that belongs to passed id.
     */
    public function detail(Request $request,$id)
    {
        $filter         = $this->getFilter($request);
        $filter['conditions']['and'][] = ['movie.id','=',$id];
        $data['info']   = $this->model->get_page($filter , $request);
        $data['info']   = formatResult($data['info'],[
            'genre'         => ['gen_id','gen_name','gen_slug'] ,
            'country'       => ['cou_id' , 'cou_name' , 'cou_slug']
            ])[0];
        if($data['info']){
            $data['info']->images = json_decode($data['info']->images);
        } else {
            return $this->template_err('Error 404');
        }
        
                
        return $this->template_api($data);
    }
    

    public function getByTags(Request $request)
    {
        if($request->tags){
            $tags = $request->tags;
            $tags = explode(",", $tags);

            $filter['sort']       = $request->get("sort") == "asc" ? "asc" : "desc";
            $filter['orderBy']    = $this->getOrderBy($request);
            $limit                = (int)$request->get("limit");
            $filter['limit']      = ($limit < 1 || $limit > 100)? $this->limit : $limit;
            $conditions = [
                'and' => [],
                'or' => []
            ];

            //get tags
            $info_tags = [];
            for ($i = 0; $i < count($tags); $i++) {
                $slug = create_slug($tags[$i]);
                $tag_info = $this->check_exist_slug($slug);
                if(!empty($tag_info)){
                    $table_name = $tag_info->getTable();
                    $info_tags[] = $tag_info;
                    $conditions['and'][] = ["$table_name.slug",'=',$slug];
                }
                
            }
            $filter['conditions'] = $conditions;

            $data['info']   = $this->model->get_page($filter , $request);
            $data['info']   = formatResult($data['info'],[
                'genre'         => ['gen_id','gen_name','gen_slug'] ,
                'country'       => ['cou_id' , 'cou_name' , 'cou_slug']
            ],'get');
            $data['meta']['tags'] = $info_tags;

            foreach ($data['info'] as $key => $value) {
                $data['info'][$key]->images = json_decode($data['info'][$key]->images);
            }

        } else {
            $data= ['error' => true , 'msg' => 'tags is required'];
        }
        return $this->template_api($data);
        

    }


    

}
