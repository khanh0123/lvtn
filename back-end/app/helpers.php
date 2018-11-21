<?php

if (!function_exists('apiCurl')) {

    /**
     * Global helpers api curl
     *
     * @param string $full_url
     * @param string $method
     * @param array $params
     * @param string $type
     *
     * @return mixed
     */
    function apiCurl($url, $method = "GET", array $params = array(), $type = 'array')
    {

        $full_url = env('API_DOMAIN') . $url;

//        dd($full_url);
        $data_string = '';
        if (!empty($params) && $type === 'json') {
            if ($method == "GET") {
                $data_string = '';

                foreach ($params as $key => $value) {
                    $data_string .= '&' . $key . '=' . $value;
                }
                $data_string = substr($data_string, 1);
                $full_url = $full_url . "?" . $data_string;
            } else {
                $data_string = json_encode($params);
            }
        } else {
            $data_string = '';

            foreach ($params as $key => $value) {
                $data_string .= '&' . $key . '=' . $value;
            }
            $data_string = substr($data_string, 1);
        }


        $ch = curl_init();

        //set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $full_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        curl_setopt($ch, CURLOPT_USERAGENT, get_server_var('HTTP_USER_AGENT'));

        if (!empty($params) && ($method == "POST" || $method == "PUT" || $method == "DELETE")) {
            curl_setopt($ch, CURLOPT_POST, count($params));
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        }
        if ($type === 'array') {
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'X-Requested-With: XMLHttpRequest',
                    'X-Forwarded-For: ' . getRealUserIp(),
                )
            );
        }

        //execute post
        $result = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($errno = curl_errno($ch)) {
            $dataResult['http_code'] = 500;
            $dataResult['message'] = $errno;
            return array('http_code' => 500, 'message' => '');
        }

        if ($httpcode !== 200) {
            $result = json_decode($result, true);
            $dataResult['http_code'] = $httpcode;
            $dataResult['message'] = !empty($result['message']) ? $result['message'] : '';
            return $dataResult;
        }

        //close connection
        curl_close($ch);
        return json_decode($result, true);
    }

}

if (!function_exists('get_server_var')) {

    function get_server_var($key)
    {
        return !empty($_SERVER[$key]) ? $_SERVER[$key] : null;
    }

}

if (!function_exists('getRealUserIp')) {

    /**
     * Global helpers get user ip address
     *
     * @return string
     */
    function getRealUserIp()
    {
        switch (true) {
            case (!empty($_SERVER['HTTP_X_REAL_IP'])) :
                return $_SERVER['HTTP_X_REAL_IP'];
            case (!empty($_SERVER['HTTP_CLIENT_IP'])) :
                return $_SERVER['HTTP_CLIENT_IP'];
            case (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) :
                return $_SERVER['HTTP_X_FORWARDED_FOR'];
            default :
                return $_SERVER['REMOTE_ADDR'];
        }
    }

}

if (!function_exists('getUriFromUrl')) {

    /**
     * Global helpers get uri after admin/
     * example : admin/config/... => config
     * @return string if matched else @return false
     */
    function getUriFromUrl($url)
    {
        $reg = '/\/(admin)\/([a-zA-Z]+)(\S+)?/';
        $matches = array();
        $check = preg_match($reg,$url,$matches);
        if($check){
            return $matches[2];
        }
        return false;
        
    }

}

if (!function_exists('base_url')) {
    /**
     * Global helpers get full_url with uri
     * 
     * @return string
     */
    function base_url($uri = ''){
        return url($uri);        
    }
}

if (!function_exists('customDate')) {
    /**
     * Global helpers format output of timestamp
     * 
     * @return Datetime
     */
    function customDate($time = '' , $format = 'normal'){

        switch ($format) {
            case 'normal':
                $format = "d/m/y";
                break;
            case 'daytime':
                $format = "d/m/y - h:i";
                break;
            default:
                break;
        }
        if(is_numeric($time))
            return Date($format , $time);
        else if(is_string($time)){
            return Date($format , strtotime($time));
        }
        return Date($format,time());
    }
}

if (!function_exists('create_slug')) {
    /**
     * Global helpers create slug from string
     * 
     * @return string
     */
    function create_slug($str) {
        $str = trim(mb_strtolower($str));
        $str = preg_replace('/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/', 'a', $str);
        $str = preg_replace('/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/', 'e', $str);
        $str = preg_replace('/(ì|í|ị|ỉ|ĩ)/', 'i', $str);
        $str = preg_replace('/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/', 'o', $str);
        $str = preg_replace('/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/', 'u', $str);
        $str = preg_replace('/(ỳ|ý|ỵ|ỷ|ỹ)/', 'y', $str);
        $str = preg_replace('/(đ)/', 'd', $str);
        $str = preg_replace('/[^a-z0-9-\s]/', '', $str);
        $str = preg_replace('/([\s]+)/', '-', $str);
        $str = trim($str,'-');
        return $str;
    }
}


if (!function_exists('time_in_ms')) {
    /**
     * Global helpers get timestamp in milisecond
     * 
     * @return double
     */
    function time_in_ms(){
        return round(microtime(true) * 1000);
    }
}

if (!function_exists('get_table_name')) {
    /**
     * Global helpers get table name from id
     * 
     * @return string
     */
    function get_table_name($id){
        
        $reg = "/^([a-zA-Z]+)([0-9]+)/";
        $array_table = ['genre','country','category'];
        $matches = [];
        $check = preg_match($reg, $id , $matches);
        if($check){
            foreach ($array_table as $value) {
                die;
                if(substr($value, 0, 3) == $matches[1]){
                    return $value;
                }
            }
        }
        return null;
        
    }
}

if (!function_exists('generate_id')) {
    /**
     * Global helpers auto create id
     * 
     * @return string
     */
    function generate_id($table_name = ''){
        $id = substr($table_name, 0, 3).time().uniqid();
        return $id;
        
    }
}
if (!function_exists('generateRandomString')) {
    function generateRandomString($length = 10) {
        return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
    }
}
if (!function_exists('encode_password')) {
    /**
     * Global helpers auto create id
     * 
     * @return string
     */
    function encode_password($password){
        return hash("sha256", md5($password));
    }
}
if (!function_exists('auto_generate_id')) {
    /**
     * Global helpers create id auto increment from string
     * 
     * @return string
     */
    function auto_generate_id($string = 'cat000001',$max_size = 6){
        $reg_find = '/(^[a-zA-Z]+)([0]+)?([0-9]+)/';
        $reg_replace = '/([0-9]+)/';
        $matches = array();
        $check = preg_match($reg_find,$string,$matches);
        if($check){
            $num = (int)$matches[3];
            $num++;
            $num = (string)$num;
            
            while (strlen($num) < $max_size) {
                $num = '0' . $num;
            }
            $new_id = preg_replace($reg_replace, $num , $string);            
            return $new_id;
        }
        return false;
    }
}



