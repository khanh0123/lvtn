import {combineReducers} from 'redux';
import MenuReducer from './menu';
import MovieReducer from './movie';
import LoadingReducer from './loading';

const rootReducer = combineReducers({
    menu_results: MenuReducer,
    movie_results: MovieReducer,
    loading_results: LoadingReducer,

    
});

export default rootReducer;