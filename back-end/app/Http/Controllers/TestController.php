<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\Movie_genre;
use App\Models\Movie;
use App\Models\Genre;
use Phpml\Classification\NaiveBayes;
use Phpml\Dataset\ArrayDataset;
use Storage;
class TestController extends Controller
{

	private $num_train = 1200;


	private function show($path){
		$files1 = scandir($path);
		foreach ($files1 as $value) {
			echo " - $value";
			if(strpos($value, '.') === false){
				echo "   ";
				$p = $path."\\$value";	
				
				$this->show($p);
			}
			echo "<br>";
		}
	}



	public function test_link_drive(Request $request)
	{
		die;
		// $path_sm_2 = storage_path() . "/jsons/data_split/phimle16.json";
		$path_big  = storage_path() . "/jsons/data_split/phimle16.json";

		// $data_sm_2 = json_decode(file_get_contents($path_sm_2),true);
		$data_big  = json_decode(file_get_contents($path_big),true);

        // $data = array_merge($data_big,array_reverse($data_sm_2));


        // echo "<pre>";
        // var_dump($data);
        // echo "</pre>";
        // die();
        

		// $data_sm = $data_sm['data'];
		// // $data = array_reverse($data);

		// unset($data_sm['data']);
		// unset($data_sm['total']);

		// foreach ($data_sm_2 as $key => $value) {
		// 	$data_sm_2[$key]['episode_id'] = $data_sm[$key]['episode_id'];
		// 	$data_sm_2[$key]['country'] = $data_sm[$key]['country'];
		// }

		// $data = json_encode($data,JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS);
		// $fp = fopen(storage_path() . "/jsons/phimle1.json", 'w');
		// fwrite($fp, $data);
		// fclose($fp);


		// echo $data;
		echo json_encode($data_big,JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS);
		die;
		// $this->get_id_episode_filmfast();
		// die;

        // $data = array_reverse($data);
		// $this->get_id_episode_filmfast();








        die;
		// $link = $request->link;
		$data = $this->get_curl();

		$data = urldecode($data);
		$arr = explode("&", $data);
		// strpos(haystack, needle)
		foreach ($arr as $value) {
			// echo strpos($value, "url=https")."<br>";
			if(strpos($value, "url=https") === 0){
				$url = str_replace("url=", "", $value);
				$url = urldecode($url);
				// $url = preg_replace("/(&driveid=.[a-z0-9A-Z_]+)&/", "", $url);
				
				break;
			}
		}
		echo $url;
		// echo json_encode($arr);
	}
	private function get_curl(){
		return "status=ok&hl=vi&allow_embed=0&ps=docs&partnerid=30&autoplay=0&docid=1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO&abd=0&public=true&el=embed&title=B%E1%BA%A3n+sao+c%E1%BB%A7a+C%C3%B4+G%C3%A1i+%C4%90%E1%BA%BFn+T%E1%BB%AB+H%C3%B4m+Qua+-+Full+HD.mp4&iurl=https%3A%2F%2Fdocs.google.com%2Fvt%3Fauthuser%3D0%26id%3D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO%26s%3DAMedNnoAAAAAXI9zSSfdZluUIFoxTs0JzOaSz58QhB50&cc3_module=https%3A%2F%2Fs.ytimg.com%2Fyt%2Fswfbin%2Fsubtitles3_module.swf&ttsurl=https%3A%2F%2Fdocs.google.com%2Ftimedtext%3Fauthuser%3D0%26id%3D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO%26vid%3Dbc9a6ae9161dea94&reportabuseurl=https%3A%2F%2Fdocs.google.com%2Fabuse%3Fauthuser%3D0%26id%3D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO&fmt_list=22%2F1280x720%2F9%2F0%2F115&token=1&plid=V0QVjQBaIRN5sA&fmt_stream_map=22%7Chttps%3A%2F%2Fr1---sn-i3belnez.c.docs.google.com%2Fvideoplayback%3Fexpire%3D1552912233%26ei%3DKVePXNj6JZiExwPP_7D4Cg%26ip%3D118.69.66.168%26cp%3DQVNKVEpfUVJRRFhOOk0wOUlvTDZPWFJtZmxmWUFTNk5lZ0U4WHRjVnBmd2dCWF9lU3ZreUZLbDM%26id%3Dbc9a6ae9161dea94%26itag%3D22%26source%3Dwebdrive%26requiressl%3Dyes%26mm%3D30%26mn%3Dsn-i3belnez%26ms%3Dnxu%26mv%3Dm%26pl%3D24%26ttl%3Dtransient%26susc%3Ddr%26driveid%3D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO%26app%3Dexplorer%26mime%3Dvideo%2Fmp4%26dur%3D7694.791%26lmt%3D1512017222480781%26mt%3D1552897774%26sparams%3Dexpire%252Cei%252Cip%252Ccp%252Cid%252Citag%252Csource%252Crequiressl%252Cttl%252Csusc%252Cdriveid%252Capp%252Cmime%252Cdur%252Clmt%26sig%3DALgxI2wwRQIhAMAalel5IWShrkSWekR7JddNmPxcAnOH_k41i3kPNBJ3AiBGsjWqvOJuzHWXc6oe_IZ8_fNv3sICBYorCHnbXIhXwQ%3D%3D%26lsparams%3Dmm%252Cmn%252Cms%252Cmv%252Cpl%26lsig%3DAHylml4wRQIgIRY4vquklUxCGhzdBRbrPkYCnT4cQue9C12CNCbi2KYCIQC1rcZhkmGgccPAKGg4fvduRBkQ_pTrIT_paHRKNkikqA%3D%3D&url_encoded_fmt_stream_map=itag%3D22%26url%3Dhttps%253A%252F%252Fr1---sn-i3belnez.c.docs.google.com%252Fvideoplayback%253Fexpire%253D1552912233%2526ei%253DKVePXNj6JZiExwPP_7D4Cg%2526ip%253D118.69.66.168%2526cp%253DQVNKVEpfUVJRRFhOOk0wOUlvTDZPWFJtZmxmWUFTNk5lZ0U4WHRjVnBmd2dCWF9lU3ZreUZLbDM%2526id%253Dbc9a6ae9161dea94%2526itag%253D22%2526source%253Dwebdrive%2526requiressl%253Dyes%2526mm%253D30%2526mn%253Dsn-i3belnez%2526ms%253Dnxu%2526mv%253Dm%2526pl%253D24%2526ttl%253Dtransient%2526susc%253Ddr%2526driveid%253D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO%2526app%253Dexplorer%2526mime%253Dvideo%252Fmp4%2526dur%253D7694.791%2526lmt%253D1512017222480781%2526mt%253D1552897774%2526sparams%253Dexpire%252Cei%252Cip%252Ccp%252Cid%252Citag%252Csource%252Crequiressl%252Cttl%252Csusc%252Cdriveid%252Capp%252Cmime%252Cdur%252Clmt%2526sig%253DALgxI2wwRQIhAMAalel5IWShrkSWekR7JddNmPxcAnOH_k41i3kPNBJ3AiBGsjWqvOJuzHWXc6oe_IZ8_fNv3sICBYorCHnbXIhXwQ%253D%253D%2526lsparams%253Dmm%252Cmn%252Cms%252Cmv%252Cpl%2526lsig%253DAHylml4wRQIgIRY4vquklUxCGhzdBRbrPkYCnT4cQue9C12CNCbi2KYCIQC1rcZhkmGgccPAKGg4fvduRBkQ_pTrIT_paHRKNkikqA%253D%253D%26type%3Dvideo%252Fmp4%253B%2Bcodecs%253D%2522avc1.42001E%252C%2Bmp4a.40.2%2522%26quality%3Dhd720&timestamp=1552897833634&length_seconds=7694";
		return "status=ok&hl=vi&allow_embed=0&ps=docs&partnerid=30&autoplay=0&docid=1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO&abd=0&public=true&el=embed&title=B%E1%BA%A3n+sao+c%E1%BB%A7a+C%C3%B4+G%C3%A1i+%C4%90%E1%BA%BFn+T%E1%BB%AB+H%C3%B4m+Qua+-+Full+HD.mp4&iurl=https%3A%2F%2Fdocs.google.com%2Fvt%3Fauthuser%3D0%26id%3D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO%26s%3DAMedNnoAAAAAXI9lyUNAFhklI--0qnwoaXH9lcr5ER6M&cc3_module=https%3A%2F%2Fs.ytimg.com%2Fyt%2Fswfbin%2Fsubtitles3_module.swf&ttsurl=https%3A%2F%2Fdocs.google.com%2Ftimedtext%3Fauthuser%3D0%26id%3D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO%26vid%3Dbc9a6ae9161dea94&reportabuseurl=https%3A%2F%2Fdocs.google.com%2Fabuse%3Fauthuser%3D0%26id%3D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO&fmt_list=22%2F1280x720%2F9%2F0%2F115&token=1&plid=V0QVjP01qqZg6w&fmt_stream_map=22%7Chttps%3A%2F%2Fr3---sn-i3b7kn7r.c.docs.google.com%2Fvideoplayback%3Fexpire%3D1552908777%26ei%3DqUmPXN2rF8KougWt9JrgBQ%26ip%3D118.69.66.168%26cp%3DQVNKVEpfV1dVSFhOOk0wOE90UDBPWFJtZmtsREVXNk5lZ0U3RHlnWnBmd2dCV19qV3preUZLbDI%26id%3Dbc9a6ae9161dea94%26itag%3D22%26source%3Dwebdrive%26requiressl%3Dyes%26mm%3D30%26mn%3Dsn-i3b7kn7r%26ms%3Dnxu%26mv%3Dm%26pl%3D24%26ttl%3Dtransient%26susc%3Ddr%26driveid%3D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO%26app%3Dexplorer%26mime%3Dvideo%2Fmp4%26dur%3D7694.791%26lmt%3D1512017222480781%26mt%3D1552894296%26sparams%3Dexpire%252Cei%252Cip%252Ccp%252Cid%252Citag%252Csource%252Crequiressl%252Cttl%252Csusc%252Cdriveid%252Capp%252Cmime%252Cdur%252Clmt%26sig%3DALgxI2wwRQIhAOIF7of5PbAqjLGI85jzYOmUG4K6dhywYMExa5lzxwE2AiA9Ju_KJ4Qdnvo7c2HV6WEaYDRrlo74RlATRKyZiW3u2w%3D%3D%26lsparams%3Dmm%252Cmn%252Cms%252Cmv%252Cpl%26lsig%3DAHylml4wRQIhAJ5XX1z5aFSwlpUi5ehphdZtx5FTuW8vt-pEDzC3xHXmAiBHea6cb4S-RM1nwM9ciEE9h7R2dktW7dsGo48ZU_oMUA%3D%3D&url_encoded_fmt_stream_map=itag%3D22%26url%3Dhttps%253A%252F%252Fr3---sn-i3b7kn7r.c.docs.google.com%252Fvideoplayback%253Fexpire%253D1552908777%2526ei%253DqUmPXN2rF8KougWt9JrgBQ%2526ip%253D118.69.66.168%2526cp%253DQVNKVEpfV1dVSFhOOk0wOE90UDBPWFJtZmtsREVXNk5lZ0U3RHlnWnBmd2dCV19qV3preUZLbDI%2526id%253Dbc9a6ae9161dea94%2526itag%253D22%2526source%253Dwebdrive%2526requiressl%253Dyes%2526mm%253D30%2526mn%253Dsn-i3b7kn7r%2526ms%253Dnxu%2526mv%253Dm%2526pl%253D24%2526ttl%253Dtransient%2526susc%253Ddr%2526driveid%253D1cdYTOXUYLBqWz52xeqPx51m9tEr_sPmO%2526app%253Dexplorer%2526mime%253Dvideo%252Fmp4%2526dur%253D7694.791%2526lmt%253D1512017222480781%2526mt%253D1552894296%2526sparams%253Dexpire%252Cei%252Cip%252Ccp%252Cid%252Citag%252Csource%252Crequiressl%252Cttl%252Csusc%252Cdriveid%252Capp%252Cmime%252Cdur%252Clmt%2526sig%253DALgxI2wwRQIhAOIF7of5PbAqjLGI85jzYOmUG4K6dhywYMExa5lzxwE2AiA9Ju_KJ4Qdnvo7c2HV6WEaYDRrlo74RlATRKyZiW3u2w%253D%253D%2526lsparams%253Dmm%252Cmn%252Cms%252Cmv%252Cpl%2526lsig%253DAHylml4wRQIhAJ5XX1z5aFSwlpUi5ehphdZtx5FTuW8vt-pEDzC3xHXmAiBHea6cb4S-RM1nwM9ciEE9h7R2dktW7dsGo48ZU_oMUA%253D%253D%26type%3Dvideo%252Fmp4%253B%2Bcodecs%253D%2522avc1.42001E%252C%2Bmp4a.40.2%2522%26quality%3Dhd720&timestamp=1552894377394&length_seconds=7694";
	}
	














