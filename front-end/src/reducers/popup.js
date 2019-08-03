import {PopupAction} from '../actions';

export default function (state = {}, action) {
    let result = {...state};
    switch (action.type) {
        case PopupAction.ACTION_OPEN_POPUP_LOGIN:
            result[action.type] = action.payload.data;
            break;
        default:
            break;
    }

    return result;
}