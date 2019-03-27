import {combineReducers} from 'redux';
import MenuReducer from './menu';
import MovieReducer from './movie';
import LoadingReducer from './loading';
import CommentReducer from "./comment";
import UserReducer from "./user";

const rootReducer = combineReducers({
    menu_results: MenuReducer,
    movie_results: MovieReducer,
    loading_results: LoadingReducer,
    comment_results:CommentReducer,
    user_results:UserReducer,
});

export default rootReducer;