	public function index()
	{
		// die;
		// // Get file listing...
		// $dir = public_path();
		

		// $this->show($dir);














		// die;

		// $googleDisk = Storage::disk('google');

		
		

  //       // Get file listing...
		// $dir = '/';
  //       $recursive = false; // Get subdirectories also?
  //       $contents = collect(Storage::cloud()->listContents($dir, $recursive));
        
  //       // Get file details...
  //       $file = $contents
  //       ->where('type', '=', 'file')        
  //       ->first(); // there can be duplicate file names!
  //       //return $file; // array with file info
  //       // Store the file locally...
  //       //$readStream = Storage::cloud()->getDriver()->readStream($file['path']);
  //       //$targetFile = storage_path("downloaded-{$filename}");
  //       //file_put_contents($targetFile, stream_get_contents($readStream), FILE_APPEND);
  //       // Stream the file to the browser...
  //       // return Response()->json($file);
  //       // echo "<pre>";
  //       // var_dump($file);
  //       // echo "</pre>";
  //       // die();
        
  //       $readStream = Storage::cloud()->getDriver()->readStream($file['path']);
  //       // echo "<pre>";
  //       // var_dump($readStream);
  //       // echo "</pre>";
  //       // die();
        
  //       return response()->streamDownload(function () use ($readStream) {
  //       	// stream_get_contents($readStream,5);
  //       	fpassthru($readStream);
  //       }, 200, [
  //       	'Content-Type' => $file['mimetype'],
  //       	"Content-Length" =>  $file['size'],
  //       //'Content-disposition' => 'attachment; filename="'.$filename.'"', // force download?
  //       ]);



    	// $this->filterMovie();die;
    	// $this->filterGenre();die;
		$path = storage_path() . "/jsons/demo/data_traning_1000_v4.json";
		$path2 = storage_path() . "/jsons/demo/data_genre_1000_v4.json";
		$data_training = json_decode(file_get_contents($path),true); 
		              
		$labels1 = json_decode(file_get_contents($path2),true);
		echo "num train: ".count($data_training)."<br>";
		echo "num label: ".count($labels1)."<br>";

		// die;

        // $this->checkCorrectData($data_training,$labels1,1000);
        // 

		$classifier = new NaiveBayes();
		$classifier->train($data_training, $labels1);

    	//data test
		$sum_data = 200;
		$data_movie = 
		Movie::orderBy("id","desc")
		->limit($sum_data)
		->where(['cat_id' => 'cat002'])
		->get();
		$new_data = [];
		foreach ($data_movie as $value) {
			$new_data[] = [
				$value->id,
				// create_slug($value->name," "),
				// create_slug($value->short_des," "),
				slugify($value->name,' '),
				slugify($value->short_des,' '),
			];	
		}
		

		
		$predict = $classifier->predict($new_data);
		// echo "<pre>";
		// var_dump($predict);
		// echo "</pre>";
		// die();
		
		
		$per_sum = 0;
		for ($i = 0; $i < count($predict); $i++) {
			$data_genres_predict = $this->getGenres($predict[$i]);
			
			$data_genres_correct = Movie_genre::where("mov_id",$data_movie[$i]->id)
			->select("movie_genre.gen_id","name")
			->join("genre" , "genre.id" , "=" , "movie_genre.gen_id")
			->groupBy("movie_genre.gen_id","name")
			->get();

			$data_genres_predict = $data_genres_predict->toArray();
			$data_genres_correct = $data_genres_correct->toArray();
			$data_genres_predict = array_column($data_genres_predict, "name");
			$data_genres_correct = array_column($data_genres_correct, "name");

			$number_correct = 0;
			$ketqua = "Dự đoán phim ".$data_movie[$i]->name." thuộc thể loại: ";
			$chinhxac = "Chính xác thuộc thể loại: ";
			if(count($data_genres_correct) == 0){
				$number_correct = 1;
			} 

				for ($j = 0; $j < count($data_genres_predict); $j++) {
					
					
					$ketqua.= $data_genres_predict[$j]. ($j == count($data_genres_predict) - 1 ? "" : " - ");
					if(in_array($data_genres_predict[$j], $data_genres_correct)){
						$number_correct++;
					}
				}

				for ($k = 0; $k < count($data_genres_correct); $k++) {
					$chinhxac.= $data_genres_correct[$k]." - ";
				}

			
			echo "Bộ phim thứ ".($i+1)." <br>";
			echo $ketqua."<br>";
			echo $chinhxac."<br>";
			$per = ($number_correct/(count($data_genres_correct) > 0 ? count($data_genres_correct) : 1))*100;
			$per_sum+=$per;
			echo "Độ chính xác : ".($per)."%<br>";

			echo "-------------------------------------------->>>><br>";

		}
		echo "Tổng xác xuất chính xác ".($per_sum/$sum_data)."%<br>";
		die;
    	$this->filterGenre();die;





	}

