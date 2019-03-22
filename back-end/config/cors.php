<?php

$domain = ['http://localhost:3000'];
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

    'supportsCredentials' => true,
    'allowedOrigins' => $domain,
    'allowedHeaders' => ['Content-Type', 'X-Requested-With'],
    'allowedMethods' => ['GET', 'POST', 'PUT', 'DELETE' , 'OPTIONS'],// ex: ['GET', 'POST', 'PUT', 'DELETE']
    'exposedHeaders' => [],
    'contentType' => ['application/json; charset=utf-8'],
    'maxAge' => 87000,


];
