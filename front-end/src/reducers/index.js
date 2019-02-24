import {combineReducers} from 'redux';
import MenuReducer from './menu';
import MovieReducer from './movie';

const rootReducer = combineReducers({
    menu_results: MenuReducer,
    movie_results: MovieReducer,
    
});

export default rootReducer;