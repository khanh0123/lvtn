import Api from '../apis/api';

const ACTION_GET_COMMENT = 'ACTION_GET_COMMENT';
const ACTION_USER_COMMENT = 'ACTION_USER_COMMENT';

function get_comment(mov_id, limit, page) {

    return Api.get_comment(mov_id, limit, page).then((res) => {
        return {
            type: ACTION_GET_COMMENT,
            payload: {
                data: res.data.info
            }
        };

    }).catch((err) => {
        return {
            type: 'ERROR',
            msg: err.response.data.msg
        };
    });
}

function user_comment(mov_id, content, reply_id) {
    return Api.user_comment(mov_id, content, reply_id).then((res) => {
        return {
            type: ACTION_USER_COMMENT,
            payload: {
                data: res.data
            }
        };

    }).catch((err) => {
        console.log(err);
        
        return {
            type: 'ERROR',
            msg: err.response.data.msg
        };
    });
}

module.exports = {
    ACTION_GET_COMMENT,
    ACTION_USER_COMMENT,
    get_comment,
    user_comment,
};