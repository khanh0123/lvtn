const ACTION_SET_LOADING = 'ACTION_SET_LOADING';
// const ACTION_UNSET_LOADING = 'ACTION_UNSET_LOADING';

function set_loading(status) {
    return {
        type: ACTION_SET_LOADING,
        payload:{
            data:status
        }
    };
}
// function unset_loading() {
//     return {
//         type: ACTION_GET_MENU,
//     };
// }

module.exports =  {
    ACTION_SET_LOADING,
    // ACTION_UNSET_LOADING,
    set_loading,
    // unset_loading,
};