	private function checkCorrectData($datas,$genres,$num = 20)
	{
		foreach ($datas as $key => $value) {

			if($key >= $num) break;
			$id = $value[0];
			$name = $value[1];

			$movie = Movie::where("id","=","$id")->first();

			$lstGenres = Movie_genre::where("mov_id",$movie->id)
			->select("movie_genre.gen_id","name")
			->join("genre" , "genre.id" , "=" , "movie_genre.gen_id")
			->groupBy("movie_genre.gen_id","name")
			->get();

    		// if($key == 25){
	    	// 		echo "<pre>";
	    	// 		var_dump($lstGenres);
	    	// 		echo "</pre>";
	    	// 		die();

	    	// 	}


			$preGenres = $this->getGenres($genres[$key]);

			$lstGenres = $lstGenres->toArray();
			$preGenres = $preGenres->toArray();


			$data_genres_predict = array_column($preGenres, "name");
			$data_genres_correct = array_column($lstGenres, "name");

    		// if($key == 10){
    		// 	echo "<pre>";
    		// 	var_dump($genres[$key]);
    		// 	echo "</pre>";
    		// 	// die();

    		// }

			$number_correct = 0;
			$ketqua = "Dự đoán phim ".$name." thuộc thể loại: ";
			$chinhxac = "Chính xác thuộc thể loại: ";
			if(count($data_genres_correct) == 0){
				$number_correct = 1;
			} else {
				for ($j = 0; $j < count($data_genres_predict); $j++) {
					$ketqua.= $data_genres_predict[$j]." - ";
					if(in_array($data_genres_predict[$j], $data_genres_correct)){
						$number_correct++;
					}
				}

				for ($k = 0; $k < count($data_genres_correct); $k++) {
					$chinhxac.= $data_genres_correct[$k]." - ";
				}
			}
			echo "Bộ phim thứ ".($key+1)." <br>";
			echo $ketqua."<br>";
			echo $chinhxac."<br>";
			$percent = ($number_correct/(count($data_genres_correct) > 0 ? count($data_genres_correct) : 1)*100);
			echo "Độ chính xác : ".$percent."%<br>";

			echo "-------------------------------------------->>>><br>";

		}
		die;
	}

