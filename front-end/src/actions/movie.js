import Api from '../apis/api';

const ACTION_GET_HOT_MOVIES = 'ACTION_GET_HOT_MOVIES';
const ACTION_GET_BANNER_MOVIES = 'ACTION_GET_BANNER_MOVIES';
const ACTION_GET_HOT_SERIES_MOVIES = 'ACTION_GET_HOT_SERIES_MOVIES';
const ACTION_GET_HOT_RETAIL_MOVIES = 'ACTION_GET_HOT_RETAIL_MOVIES';
const ACTION_GET_DETAIL_MOVIE = 'ACTION_GET_DETAIL_MOVIE';
const ACTION_GET_LINKPLAY_MOVIE = 'ACTION_GET_LINKPLAY_MOVIE';
const ACTION_GET_MOVIE_FILTER = 'ACTION_GET_MOVIE_FILTER';

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
async function get_linkplay_movie(mov_id,episode) {
    return {
        mov_id:mov_id,
        episode:episode,
        type: ACTION_GET_LINKPLAY_MOVIE,
        payload: await Api.get_linkplay_movie(mov_id,episode)
    };
}
async function get_movie_filter(tags,limit,page) {
    return {
        type: ACTION_GET_MOVIE_FILTER,
        payload: await Api.get_movie_filter(tags,limit,page)
    };
}

module.exports =  {
    ACTION_GET_HOT_MOVIES,
    ACTION_GET_HOT_SERIES_MOVIES,
    ACTION_GET_HOT_RETAIL_MOVIES,
    ACTION_GET_DETAIL_MOVIE,
    ACTION_GET_BANNER_MOVIES,
    ACTION_GET_LINKPLAY_MOVIE,
    ACTION_GET_MOVIE_FILTER,
    get_hot_movies,
    get_hot_series_movies,
    get_hot_retail_movies,
    get_detail_movie,
    get_banner_movies,
    get_linkplay_movie,
    get_movie_filter
};