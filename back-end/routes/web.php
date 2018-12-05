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



// $router->get('/' , function(){ return view('welcome');});



$router->group(['prefix' => 'api/v1'], function() use($router) {

    $router->get('/menu' , 'Api/MenuController@get');

}); 


$router->group(['prefix' => 'admin'], function() use($router) {
    $router->get('/login', 'Admin\AdminController@login');
    $router->post('/login', 'Admin\AdminController@doLogin');
    $router->post('/logout', 'Admin\AdminController@logout');
    $router->post('/changepass', 'Admin\AdminController@changepass');

    
    $router->group(['middleware' => ['auth.admin']], function() use($router) {
        $router->get('/', 'Admin\IndexController@index')->name('Admin.index');
        $router->post('/changepass', 'Admin\AdminController@changepass')->name('Admin.admin.changepass');

        $router->get('/permission', 'Admin\PermissionController@index')->name('Admin.permission.index')->middleware('auth.master');
        $router->get('user/lock/{id}', 'Admin\AdminController@lockuser')->middleware('auth.master');
        $router->get('user/unlock/{id}', 'Admin\AdminController@unlockuser')->middleware('auth.master');
        resource_admin($router, 'user', 'AdminController' , 'auth.master');
        resource_admin($router, 'group', 'AdminGroupController' , 'auth.master');

        resource_admin($router, 'config', 'ConfigController');
        resource_admin($router, 'banner', 'BannerController');
        resource_admin($router, 'category', 'CategoryController');
        resource_admin($router, 'genre', 'GenreController');
        resource_admin($router, 'country', 'CountryController');
        resource_admin($router, 'menu', 'MenuController');
        resource_admin($router, 'movie/{mov_id}/episode', 'EpisodeController');
        $router->post('movie/{mov_id}/episode/clone', 'Admin\EpisodeController@clone')->middleware('auth.writer');
        $router->post('movie/search' , 'Admin\MovieController@search')->middleware('auth.writer');
        resource_admin($router, 'movie', 'MovieController');
    });
});
function resource_admin(&$router, $uri, $controller , $middleware = null) {

    if(empty($middleware)){
        $router->get($uri, 'Admin\\'.$controller . '@index')->name('Admin.'.$uri.'.index');
        $router->get($uri.'/detail/{id}', 'Admin\\'.$controller . '@detail')->name('Admin.'.$uri.'.detail');
        $router->get($uri.'/add', 'Admin\\'.$controller . '@add')->name('Admin.'.$uri.'.add')->middleware('auth.writer');
        $router->post($uri.'/add', 'Admin\\'.$controller . '@store')->middleware('auth.writer');

        $router->post($uri.'/detail/{id}', 'Admin\\'.$controller . '@update')->middleware('auth.editer');

        $router->get($uri.'/del/{id}', 'Admin\\'.$controller . '@delete')->middleware('auth.editer.delete');
    } else {
        $router->group(['middleware' => $middleware] , function() use($router,$uri,$controller){

            $router->get($uri, 'Admin\\'.$controller . '@index')->name('Admin.'.$uri.'.index');
            $router->get($uri.'/detail/{id}', 'Admin\\'.$controller . '@detail')->name('Admin.'.$uri.'.detail');
            $router->get($uri.'/add', 'Admin\\'.$controller . '@add')->name('Admin.'.$uri.'.add');
            $router->post($uri.'/add', 'Admin\\'.$controller . '@store');
            $router->post($uri.'/detail/{id}', 'Admin\\'.$controller . '@update');
            $router->get($uri.'/del/{id}', 'Admin\\'.$controller . '@delete');

        });
    }  
}
