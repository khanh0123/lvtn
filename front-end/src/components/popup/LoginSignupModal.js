import React from "react";
import ModalPopup from "./Modal";
import { UserAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cookie from "react-cookies";
import "../../assets/css/loginsignup.css";

class LoginSignupModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login_tab: true,
        };
        this._showTab = this._showTab.bind(this);
    }


    render() {
        let { login_tab } = this.state;
        return (
            <ModalPopup
                isOpen={this.props.isOpen}
                onClose={this.props.onClose}
            >
                <div id="loginsignup" className={!login_tab ? 'right-panel-active' : ''}>
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Tạo tài khoản</h1>
                            <div className="social-container">
                                <a href="#" className="social" onClick={this._onLoginFacebook}><i className="fa fa-facebook-f" /></a>
                                <a href="javascript:void(0)" className="social"><i className="fa fa-google-plus" /></a>
                            </div>
                            <span>hoặc sử dụng email để đăng ký</span>
                            <input type="text" placeholder="Tên hiển thị" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Mật khẩu" />
                            <button>Đăng ký</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Đăng nhập</h1>
                            <div className="social-container">
                                <a href="#" className="social" onClick={this._onLoginFacebook}><i className="fa fa-facebook-f" /></a>
                                <a href="javascript:void(0)" className="social"><i className="fa fa-google-plus" /></a>
                            </div>
                            <span>hoặc sử dụng tài khoản</span>
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Mật khẩu" />
                            <a href="#">Quên mật khẩu?</a>
                            <button >Đăng nhập</button>
                        </form>
                    </div>
                    <div className="overlay-container hidden-xs">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Xin chào bạn</h1>
                                <p>Bạn đã có tài khoản? hãy đăng nhập để xem các bộ phim yêu thích nhé!</p>
                                <button className="ghost" id="signIn" onClick={this._showTab.bind('login')}>Đăng nhập</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Xin chào bạn</h1>
                                <p>Nếu chưa có tài khoản hãy tạo cho mình một tài khoản để bắt đầu khám phá nhé!</p>
                                <button className="ghost" id="signUp" onClick={this._showTab.bind('signup')}>Tạo tài khoản</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalPopup>

        )
    }
    _showTab = (tabname) => {
        let { login_tab } = this.state;
        this.setState({ login_tab: !login_tab });
    }
    _onLoginFacebook = (e) => {
        e.preventDefault();
        
        // window.FB.login(this._responseLoginFacebook, { scope: 'email' })
        window.FB.login((data) => {
            if (data && data.authResponse) {
                let { accessToken } = data.authResponse;
                if (accessToken) {
                    this.props.user_login_fb(accessToken).then( async (res) => {
                        let data = res.payload.data;
                        if (data.access_token) {
                            await cookie.save("access_token", data.access_token, {
                                path: '/',
                                maxAge: 600000,
                            })
                            // this.props.handleLoginSucess ? this.props.handleLoginSucess(data) : '';
                            // this.props.get_status_login();
                            // this.props.onClose();
                            window.location.reload();
                        }
                    });
                }
            }
        }, { scope: 'email' });
    }

}
const mapStateToProps = ({ user_result }) => {
    return Object.assign({}, user_result || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        user_login_fb: UserAction.user_login_fb,
        user_login: UserAction.user_login,
        get_status_login: UserAction.user_get_status_login,

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginSignupModal));