import Api from '../apis/api';

const ACTION_GET_MENU = 'ACTION_GET_MENU';

function get_menu() {
    return {
        type: ACTION_GET_MENU,
        payload: Api.get_menu()
    };
}

module.exports =  {
    ACTION_GET_MENU,
    get_menu
};