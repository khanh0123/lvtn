<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // header("Access-Control-Allow-Origin: $domain");
        // // header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin');
        // header('Access-Control-Allow-Headers:  *');
        // header('Access-Control-Allow-Methods:  GET, POST, PUT, DELETE, OPTIONS');
        // header('Content-Type: application/json');
        return $next($request);
        // ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        // ->header('Access-Control-Allow-Headers:  Content-Type, Authorization, Origin')
        // ->header('Content-Type', 'application/json')
        // ->header('Access-Control-Allow-Credentials' , true)
        // ->header('supportsCredentials' , true)
        // ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    }
}
