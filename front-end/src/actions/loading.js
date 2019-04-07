const ACTION_SET_LOADING = 'ACTION_SET_LOADING';
// const ACTION_UNSET_LOADING = 'ACTION_UNSET_LOADING';

function set_loading(status) {
    if(typeof window !== 'undefined' && typeof document !== 'undefined'){
        if(status){
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            document.querySelector('body').style.overflow = '';
        }
    }
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