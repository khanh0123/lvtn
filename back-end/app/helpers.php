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

if (!function_exists('getStatus')) {

    function getStatus($stt)
    {
        switch ($stt) {
            case 1:
                return 'Hiển thị';
                break;
            case 2:
                return 'Ẩn';
                break;
            default:
                return 'Xóa';
                break;
        }
    }

}

if (!function_exists('base_url')) {
    function base_url($uri = ''){
        $url = url($uri);
        return $url;
    }
}

if (!function_exists('date')) {
    function base_url($timestamp = ''){
        
        return Date("d/m/y - h:i");
    }
}

