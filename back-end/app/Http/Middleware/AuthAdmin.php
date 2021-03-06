<?php

namespace App\Http\Middleware;

use Closure;

class AuthAdmin
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

        if (!session()->has('user') || !session()->has('permission') || !session()->get('permission')->canRead) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            }
            $path = $request->path();
            return redirect('/admin/login?rel='.$path);
        }

        $request->authUser = session()->get('user');
        return $next($request);
    }
}
