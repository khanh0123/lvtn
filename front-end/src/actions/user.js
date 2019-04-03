import Api from '../apis/api';

const ACTION_USER_LOGIN = 'ACTION_USER_LOGIN';
const ACTION_USER_LOGIN_FB = 'ACTION_USER_LOGIN_FB';
const ACTION_USER_REGISTER = 'ACTION_USER_REGISTER';
const ACTION_GET_STATUS_LOGIN = 'ACTION_GET_STATUS_LOGIN';
const ACTION_USER_END_TIME_EPISODE = 'ACTION_USER_END_TIME_EPISODE';

function user_login(email, password) {
    return Api.user_login(email, password).then((res) => {
        return {
            type: ACTION_USER_LOGIN,
            payload: {
                data: res.data
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response.data.msg
        };
    });
}

function user_login_fb(token) {
    return Api.user_login_fb(token).then((res) => {
        return {
            type: ACTION_USER_LOGIN_FB,
            payload: {
                data: res.data
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response.data.msg
        };
    });
}

function user_register(email, password, name) {
    return Api.user_register(email, password, name).then((res) => {
        return {
            type: ACTION_USER_REGISTER,
            payload: {
                data: res.data
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response.data.msg
        };
    });
}

function user_get_status_login() {
    return Api.user_get_status_login().then((res) => {
        return {
            type: ACTION_GET_STATUS_LOGIN,
            payload: {
                data: res.data
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response.data.msg
        };
    });
}

function user_end_time_episode(episode_id, time_current) {
    return Api.user_end_time_episode(episode_id, time_current).then((res) => {
        return {
            type: ACTION_USER_END_TIME_EPISODE,
            payload: {
                data: res.data
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response.data.msg
        };
    });
}

module.exports = {
    ACTION_USER_LOGIN,
    ACTION_USER_LOGIN_FB,
    ACTION_GET_STATUS_LOGIN,
    ACTION_USER_END_TIME_EPISODE,
    ACTION_USER_REGISTER,
    user_login,
    user_login_fb,
    user_register,
    user_get_status_login,
    user_end_time_episode,

};