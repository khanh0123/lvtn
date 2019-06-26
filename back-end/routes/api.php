<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware()->get('/user', function (Request $request) {
//     return $request->user();
// });
$router->group(['prefix' => 'v1','middleware' => 'cors' ], function() use($router) {

    $router->get('menu' ,   ['as'   => "Api.MenuController.index", 'uses' => 'Api\MenuController@index']);
    $router->get('movies' , ['as' => "Api.MovieController.index", 'uses' => 'Api\MovieController@index']);
    $router->get('movies/home' , ['as' => "Api.MovieController.home", 'uses' => 'Api\MovieController@home']);

    $router->get('movies/filter/tags' , ['as' => "Api.MovieController.getByTags", 'uses' => 'Api\MovieController@getByTags']);

    $router->get('movies/recommend' , ['as' => "Api.MovieController.recommend", 'uses' => 'Api\MovieController@recommend']);
    $router->get('movie/{id}' , ['as' => "Api.MovieController.detail", 'uses' => 'Api\MovieController@detail']);
    $router->get('movie/{mov_id}/get_comment' , ['as' => "Api.CommentController.index", 'uses' => 'Api\CommentController@index']);
    $router->get('movie/{mov_id}/link/{episode}' , ['as' => "Api.VideoController.detail", 'uses' => 'Api\VideoController@detail']);

    $router->group(['prefix' => 'user'], function() use($router) {
        $router->post('login_fb' , ['as' => "Api.UserController.login_fb", 'uses' => 'Api\UserController@login_fb']);
        $router->post('login' , ['as' => "Api.UserController.login", 'uses' => 'Api\UserController@login']);
        $router->post('register' , ['as' => "Api.UserController.register", 'uses' => 'Api\UserController@register']);
        $router->get('get_login_status' , ['as' => "Api.UserController.get_login_status", 'uses' => 'Api\UserController@get_login_status']);

        $router->group(['middleware' => 'auth.user'], function() use($router) {
            $router->post('rating' , ['as' => "Api.UserController.rating_movie", 'uses' => 'Api\UserController@rating_movie']);
            $router->post('end_time' , ['as' => "Api.UserController.end_time_episode", 'uses' => 'Api\UserController@end_time_episode']);
            $router->post('comment' , ['as' => "Api.CommentController.store", 'uses' => 'Api\CommentController@store']);
        });
    });
    
}); 