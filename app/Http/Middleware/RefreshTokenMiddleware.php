<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;

class RefreshTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $expiresAt = Carbon::createFromTimeString($request->header('expires_in'));
        if (Carbon::now()->gte($expiresAt)) {
            $refreshToken = $request->header('refresh_token');
            $request->headers->set('Authorization', 'Bearer ' . $refreshToken);
            $response = $next($request);
            $accessToken = $response->json('token');
            $expiresAt = $response->json('expires_in');
            $request->headers->set('Authorization', 'Bearer ' . $accessToken);
            $request->headers->set('expires_in', $expiresAt);
            return $response;
        }
        return $next($request);
    }
}
