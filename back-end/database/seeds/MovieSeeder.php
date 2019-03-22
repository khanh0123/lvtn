<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Episode;
use App\Models\Episode_video;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //code để gộp file json lại thành 1 file
        // $data = [];
        // for ($i = 1; $i < 15; $i++) {
        //     $path = storage_path() . "/jsons/phimle$i.json";
        //     $json = json_decode(file_get_contents($path));
        //     $data = array_merge($data,$json->data);

        // }

        // $data = json_encode(array_reverse($data),JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS);
        // $fp = fopen(storage_path() . "/jsons/phimle.json", 'w');
        // fwrite($fp, $data);
        // fclose($fp);


        $result = DB::table('movie')->get();
        if(count($result) == 0){
            $path = storage_path() . "/jsons/phimbo1.json"; // ie: /var/www/laravel/app/storage/json/filename.json

            $items = json_decode(file_get_contents($path)); 

            $data = $items->items;
            $array_data = [];
            $_id = 1;
            foreach ($data as $key => $value) {

                $images = [];
                $id = generate_id();
                $images = [
                    'poster' => [
                        'id' => $id,
                        'url' => $value->images->vod_thumb_big
                    ],
                    'thumbnail' => [
                        'id' => $id,
                        'url' => $value->images->poster
                    ],
                ];


                $array_data[] = [
                    'id' => $_id,
                    'name'         => $value->title,
                    'slug'         => slugify($value->title),
                    'total_rate'   => 0,
                    'avg_rate'     => 0,
                    'is_hot'       => rand(0,1),
                    'is_new'       => rand(0,1),
                    'is_banner'    => rand(0,1),
                    'runtime'      => $value->runtime,
                    'epi_num'      => $value->episode,                    
                    'short_des'    => html_entity_decode($value->short_description),
                    'long_des'     => html_entity_decode($value->long_description),
                    'release_date' => strtotime($value->release_date),
                    'ad_id'        => 1,
                    'cat_id'       => "cat001",
                    'images'       => json_encode($images)
                ];
                $_id++;
            }
            $array_data = array_reverse($array_data);
            
            DB::table('movie')->insert($array_data);

            //Thêm phim lẻ
            $path = storage_path() . "/jsons/phimle1.json";
            $data = json_decode(file_get_contents($path));            
            $array_data = [];
            $arr_movie_episode = [];
            $arr_video = [];
            $arr_video_episode = [];
            $arr_movie_country = [];
            $row_count_inserted = 0;
            $nextId = DB::table('movie')->max('id') + 1;

            foreach ($data as $key => $value) {

                $id = generate_id();
                $images = [
                    'thumbnail' => [
                        'id'  => $id,
                        'url' => $value->thumbnail
                    ],
                    'poster' => [
                        'id'  => $id,
                        'url' => $value->poster
                    ]

                ];
                $array_data[] = [
                    'id' => $_id,
                    'name'         => $value->name,
                    'slug'         => create_slug($value->name),
                    'total_rate'   => 0,
                    'avg_rate'     => 0,
                    'is_hot'       => rand(0,1),
                    'is_new'       => rand(0,1),
                    'is_banner'    => rand(0,1),
                    'runtime'      => (int)$value->time,
                    'epi_num'      => 1,
                    'short_des'    => html_entity_decode($value->description),
                    'long_des'     => html_entity_decode($value->description),
                    'release_date' => time(),
                    'ad_id'        => 1,
                    'cat_id'       => "cat002",
                    'trailer'      => $value->trailer,
                    'images'       => json_encode($images)
                ];
                $arr_movie_episode[] = [
                    'id'        => $_id,
                    'mov_id'    => $_id,
                    'slug'      => '',
                    'title'     => '',
                    'episode'   => 1,
                    'images'    => '',
                    'short_des' => '',
                    'long_des'  => '',

                ];
                if(!empty($value->episode_id)){
                    $more = [
                        'referer' => 'https://fimfast.com/'.$value->slug,
                        'X-Requested-With' => 'XMLHttpRequest',
                    ];
                    $arr_video[] = [
                        'id'          => $_id,
                        'source_link' => 'https://fimfast.com/api/v2/films/'.$value->id.'/episodes/'.$value->episode_id,
                        'source_name' => 'fimfast',
                        'link_play'   => '',
                        'ad_id'       => 1,
                        'more_info'   => json_encode($more),
                    ];
                    $arr_video_episode[] = [
                        'epi_id'   => $_id,
                        'video_id' => $_id,
                    ];
                }

                //movie_country
                if(!empty($value->country->data)){
                    // foreach ( as $v) {
                    //     echo "<pre>";
                    //     var_dump($v);
                    //     echo "</pre>";
                    //     die();

                        
                        $country = DB::table('country')->where('name',"like","%".$value->country->data->name."%")->first();
                        if(!empty($country)){
                            $arr_movie_country[] = [
                                'cou_id' => $country->id,
                                'mov_id' => $_id,
                            ];
                        } else {
                            echo "không tồn tại quoc gia ".$value->country->data->name;
                        }
                    // }
                    
                }

                //movie_genre
                if(!empty($value->genre->data)){
                    foreach ($value->genre->data as $v) {
                        $genre = DB::table('genre')->where('name',"like","%$v->name%")->first();
                        if(!empty($genre)){
                            $arr_movie_genre[] = [
                                'gen_id' => $country->id,
                                'mov_id' => $_id,
                            ];
                        } else {
                            echo "không tồn tại the loai $v->name";
                        }
                    }
                    
                }
                if($row_count_inserted < 300 && $key < count($data)-1)
                    $row_count_inserted ++;
                else {
                    // $array_data = array_reverse($array_data);
                    DB::table('movie')->insert($array_data);
                    DB::table('episode')->insert($arr_movie_episode);
                    DB::table('video')->insert($arr_video);
                    DB::table('episode_video')->insert($arr_video_episode);
                    DB::table('movie_country')->insert($arr_movie_country);
                    $row_count_inserted = 0;
                    $array_data         = [];
                    $arr_video          = [];
                    $arr_movie_episode  = [];
                    $arr_video_episode  = [];
                    $arr_movie_country  = [];
                }

                $_id++;
            }

            //insert genre of movie
            // DB::table('movie')->insert($array_data);
            // $arr_genre = [];

            // $row_count_inserted = 0;
            // foreach ($data as $key => $value) {

            //     foreach ($value->genres->data as $v) {

            //         $gen = DB::table("genre")->where("name","like","%$v->name%")->first();
            //         if(empty($gen)){
            //             echo "không tồn tại thể loại $v->name";
            //             continue;
            //         }
            //         $mov = DB::table("movie")->where("name","=","$value->name")->first();
            //         $arr_genre[] = [
            //             'gen_id' => $gen->id,
            //             'mov_id' => $mov->id
            //         ];
            //     }

            //     if($row_count_inserted < 300)
            //         $row_count_inserted ++;
            //     else {
            //         DB::table('movie_genre')->insert($arr_genre);
            //         $row_count_inserted = 0;
            //         $arr_genre = [];
            //     }
            // }
            // DB::table('movie_genre')->insert($arr_genre);
        }
    }
}
