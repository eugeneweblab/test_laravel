<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
	/**
	 * Handle an incoming request.
	 *
	 * @param Request $request
	 * @param Closure $next
	 *
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next): mixed
	{
		$user = Auth::user();

		if ($user && $user->role === 'admin') {
			return $next($request);
		}

		return response()->json(['message' => 'Access denied'], 403);
	}
}