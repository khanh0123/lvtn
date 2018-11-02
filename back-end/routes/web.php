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
function resource_admin(&$router, $uri, $controller) {
    $router->get($uri, 'Admin\\'.$controller . '@index');
    // $router->get("admin/$uri". '/detail', $controller . '@detail');
    // $router->get("admin/$uri". '/detail/{id}', $controller . '@detail');
    // $router->get("admin/$uri". '/delete/{id}', $controller . '@delele');
}



$router->group(['prefix' => 'admin'], function() use($router) {
    $router->get('/', 'Admin\IndexController@index');

    resource_admin($router, 'config', 'ConfigController');

});

Route::get('/', function () {
    return view('welcome');
});