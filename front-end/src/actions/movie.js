import Api from '../apis/api';

const ACTION_GET_HOT_MOVIES = 'ACTION_GET_HOT_MOVIES';
const ACTION_GET_HOT_SERIES_MOVIES = 'ACTION_GET_HOT_SERIES_MOVIES';
const ACTION_GET_HOT_RETAIL_MOVIES = 'ACTION_GET_HOT_RETAIL_MOVIES';

function get_hot_movies() {
    return {
        type: ACTION_GET_HOT_MOVIES,
        payload: Api.get_hot_movies()
    };
}
function get_hot_series_movies() {
    return {
        type: ACTION_GET_HOT_SERIES_MOVIES,
        payload: Api.get_hot_series_movies()
    };
}
function get_hot_retail_movies() {
    return {
        type: ACTION_GET_HOT_RETAIL_MOVIES,
        payload: Api.get_hot_retail_movies()
    };
}

module.exports =  {
    ACTION_GET_HOT_MOVIES,
    ACTION_GET_HOT_SERIES_MOVIES,
    ACTION_GET_HOT_RETAIL_MOVIES,
    get_hot_movies,
    get_hot_series_movies,
    get_hot_retail_movies
};