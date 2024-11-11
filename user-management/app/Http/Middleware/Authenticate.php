<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class Authenticate
{
	public function handle($request, Closure $next)
	{
		try {
			// Attempting to authenticate user using JWT
			if (!$user = JWTAuth::parseToken()->authenticate()) {
				return response()->json(['error' => 'User not found'], 404);
			}
		} catch (JWTException $e) {
			return response()->json(['error' => $e->getMessage()], 401);
		}

		return $next($request);
	}
}