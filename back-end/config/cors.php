<?php

$domain = ['http://localhost:3000','http://localhost:5000','https://luanvantotnghiep.design'];
return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS
    |--------------------------------------------------------------------------
    |
    | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
    | to accept any value.
    |
    */
   
    // 'supportsCredentials' => false,
    // 'allowedOrigins' => ['*'],
    // 'allowedHeaders' => ['Content-Type', 'X-Requested-With'],
    // 'allowedMethods' => ['GET', 'POST'], // ex: ['GET', 'POST', 'PUT',  'DELETE']
    // 'exposedHeaders' => [],
    // 'contentType' => ['application/json; charset=utf-8'],
    // 'maxAge' => 86400,
    
    // 'Access-Control-Allow-Credentials' => true,
    // 'supportsCredentials' => true,
    // 'Access-Control-Allow-Origin' => $domain,
    // 'allowedHeaders' => ['Content-Type', 'X-Requested-With','Authorization'],
    // 'allowedMethods' => ['GET', 'POST', 'PUT', 'DELETE' , 'OPTIONS'],
    // 'exposedHeaders' => [],
    // 'contentType' => ['application/json; charset=utf-8'],
    // 'maxAge' => 87000,
    'supportsCredentials' => true,
    'allowedOrigins' => $domain,
    'allowedHeaders' => ['*'],
    'allowedMethods' => ['GET', 'POST', 'PUT',  'DELETE'],
    'exposedHeaders' => ['DAV', 'content-length', 'Allow'],
    'maxAge' => 86400,
    'hosts' => [],


];
