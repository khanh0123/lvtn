<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Illuminate\Contracts\Auth\Factory as Auth;
use App\Models\User;

class AuthUser
{
    protected $auth;
    protected $jwt_secret_key;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
        $this->jwt_secret_key = !empty(env('JWT_SECRET')) ? env('JWT_SECRET') : 'gKnoIKZmWLX91ibxLE1fYqp3DTSUx5Z6';
    }

    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');
        
        if(!$token) {
            // Unauthorized response if token not there
            return response()->json([
                'error' => [
                    'message' => 'Access Token is not provided.'
                ]
            ], 401);
        }

        try {
            $credentials = JWT::decode($token, $this->jwt_secret_key, ['HS256']);
        } catch(ExpiredException $e) {
            return response()->json([
                'error' => [
                    'message' => 'Access Token is expired.'
                ]
            ], 401);
        } catch(Exception $e) {
            return response()->json([
                'error' => [
                    'message' => 'Access Token is invalid.',
                ]
            ], 401);
        }

        
        $result = User::where([
            ['id', '=', $credentials->id],
            ['status', '!=', -1],
        ])->first();
                

        if(!empty($result)){
            //get the visitor ip
            $clientIps = $request->getClientIps();
            $visitorIp = end($clientIps);

            $data_encrypt_to_key  = array(//data need to create MD5 key to verify request
                'id'         => $result->id,
                'fb_id'      => $result->fb_id,
                'name'       => $result->name,
                'visitorIp'  => $visitorIp,
                'user_agent' => $request->header('User-Agent'),
            );
            
            if($credentials->key === createMD5Key($data_encrypt_to_key)){
                // put the user in the request class
                $request->authUser = $result;
                return $next($request);
            }
        } 

        return response()->json([
            'error' => [
                'message' => 'Token is invalid or You don\'t have permission to execute this action'
            ]
        ], 401);
    }
}
