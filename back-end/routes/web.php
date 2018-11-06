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
    $router->get($uri, 'Admin\\'.$controller . '@index')->name('Admin.'.$uri.'.index');
    $router->get($uri.'/detail/{id}', 'Admin\\'.$controller . '@detail')->name('Admin.'.$uri.'.detail');
    $router->post($uri.'/detail/{id}', 'Admin\\'.$controller . '@update');
    $router->get($uri.'/del/{id}', 'Admin\\'.$controller . '@delete');
    $router->get($uri.'/add', 'Admin\\'.$controller . '@add')->name('Admin.'.$uri.'.add');
    $router->post($uri.'/add', 'Admin\\'.$controller . '@store');
    // $router->get("admin/$uri". '/delete/{id}', $controller . '@delele');
}



$router->group(['prefix' => 'admin'], function() use($router) {
    $router->get('/', 'Admin\IndexController@index');

    resource_admin($router, 'config', 'ConfigController');
    resource_admin($router, 'category', 'CategoryController');
    resource_admin($router, 'genre', 'GenreController');
    resource_admin($router, 'country', 'CountryController');
    resource_admin($router, 'rule', 'RuleController');
    resource_admin($router, 'menu', 'MenuController');

});

Route::get('/', function () {
    return view('welcome');
});