	private function filterGenre()
	{
		$index_movie = [];

    	// echo count($data_movie);die;

		$data_gen = [];
		$num_current = 0;
		$max = 0;
		while (count($data_gen) < $this->num_train) {
			$data_movie = Movie::select("movie.*","movie_genre.gen_id")
			->skip($num_current)
			->take(500)
			->orderBy("id","desc")
			->where([['movie.cat_id','=','cat002']])
			->leftJoin("movie_genre" , "movie.id" , "=" , "movie_genre.mov_id")
			->get();
			
			if(empty($data_movie))break;
			foreach ($data_movie as $key => $mov) {
				if(!isset($index_movie[$mov->id])){
					$data_gen[$max] = $this->initValueGenFilter();
					$index_movie[$mov->id] = $max;
					$max++;
				}
				$data_gen[$index_movie[$mov->id]][$this->getNum($mov->gen_id)] = 1;
			}
			$num_current+=500;

		}

		$data_gen = array_values($data_gen);
		foreach ($data_gen as $key => $value) {

			$new = '';
			foreach ($value as $k => $v) {    			
				$new.= $v . ($k< count($value) -1 ? "," : "");
			}
			$data_gen[$key] = $new;
		}
		$data_gen = array_slice($data_gen, 0,$this->num_train);


		$fp = fopen(storage_path() . "/jsons/demo/data_genre_1000_v4.json", 'w');
		fwrite($fp, json_encode($data_gen,JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS));
		fclose($fp);
    	// echo count($data_gen);die;

    	// echo json_encode($data_gen);die;
    	// echo json_encode($data_movie,JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS);
	}

