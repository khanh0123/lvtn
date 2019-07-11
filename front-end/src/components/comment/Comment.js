import React from "react";
// import ModalPopup from "./Modal";
import { CommentAction, UserAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { times_ago } from "../helpers";
import LoginSignupModal from "../popup/LoginSignupModal";
import { toast } from 'react-toastify';

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mov_id: this.props.mov_id,
            page: 1,
            last_page: '',
            data: [],
            total: 0,
            limit: 5,
            is_login: false,
            is_openPopupLogin: false,
            display_reply: { 0: true },
        }
        this._inputComment = this._inputComment.bind(this);
        this._getComment = this._getComment.bind(this);
        this._postComment = this._postComment.bind(this);
        this._commentItem = this._commentItem.bind(this);
        this._initBoxReply = this._initBoxReply.bind(this);
        this._replyComment = this._replyComment.bind(this);
        // this.display_reply = { 0: true };
    }

    async componentDidMount() {
        let { mov_id, page } = this.state;

        let login_status = this.props[UserAction.ACTION_GET_STATUS_LOGIN] || undefined;


        if (login_status && login_status.isLogged === true) {
            await this.setState({ is_login: true });
        }
        if (mov_id !== undefined && page) {
            this._getComment(this.props);
        }

    }
    async componentWillReceiveProps(nextProps) {

        if (nextProps.mov_id !== this.state.mov_id) {
            this.setState({ mov_id: nextProps.mov_id }, () => {
                this._getComment(nextProps);
            });
        }
        let login_status = nextProps[UserAction.ACTION_GET_STATUS_LOGIN] || undefined;
        let login_fb = nextProps[UserAction.ACTION_USER_LOGIN_FB] || undefined;
        let login = nextProps[UserAction.ACTION_USER_LOGIN] || undefined;

        if (((login_status && login_status.isLogged === true) || (login_fb || login)) && !this.state.is_login) {
            await this.setState({ is_login: true });
        } else if (this.state.is_login && login_status.isLogged === false) {
            await this.setState({ is_login: false });
        }
    }

    render() {
        let { data, total, is_login, page, last_page, is_openPopupLogin } = this.state;
        // //console.log(this.display_reply);

        return (
            <div className="comment-area">
                <h2 className="title">Bình luận ({total})</h2>
                {is_login &&
                    this._inputComment(0, 0)
                    ||
                    <h4>Chức năng bình luận chỉ dành cho thành viên. <a href="#" aria-label="link" onClick={this._openPopupLogin.bind(this)}>Đăng nhập</a> để bình luận ngay</h4>
                }
                <div className="content-comment">
                    {data.length > 0 ?
                        data.map((cmt) => {
                            return this._commentItem(cmt)
                        })
                        : (

                            is_login && <h5 style={{margin:"1em 0"}}>Hãy là người đầu tiên bình luận về bộ phim này</h5>
                        )
                    }
                    {page < last_page &&
                        <div className="text-center" style={{ margin: '2em' }}>
                            {/* <a href="#" aria-label="link">Xem thêm bình luận</a> */}
                            <button type="button" className="btn btn-primary" onClick={this._getMoreComment.bind(this)}>Tải thêm bình luận</button>
                        </div>
                    }
                </div>


                {is_openPopupLogin &&
                    <LoginSignupModal isOpen={is_openPopupLogin} onClose={this._closePopupLogin.bind(this)} />
                }
            </div>

        )
    }
    _openPopupLogin = async (e) => {
        e.preventDefault();
        await this.setState({ is_openPopupLogin: true });
    }
    _closePopupLogin = async () => {
        await this.setState({ is_openPopupLogin: false });
    }
    _getMoreComment = async () => {
        // await this.setState({page:this.state.page+1});
        await this._getComment(this.props, this.state.page + 1);
    }
    _getComment = async (props, page) => {
        let { mov_id, limit, data } = this.state;
        props.get_comment(mov_id, limit, page).then((res) => {
            let response = res.payload.data;

            let new_data = response.current_page == 1 ? response.data : [...data, ...response.data];
            this._initBoxReply(new_data);
            this.setState({
                data: new_data,
                page: response.current_page,
                total: response.total,
                last_page: response.last_page,
            });
        })
    }
    _postComment = async (reply_id, event) => {

        if (event.key === 'Enter' && event.target.value != '') {
            let { mov_id, data } = this.state;
            let content = event.target.value;
            this.props.post_comment(mov_id, content, reply_id).then(async (res) => {
                if(res.type != 'ERROR'){
                    let response = res.payload.data;
                    if (response.success) {
                        let info = response.info;
                        data = this._addNewCommentToData(data, reply_id, info);
    
                        await this.setState({ data: data, limit: this.state.limit + 1 });
                    }
                }else {
                    return toast.error(res.msg, { autoClose: 10000 });
                }                
                
            })
            event.target.value = '';
        }
    }
    _initBoxReply = async (data) => {
        let { display_reply } = this.state;
        for (let i = 0; i < data.length; i++) {
            display_reply[data[i].id] = false;
        }
        await this.setState({ display_reply: display_reply });

    }
    _replyComment = async (id) => {
        // e.preventDefault();
        // e.stopPropagation();
        let { display_reply } = this.state;
        display_reply[id] = true;
        await this.setState({ display_reply: display_reply })


    }
    _addNewCommentToData = (data, reply_id, item) => {
        if (reply_id == 0) {
            data.unshift(item);
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == reply_id) {
                    data[i].reply.push(item);
                    break;
                }
            }
        }
        return data;
    }

    _inputComment = (reply_id) => {
        let info_user = (this.props[UserAction.ACTION_GET_STATUS_LOGIN] ? this.props[UserAction.ACTION_GET_STATUS_LOGIN].info : (this.props[UserAction.ACTION_USER_LOGIN_FB] ?this.props[UserAction.ACTION_USER_LOGIN_FB].info : (this.props[UserAction.ACTION_USER_LOGIN] ? this.props[UserAction.ACTION_USER_LOGIN].info : '')));
        if(!info_user || info_user == '') return null;
        if (!reply_id) reply_id = 0;
        return (
            <div className="comment-input">
                <div className="comment-img">
                    <span className="avatar-area">
                        <img className="avatar-img" alt={info_user.name} src={info_user.avatar} />
                    </span>
                </div>
                <div className="comment-content">
                    <input name="inputcomment" maxLength="255" type="text" className="form-control" placeholder="Nhập bình luận" onKeyPress={this._postComment.bind(event, reply_id)
                    } />
                    {/* <button className="comment-btn" onClick={this._postComment.bind(reply_id)}><span className="fa fa-reply"></span></button> */}
                </div>
            </div>
        );
    }
    _commentItem = (item) => {
        return (
            <ol className={`comment-list`} key={item.id}>
                <li className="single-comment">
                    <div className="comment-body">
                        <div className="comment-img">
                            <img src={item.avatar} alt={`avatar of ${item.name}`} />
                        </div>
                        <div className="comment-content">
                            <div className="comment-header">
                                <h3 className="comment-title">{item.name}</h3>
                            </div>
                            <p>{item.content}</p>
                            <div className="blog-details-reply-box">
                                <div className="comment-time">{times_ago(item.created_at)}</div>
                                {this.state.is_login &&
                                    <div className="comment-reply">
                                        <b className="reply" onClick={() => this._replyComment(item.id)}>Trả lời</b>
                                    </div>
                                }

                            </div>
                        </div>

                        {item.reply.length > 0 && item.reply.map((sub_cmt) => {
                            return <ol className={`comment-list-reply`} key={sub_cmt.id}>
                                <li className="single-comment">
                                    <div className="comment-body">
                                        <div className="comment-img">
                                            <img src={sub_cmt.avatar} alt={`avatar of ${sub_cmt.name}`} />
                                        </div>
                                        <div className="comment-content">
                                            <div className="comment-header">
                                                <h3 className="comment-title">{sub_cmt.name}</h3>
                                            </div>
                                            <p>{sub_cmt.content}</p>
                                            <div className="blog-details-reply-box">
                                                <div className="comment-time">{times_ago(sub_cmt.created_at)}</div>
                                                {/* <div className="comment-reply">
                                                    <a href="#" aria-label="link" className="reply">Trả lời</a>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        })}
                        {this.state.display_reply[item.id] && this._inputComment(item.id)}

                    </div>
                </li>
            </ol>
        );
    }

}
const mapStateToProps = ({ comment_results, user_results }) => {
    return Object.assign({}, comment_results, user_results || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        get_comment: CommentAction.get_comment,
        post_comment: CommentAction.user_comment,
        get_status_login: UserAction.user_get_status_login,
        // get_status_login:UserAction.user_get_status_login


    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));

