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

// header("Access-Control-Allow-Origin:*");

// $router->get('/' , 'TestController@phimbo');
// $router->get('/' , 'TestController@get_id_episode_filmfast');




// $router->get("getdata" , 'Admin\MovieController@getdata');

$router->group(['prefix' => 'admin'], function() use($router) {
    $router->get('/login', ['as' => "Admin.AdminController.login", 'uses' => 'Admin\AdminController@login']);
    $router->get('/forgotpassword', ['as' => "Admin.AdminController.forgot", 'uses' => 'Admin\AdminController@forgot']);
    $router->post('/forgotpassword', ['as' => "Admin.AdminController.doForgot", 'uses' => 'Admin\AdminController@doForgot']);
    $router->post('/confirmCodeChangePass', ['as' => "Admin.AdminController.confirmCodeChangePass", 'uses' => 'Admin\AdminController@confirmCodeChangePass']);
    $router->post('/login', ['as' => "Admin.AdminController.doLogin", 'uses' => 'Admin\AdminController@doLogin']);
    $router->post('/logout', ['as' => "Admin.AdminController.logout", 'uses' => 'Admin\AdminController@logout']);
    // $router->post('/changepass', ['as' => "Admin.AdminController.changepass", 'uses' => 'Admin\AdminController@changepass']);

    
    $router->group(['middleware' => ['auth.admin']], function() use($router) {
        $router->get('/', [
            'as'   => "Admin.IndexController.index", 
            'uses' => 'Admin\IndexController@index'
        ]);
        $router->post('/changepass', [
            'as'   => "Admin.AdminController.changepass", 
            'uses' => 'Admin\AdminController@changepass'
        ]);


        $router->get('/permission', [
            'as'         => "Admin.PermissionController.index", 
            'uses'       => 'Admin\PermissionController@index' , 
            'middleware' => 'auth.master'
        ]);
        $router->get('admins/lock/{id}', [
            'as'         => "Admin.AdminController.lockuser", 
            'uses'       => 'Admin\AdminController@lockuser', 
            'middleware' => 'auth.master'
        ]);
        $router->get('admins/unlock/{id}', [
            'as'         => "Admin.AdminController.unlockuser", 
            'uses'       => 'Admin\AdminController@unlockuser',
            'middleware' => 'auth.master'
        ]);
        
        // resource_admin($router, 'movie/{mov_id}/episode', 'EpisodeController');
        $router->get('movie/{mov_id}/episode', [
            'as'   => "Admin.EpisodeController._index", 
            'uses' => "Admin\\EpisodeController@_index"
        ]);
        $router->any("movie/{mov_id}/episode/detail/{id}", [
            'as'   => "Admin.EpisodeController._detail", 
            'uses' => "Admin\\EpisodeController@_detail"
        ]);
        $router->any('movie/{mov_id}/episode/add', [
            'as'         => "Admin.EpisodeController.store", 
            'uses'       => "Admin\\EpisodeController@store",
            'middleware' => 'auth.writer',
        ]);

        $router->get('movie/{mov_id}/episode/del/{id}', [
            'as'         => "Admin.EpisodeController._delete", 
            'uses'       => "Admin\\EpisodeController@_delete",
            'middleware' => 'auth.editer.delete'
        ]);
        $router->post('movie/{mov_id}/episode/clone', [
            'as'         => "Admin.EpisodeController.clone", 
            'uses'       => 'Admin\EpisodeController@clone',
            'middleware' => 'auth.writer'
        ]);

        $router->get('movie/{mov_id}/comment', [
            'as'   => "Admin.CommentController._index", 
            'uses' => "Admin\\CommentController@_index"
        ]);
        $router->any("movie/{mov_id}/comment/detail/{id}", [
            'as'   => "Admin.CommentController._detail", 
            'uses' => "Admin\\CommentController@_detail"
        ]);
        $router->any('movie/{mov_id}/comment/add', [
            'as'         => "Admin.CommentController.store", 
            'uses'       => "Admin\\CommentController@store",
            'middleware' => 'auth.writer',
        ]);

        $router->get('movie/{mov_id}/comment/del/{id}', [
            'as'         => "Admin.CommentController._delete", 
            'uses'       => "Admin\\CommentController@_delete",
            'middleware' => 'auth.editer.delete'
        ]);
        $router->get('movie/{mov_id}/comment/recover/{id}', [
            'as'         => "Admin.CommentController.recover", 
            'uses'       => "Admin\\CommentController@recover",
            'middleware' => 'auth.editer.delete'
        ]);

        $router->post('movie/search' , [
            'as'         => "Admin.MovieController.search", 
            'uses'       => 'Admin\MovieController@search'
        ]);
        $router->post('movie/switch' , [
            'as'         => "Admin.MovieController.switch", 
            'uses'       => 'Admin\MovieController@switch'
        ]);
        $router->get('video/refresh' , [
            'as'         => "Admin.VideoController.refresh", 
            'uses'       => 'Admin\VideoController@refresh'
        ]);
        $router->get('users/lock/{id}', [
            'as'         => "Admin.UserController.lockuser", 
            'uses'       => 'Admin\UserController@lockuser',
        ]);
        $router->get('users/lockcomment/{id}', [
            'as'         => "Admin.UserController.lockcomment", 
            'uses'       => 'Admin\UserController@lockcomment',
        ]);
        
        $router->get('users/unlock/{id}', [
            'as'         => "Admin.UserController.unlockuser", 
            'uses'       => 'Admin\UserController@unlockuser',
        ]);
        resource_admin($router, 'admins', 'AdminController' , 'auth.master');
        
        resource_admin($router, 'group', 'AdminGroupController' , 'auth.master');
        resource_admin($router, 'config', 'ConfigController');
        resource_admin($router, 'users', 'UserController' );
        resource_admin($router, 'category', 'CategoryController');
        resource_admin($router, 'genre', 'GenreController');
        resource_admin($router, 'country', 'CountryController');
        resource_admin($router, 'menu', 'MenuController');
        resource_admin($router, 'movie', 'MovieController');
        resource_admin($router, 'video', 'VideoController');

    });
});
function resource_admin(&$router, $uri, $controller , $middleware = null) {

    if(empty($middleware)){
        $router->get($uri, [
            'as'   => "Admin.$controller.index", 
            'uses' => "Admin\\$controller@index"
        ]);
        $router->any("$uri/detail/{id}", [
            'as'   => "Admin.$controller.detail", 
            'uses' => "Admin\\$controller@detail"
        ]);
        $router->any($uri.'/add', [
            'as'         => "Admin.$controller.store", 
            'uses'       => "Admin\\$controller@store",
            'middleware' => 'auth.writer',
        ]);

        $router->get($uri.'/del/{id}', [
            'as'         => "Admin.$controller.delete", 
            'uses'       => "Admin\\$controller@delete",
            'middleware' => 'auth.editer.delete'
        ]);
    } else {
        $router->group(['middleware' => $middleware] , function() use($router,$uri,$controller){

            $router->get($uri, [
                'as'   => "Admin.$controller.index", 
                'uses' => "Admin\\$controller@index"
            ]);
            $router->any("$uri/detail/{id}", [
                'as'   => "Admin.$controller.detail", 
                'uses' => "Admin\\$controller@detail"
            ]);
            $router->any($uri.'/add', [
                'as'   => "Admin.$controller.store", 
                'uses' => "Admin\\$controller@store",
            ]);
            $router->get($uri.'/del/{id}', [
                'as'   => "Admin.$controller.delete", 
                'uses' => "Admin\\$controller@delete",
            ]);

        });
    }
}
