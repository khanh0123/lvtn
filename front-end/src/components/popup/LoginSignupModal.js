import React from "react";
import ModalPopup from "./Modal";
import { UserAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cookie from "react-cookies";
// import withStyles from 'isomorphic-style-loader/withStyles';
// import s from "../../assets/css/loginsignup.css";
import { toast } from 'react-toastify';
import config from "../../config";

class LoginSignupModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login_tab: true,
        };
        this._init_();
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
                            <input type="text" placeholder="Tên hiển thị" ref={inputName => this.inputName = inputName} />
                            <input type="email" placeholder="Email" ref={inputEmailRegister => this.inputEmailRegister = inputEmailRegister} />
                            <input type="password" placeholder="Mật khẩu" ref={inputPasswordRegister => this.inputPasswordRegister = inputPasswordRegister} />
                            <button onClick={this._onRegister.bind(this)}>Đăng ký</button>
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
                            <input ref={inputEmail => this.inputEmail = inputEmail} type="email" placeholder="Email" />
                            <input ref={inputPassword => this.inputPassword = inputPassword} type="password" placeholder="Mật khẩu" />
                            <a href="#">Quên mật khẩu?</a>
                            <button onClick={this._onLoginEmail}>Đăng nhập</button>
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

    _showTab = () => {
        let { login_tab } = this.state;
        this.setState({ login_tab: !login_tab });
    }
    _onRegister = async (e) => {
        e.preventDefault();
        let email = this.inputEmailRegister.value;
        let password = this.inputPasswordRegister.value;
        let name = this.inputName.value;

        if (email && password && name) {
            this.toastId = toast.info(config.msg.is_progressing, { autoClose: false });
            let res = await this.props.user_register(email, password, name);
            if (res.type == "ERROR") {
                return toast.update(this.toastId, { type: toast.TYPE.ERROR, autoClose: 3000, render: res.msg });
            }
            let data = res.payload.data;
            if (data.access_token) {

                toast.update(this.toastId, { type: toast.TYPE.INFO, autoClose: 3000, render: config.msg.login_success });
                this.props.onClose();
                await cookie.save("access_token", data.access_token, {
                    path: '/',
                    maxAge: 600000,
                })
                // this.props.handleLoginSucess ? this.props.handleLoginSucess(data) : '';
                // this.props.get_status_login();

                window.location.reload();
            }


        }

    }
    _onLoginEmail = async (e) => {
        e.preventDefault();

        let email = this.inputEmail.value;
        let password = this.inputPassword.value;
        if (email && password) {

            this.toastId = toast.info(config.msg.is_progressing, { autoClose: false });
            let res = await this.props.user_login(email, password);
            if (res.type == "ERROR") {
                return toast.update(this.toastId, { type: toast.TYPE.ERROR, autoClose: 3000, render: res.msg });
            }
            let data = res.payload.data;
            if (data.access_token) {

                toast.update(this.toastId, { type: toast.TYPE.INFO, autoClose: 3000, render: config.msg.login_success });
                this.props.onClose();
                await cookie.save("access_token", data.access_token, {
                    path: '/',
                    maxAge: 600000,
                })
                // this.props.handleLoginSucess ? this.props.handleLoginSucess(data) : '';
                // this.props.get_status_login();

                window.location.reload();
            }


        } else {
            toast.warn(config.msg.miss_field);
        }


    }
    _onLoginFacebook = async (e) => {
        e.preventDefault();
        window.FB.login(async (data) => {
            if (data && data.authResponse) {
                let { accessToken } = data.authResponse;
                if (accessToken) {
                    this.toastId = toast.info(config.msg.is_progressing, { autoClose: false });
                    this.props.onClose();
                    let res = await this.props.user_login_fb(accessToken);
                    if (res.type == "ERROR") {
                        return toast.update(this.toastId, { type: toast.TYPE.ERROR, autoClose: 3000, render: res.msg });
                    }
                    let data = res.payload.data;
                    if (data.access_token) {
                        toast.update(this.toastId, { type: toast.TYPE.INFO, autoClose: 3000, render: config.msg.login_success });
                        await cookie.save("access_token", data.access_token, {
                            path: '/',
                            maxAge: 60000000,
                        })
                        // this.props.handleLoginSucess ? this.props.handleLoginSucess(data) : '';
                        // this.props.get_status_login();
                        window.location.reload();
                    }

                }
            }
        }, { scope: 'email' });
    }

    _init_ = () => {
        this._showTab = this._showTab.bind(this);
        this._onLoginEmail = this._onLoginEmail.bind(this);
        this.inputEmail = '';
        this.inputEmailRegister = '';
        this.inputPassword = '';
        this.inputPasswordRegister = '';
        this.inputName = '';
        this.toastId = null;
    }

}
const mapStateToProps = ({ user_result }) => {
    return Object.assign({}, user_result || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        user_login_fb: UserAction.user_login_fb,
        user_login: UserAction.user_login,
        user_register: UserAction.user_register,
        get_status_login: UserAction.user_get_status_login,

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginSignupModal));