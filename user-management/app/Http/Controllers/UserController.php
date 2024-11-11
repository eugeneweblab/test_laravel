<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
	public function register(Request $request): \Illuminate\Http\JsonResponse
	{
		$validator = Validator::make($request->all(), [
			'name' => 'required|string|max:255',
			'email' => 'required|email|unique:users',
			'password' => 'required|min:6',
			'role' => 'required|in:regular,admin',
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors(), 422);
		}

		$user = User::create([
			'name' => $request->input('name'),
			'email' => $request->input('email'),
			'password' => Hash::make($request->input('password')),
			'role' => $request->input('role'),
		]);

		return response()->json($user, 201);
	}


	public function login(Request $request): \Illuminate\Http\JsonResponse
	{
		$credentials = $request->only('email', 'password');

		if (!$token = JWTAuth::attempt($credentials)) {
			return response()->json(['error' => 'Unauthorized'], 401);
		}

		return response()->json(compact('token'));
	}


	public function logout(Request $request)
	{
		try {
			JWTAuth::invalidate(JWTAuth::getToken());
			return response()->json(['message' => 'Successfully logged out'], 200);
		} catch (\Exception $e) {
			return response()->json(['error' => 'Failed to logout, please try again'], 500);
		}
	}


	public function index(Request $request)
	{
		$perPage = $request->get('per_page', 2);

		return User::paginate($perPage);
	}


	public function update(Request $request, $id): \Illuminate\Http\JsonResponse
	{
		$user = User::findOrFail($id);

		$user->update($request->only(['name', 'email', 'role']));

		return response()->json($user);
	}


	public function destroy($id): \Illuminate\Http\JsonResponse
	{
		$user = User::findOrFail($id);
		$user->delete();

		return response()->json(['message' => 'User deleted successfully']);
	}
}