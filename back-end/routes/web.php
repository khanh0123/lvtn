<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
function resource(&$router, $uri, $controller) {
    $router->get($uri, $controller . '@index');
    $router->get($uri. '/detail', $controller . '@detail');
    $router->get($uri. '/detail/{id}', $controller . '@detail');
    $router->get($uri. '/del/{id}', $controller . '@delele');
}
Route::get('/', function () {
    return view('welcome');
});


$router->group(['prefix' => 'admin'], function() use($router) {
    $router->get('/', 'Admin\IndexController@index');

    // resource($router, 'admins', 'Admin');

});