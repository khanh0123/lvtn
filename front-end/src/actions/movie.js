import Api from '../apis/api';

const ACTION_GET_HOT_MOVIES = 'ACTION_GET_HOT_MOVIES';
const ACTION_GET_BANNER_MOVIES = 'ACTION_GET_BANNER_MOVIES';
const ACTION_GET_HOT_SERIES_MOVIES = 'ACTION_GET_HOT_SERIES_MOVIES';
const ACTION_GET_HOT_RETAIL_MOVIES = 'ACTION_GET_HOT_RETAIL_MOVIES';
const ACTION_GET_RECOMMEND_MOVIES = 'ACTION_GET_RECOMMEND_MOVIES';
const ACTION_GET_DETAIL_MOVIE = 'ACTION_GET_DETAIL_MOVIE';
const ACTION_GET_LINKPLAY_MOVIE = 'ACTION_GET_LINKPLAY_MOVIE';
const ACTION_GET_MOVIE_FILTER = 'ACTION_GET_MOVIE_FILTER';
const ACTION_GET_MOVIE_SEARCH = 'ACTION_GET_MOVIE_SEARCH';



function get_hot_movies() {
    return Api.get_hot_movies().then((res) => {
        
        return {
            type: ACTION_GET_HOT_MOVIES,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {        
        return {
            type: 'ERROR',
            msg: err.response ? (err.response.data ? (err.response.data.msg ? err.response.data.msg : '') : 'SERVER ERROR') : 'SERVER ERROR'
        };
    });
}
function get_hot_series_movies() {
    return Api.get_hot_series_movies().then((res) => {
        return {
            type: ACTION_GET_HOT_SERIES_MOVIES,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response ? (err.response.data ? (err.response.data.msg ? err.response.data.msg : '') : 'SERVER ERROR') : 'SERVER ERROR'
        };
    });
}

function get_hot_retail_movies() {
    return Api.get_hot_retail_movies().then((res) => {
        return {
            type: ACTION_GET_HOT_RETAIL_MOVIES,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response ? (err.response.data ? (err.response.data.msg ? err.response.data.msg : '') : 'SERVER ERROR') : 'SERVER ERROR'
        };
    });
}
function get_detail_movie(id,slug) {
    return Api.get_detail_movie(id,slug).then((res) => {
        return {
            mov_id:id,
            type: ACTION_GET_DETAIL_MOVIE,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response ? (err.response.data ? (err.response.data.msg ? err.response.data.msg : '') : 'SERVER ERROR') : 'SERVER ERROR'
        };
    });
}

function get_banner_movies() {
    return Api.get_banner_movies().then((res) => {
        return {
            type: ACTION_GET_BANNER_MOVIES,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response ? (err.response.data ? (err.response.data.msg ? err.response.data.msg : '') : 'SERVER ERROR') : 'SERVER ERROR'
        };
    });
}
function get_linkplay_movie(mov_id,episode) {
    return Api.get_linkplay_movie(mov_id,episode).then((res) => {
        return {
            mov_id:mov_id,
            episode:episode,
            type: ACTION_GET_LINKPLAY_MOVIE,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response ? (err.response.data ? (err.response.data.msg ? err.response.data.msg : '') : 'SERVER ERROR') : 'SERVER ERROR'
        };
    });
}
function get_movie_filter(tags,limit,page) {
    return Api.get_movie_filter(tags,limit,page).then((res) => {
        return {            
            type: ACTION_GET_MOVIE_FILTER,
            payload: {
                data: res.data
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response ? (err.response.data ? (err.response.data.msg ? err.response.data.msg : '') : 'SERVER ERROR') : 'SERVER ERROR'
        };
    });
}
function get_movie_search(q,p) {
    return Api.get_movie_search(q,p).then((res) => {        
        return {            
            type: ACTION_GET_MOVIE_SEARCH,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response ? (err.response.data ? (err.response.data.msg ? err.response.data.msg : '') : 'SERVER ERROR') : 'SERVER ERROR'
        };
    });
}

function get_recommend_movies() {
    return Api.get_recommend_movies().then((res) => {        
        return {            
            type: ACTION_GET_RECOMMEND_MOVIES,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response ? (err.response.data ? (err.response.data.msg ? err.response.data.msg : '') : 'SERVER ERROR') : 'SERVER ERROR'
        };
    });
}

module.exports =  {
    ACTION_GET_HOT_MOVIES,
    ACTION_GET_HOT_SERIES_MOVIES,
    ACTION_GET_HOT_RETAIL_MOVIES,
    ACTION_GET_RECOMMEND_MOVIES,
    ACTION_GET_DETAIL_MOVIE,
    ACTION_GET_BANNER_MOVIES,
    ACTION_GET_LINKPLAY_MOVIE,
    ACTION_GET_MOVIE_FILTER,
    ACTION_GET_MOVIE_SEARCH,
    get_hot_movies,
    get_hot_series_movies,
    get_hot_retail_movies,
    get_recommend_movies,
    get_detail_movie,
    get_banner_movies,
    get_linkplay_movie,
    get_movie_filter,
    get_movie_search
};