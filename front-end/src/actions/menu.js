import Api from '../apis/api';

const ACTION_GET_MENU = 'ACTION_GET_MENU';

function get_menu() {
    return Api.get_menu().then((res) => {
        return {
            type: ACTION_GET_MENU,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.res.data.msg
        };
    });
}

module.exports =  {
    ACTION_GET_MENU,
    get_menu
};