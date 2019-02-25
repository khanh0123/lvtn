import Api from '../apis/api';

const ACTION_GET_HOT_MOVIES = 'ACTION_GET_HOT_MOVIES';
const ACTION_GET_BANNER_MOVIES = 'ACTION_GET_BANNER_MOVIES';
const ACTION_GET_HOT_SERIES_MOVIES = 'ACTION_GET_HOT_SERIES_MOVIES';
const ACTION_GET_HOT_RETAIL_MOVIES = 'ACTION_GET_HOT_RETAIL_MOVIES';
const ACTION_GET_DETAIL_MOVIE = 'ACTION_GET_DETAIL_MOVIE';

async function get_hot_movies() {
    return {
        type: ACTION_GET_HOT_MOVIES,
        payload: await Api.get_hot_movies()
    };
}
async function get_hot_series_movies() {
    return {
        type: ACTION_GET_HOT_SERIES_MOVIES,
        payload: await Api.get_hot_series_movies()
    };
}
async function get_hot_retail_movies() {
    return {
        type: ACTION_GET_HOT_RETAIL_MOVIES,
        payload: await Api.get_hot_retail_movies()
    };
}
async function get_hot_retail_movies() {
    return {
        type: ACTION_GET_HOT_RETAIL_MOVIES,
        payload: await Api.get_hot_retail_movies()
    };
}
async function get_detail_movie(id,slug) {
    return {
        id:id,
        type: ACTION_GET_DETAIL_MOVIE,
        payload: await Api.get_detail_movie(id,slug)
    };
}

async function get_banner_movies() {
    return {
        type: ACTION_GET_BANNER_MOVIES,
        payload: await Api.get_banner_movies()
    };
}

module.exports =  {
    ACTION_GET_HOT_MOVIES,
    ACTION_GET_HOT_SERIES_MOVIES,
    ACTION_GET_HOT_RETAIL_MOVIES,
    ACTION_GET_DETAIL_MOVIE,
    ACTION_GET_BANNER_MOVIES,
    get_hot_movies,
    get_hot_series_movies,
    get_hot_retail_movies,
    get_detail_movie,
    get_banner_movies
};