import {MovieAction} from '../actions';

export default function (state = {}, action) {
    let result = {...state};
    switch (action.type) {
        case MovieAction.ACTION_GET_HOT_MOVIES:
        case MovieAction.ACTION_GET_HOT_SERIES_MOVIES:
        case MovieAction.ACTION_GET_HOT_RETAIL_MOVIES:
            result[action.type] = action.payload.data;
            break;
        default:
            break;
    }

    return result;
}