	private function filterMovie(){
		$data_movie = Movie::select("*")
		->limit($this->num_train)
		->orderBy("id","desc")
		->where(['cat_id'=> 'cat002'])
		->get();
		$new_data = [];
    	// echo "<pre>";
    	// var_dump($data_movie);
    	// echo "</pre>";
    	// die();

		foreach ($data_movie as $key => $value) {
    		// $new_data[$key][] = $value->id;
			$new_data[$key][] = $value->id;
			// $new_data[$key][] = create_slug($value->name," ");
			// $new_data[$key][] = create_slug($value->short_des," ");
			$new_data[$key][] = slugify(html_entity_decode($value->name),' ');
			$new_data[$key][] = slugify(html_entity_decode($value->short_des),' ');
			
    		// $new_data[$key][] = $value->slug;
			// $short_des = $value->short_des;
    		// var_dump($short_des);
    		// print_r($short_des);
    		// $short_des = preg_replace("/<(\/?)[a-z]+\>/", "", $short_des);
    		// echo "<br>";
    		// echo "<br>";
    		// echo "<br>";
    		// print_r($short_des);die;
    		// $new_data[$key][] = preg_replace("/<(\/?)[a-z]+\>/", "", $value->short_des);
    		// $new_data[$key][] = preg_replace("/<(\/?)[a-z]+\>/", "", $value->long_des);
    		// $new_data[$key][] = $value->runtime;
    		// $new_data[$key][] = $value->release_date;
    		// $new_data[$key][] = $value->epi_num;
    		// $new_data[$key][] = $value->cat_id;
		}
		$new_data =  json_encode($new_data,JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS);
		$fp = fopen(storage_path() . "/jsons/demo/data_traning_1000_v4.json", 'w');
		fwrite($fp, $new_data);
		fclose($fp);

	}


