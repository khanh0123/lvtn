const ACTION_OPEN_POPUP_LOGIN = 'ACTION_OPEN_POPUP_LOGIN';

async function open_popup_login(status) {
    return {
        type: ACTION_OPEN_POPUP_LOGIN,
        payload: {
            data:status
        }
    };
}

module.exports =  {
    ACTION_OPEN_POPUP_LOGIN,
    open_popup_login,
};