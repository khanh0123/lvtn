import {LoadingAction} from '../actions';

export default function (state = {}, action) {
    let result = {...state};
    switch (action.type) {
        case LoadingAction.ACTION_SET_LOADING:            
            result[action.type] = action.payload.data == false ? false : true;
            break;
        default:
            break;
    }

    return result;
}