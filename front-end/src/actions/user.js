import Api from '../apis/api';

const ACTION_USER_LOGIN = 'ACTION_USER_LOGIN';

function user_login(token) {
    return {
        type: ACTION_USER_LOGIN,
        payload: Api.user_login(token)
    };
}

module.exports =  {
    ACTION_USER_LOGIN,
    user_login
};