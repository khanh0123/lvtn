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
    function base_url($uri = ''){
        return url($uri);        
    }
}

if (!function_exists('date')) {
    function date($timestamp = ''){
        
        return Date("d/m/y - h:i");
    }
}

if (!function_exists('create_slug')) {

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

