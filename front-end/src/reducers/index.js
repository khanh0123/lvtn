import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import promise from 'redux-promise';


import MenuReducer from './menu';
import MovieReducer from './movie';
import LoadingReducer from './loading';
import CommentReducer from "./comment";
import UserReducer from "./user";

const initializeSession = () => ({
    type: "INITIALIZE_SESSION",
});


// const store = createStoreWithMiddleware(reducers);

const rootReducer = combineReducers({
    menu_results: MenuReducer,
    movie_results: MovieReducer,
    loading_results: LoadingReducer,
    comment_results:CommentReducer,
    user_results:UserReducer,
});
const customStore = applyMiddleware(promise,thunkMiddleware)(createStore,initializeSession)(rootReducer);
const createCustomStore = (initialState = {}) =>  createStore(rootReducer, initialState,applyMiddleware(promise));

module.exports={
    initializeSession,
    customStore,
    createCustomStore

}
