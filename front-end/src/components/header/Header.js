import React, { } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import cookie from "react-cookies";
// import LoginModal from "../popup/LoginModal";
import LoginSignupModal from "../popup/LoginSignupModal";
import { UserAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import config from "../../config"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_open_popup_login: false,
            data_user: '',

        };
        this._togglePopupLogin = this._togglePopupLogin.bind(this);
    }

    componentDidMount() {
        this.props.get_status_login().then((res) => {
            let data = res.payload.data;
            if (data && data.isLogged) {
                this.setState({ data_user: data.info })
            }
            if(data && data.version){
                let current_version = cookie.load()
                cookie.save("version", data.version, {
                    path: '/',
                    maxAge: 600000,
                })
            }

        });
    }


    render() {
        let { is_open_popup_login, data_user } = this.state;
        return (
            <header className="header-section">
                <div className="top-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-account sm-width sm-width-33">
                                <div className="top-accounts">
                                    <ul>
                                        {
                                            data_user !== '' &&
                                            <li className="dropdown">
                                                <a href="javascript:void(0)" aria-label="link" className="dropdown-toggle" data-toggle="dropdown"><span className="fa fa-lock" />Xin chào {data_user.name} <i className="fa fa-angle-down"></i></a>
                                                <ul className="dropdown-menu">
                                                    <li><a href="javascript:void(0)" aria-label="link" onClick={this._logout}>Đăng xuất</a></li>
                                                </ul>
                                            </li>

                                            ||
                                            <li onClick={this._togglePopupLogin} ><a href="javascript:void(0)" aria-label="link"><span className="fa fa-lock" />Đăng Nhập</a></li>
                                        }
                                    </ul>
                                </div>

                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-message sm-width sm-width-33 hidden-xs">
                                <div className="top-messages">
                                    <p><span className="fa fa-envelope-o" /> Chào Mừng Bạn Đến Với <strong className="green"> ** Movie Star **</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-visitors hiddens sm-width sm-width-33 hidden-xs">
                                <div className="top-visitor">
                                    <p><span className="fa fa-users" /> Lượt truy cập hôm nay: 32155</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu />
                <LoginSignupModal isOpen={is_open_popup_login} onClose={this._togglePopupLogin} handleLoginSucess={this._handleLoginSucess.bind(this)} />

            </header>
        )
    }
    _logout = () => {        
        cookie.remove(config.constant.cookie_token,{ path: '/' });
        window.location.reload();
    }
    _handleLoginSucess(data) {
        if (data && data.access_token) {
            this.setState({ data_user: data.info })
        }
    }

    _togglePopupLogin(status) {       
        if(status !== true && status !== false){
            status = !this.state.is_open_popup_login;
        }
         
        this.setState({ is_open_popup_login: status });
    }
}

const mapStateToProps = ({ user_result }) => {
    return Object.assign({}, user_result || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        get_status_login: UserAction.user_get_status_login
    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));