<?php

/** @var \Laravel\Lumen\Routing\Router $router */
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
	return $router->app->version();
});

// Temporary route for creating users
/*$router->get('/run-seeder', function () {
	Artisan::call('db:seed', [
		'--class' => 'DatabaseSeeder',
	]);
	return "Database seeded!";
});*/

$router->post('register', 'UserController@register');
$router->post('login', 'UserController@login');

$router->group(['middleware' => 'auth'], function () use ($router) {
	$router->get('users', 'UserController@index');
	$router->post('logout', 'UserController@logout');
});

$router->group(['middleware' => ['auth', 'admin']], function () use ($router) {
	$router->get('users', 'UserController@index');
	$router->post('users', 'UserController@store');
	$router->put('users/{id}', 'UserController@update');
	$router->delete('users/{id}', 'UserController@destroy');
});

$router->options('{any:.*}', function () {
	return response()->json([], 200);
});