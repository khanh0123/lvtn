import {UserAction} from '../actions';

export default function (state = {}, action) {
    let result = {...state};
    switch (action.type) {
        case UserAction.ACTION_USER_LOGIN:
        case UserAction.ACTION_USER_LOGIN_FB:
            result[action.type] = action.payload.data;
            break;
        case UserAction.ACTION_GET_STATUS_LOGIN:            
            result[action.type] = action.payload.data;
            break;
        default:
            break;
    }

    return result;
}