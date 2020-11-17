<?php

namespace App\Http\Middleware;

use Closure;

class VerifyLogin
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
        if ($request->path() == 'admin/login') {
            if (session('LOG') == 'IN') {
                return redirect('admin');
            }
        } else {
            if (session('LOG') != 'IN') {
                return redirect('admin/login');
            }
        }
        return $next($request);
    }
}