	private function getGenres($string)
	{
    	// var_dump($string);
		$lst_ID = [];
		$arr = explode(",",$string);
		for ($i = 0; $i < count($arr) ; $i++) {
			if($arr[$i] == 1){
    			// echo $i;
				$lst_ID[] = auto_increment_string_id('gen'.($i-1));
    			// echo auto_generate_id('gen006');
			}
		}

		$data = Genre::whereIn("id",$lst_ID)->get();
		return $data;


	}

	private function initValueGenFilter($max = 28)
	{
		$return = [];
		for ($i = 0; $i < $max; $i++) {
			$return[] = 0;
		}
		return $return;
	}

	private function getNum($id)
	{
		$reg = "/gen.([0-9]+)$/";
		$result = [];
		if(preg_match($reg, $id , $result)){

			return (int)$result[1];
		}
		return -1;
	}

	public function get_id_episode_filmfast()
	{
		$path = storage_path() . "/jsons/data_split/phimle15.json"; 
        $data = json_decode(file_get_contents($path),true);

        // $data = array_reverse($data);

        $num = 0;
        foreach ($data['data'] as $key => $value) {
        	if($num > 200) break;
        	if(isset($value['episode_id']) && isset($value['country'])) continue;
        	$url = 'https://fimfast.com/'.$value['slug'];
        	$content = apiCurl($url,'GET');        	
        	
        	if(!is_string($content)) break;
        	$reg = "/data-episode-id=\"([0-9]+)\"/";
        	$reg_country = '/Quốc gia:.*(\r\n|\r|\n).*<a href="\/([a-z-]+)" target="_blank">(.*)<\/a>/';
        	$matches = [];
        	$matches_country = [];
        	if(preg_match($reg, $content , $matches)){
        		$data[$key]['episode_id'] = $matches[1];
        		$num++;
        	};

        	if(preg_match($reg_country, $content , $matches_country)){
        		$data[$key]['country'] = [];
        		$country = [
        			'data' => [
        				'slug' => $matches_country[2],
        				'name' => $matches_country[3],
        			]
        		];
        		$data[$key]['country'] = $country;
        	}
        	sleep(10);
        }


       
        
        $data = array_reverse($data);
        $data = json_encode(array_reverse($data),JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS);
        $fp = fopen(storage_path() . "/jsons/data_split/phimle15.json", 'w');
        fwrite($fp, $data);
        fclose($fp);
        echo json_encode(array_reverse(json_decode($data,true)),JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS); 
	}

	
}
