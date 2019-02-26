import {MovieAction} from '../actions';

export default function (state = {}, action) {
    let result = {...state};
    switch (action.type) {
        case MovieAction.ACTION_GET_HOT_MOVIES:
        case MovieAction.ACTION_GET_HOT_SERIES_MOVIES:
        case MovieAction.ACTION_GET_HOT_RETAIL_MOVIES:
        case MovieAction.ACTION_GET_BANNER_MOVIES:
            result[action.type] = action.payload.data;
            break;
        case MovieAction.ACTION_GET_DETAIL_MOVIE:  
                
            if(!result[action.type])      
                result[action.type] = [];
            result[action.type][action.id] = action.payload.data;            
            break;
        case MovieAction.ACTION_GET_LINKPLAY_MOVIE:
            if(!result[action.type])      
                    result[action.type] = [];
            if(!result[action.type][action.mov_id])
                result[action.type][action.mov_id] = [];
                result[action.type][action.mov_id][action.episode] = action.payload.data;
        default:
            break;
    }

    return result;
}