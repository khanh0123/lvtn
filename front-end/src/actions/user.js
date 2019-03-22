import Api from '../apis/api';

const ACTION_USER_LOGIN = 'ACTION_USER_LOGIN';
const ACTION_USER_GET_STATUS_LOGIN = 'ACTION_USER_GET_STATUS_LOGIN';


async function user_login(token) {
    let res =  await Api.user_login(token);
    return {
        type: ACTION_USER_LOGIN,
        payload:{
            data:res.data
        } 
    };
}
async function user_get_status_login() {
    let res =  await Api.user_get_status_login();
    return {
        type: ACTION_USER_GET_STATUS_LOGIN,
        payload:{
            data:res.data
        } 
    };
}

module.exports =  {
    ACTION_USER_LOGIN,
    ACTION_USER_GET_STATUS_LOGIN,
    user_login,
    user_get_status_login
};