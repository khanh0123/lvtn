import React, { } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import LoginModal from "../popup/LoginModal";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_open_popup_login: false
        };
        this._togglePopupLogin = this._togglePopupLogin.bind(this);
    }

    _togglePopupLogin() {
        this.setState({ is_open_popup_login: !this.state.is_open_popup_login });
    }

    render() {
        let { is_open_popup_login } = this.state;
        return (
            <header className="header-section">
                <div className="top-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-account sm-width sm-width-33">
                                <div className="top-accounts">
                                    <ul>
                                        <li onClick={this._togglePopupLogin}><a href="javascript:void(0)"><span className="fa fa-lock" />Đăng Nhập</a></li>
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
                <div className="header-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 header-logos sm-width">
                                <div className="header-logo">
                                    <Link to="/">
                                        <img src='/assets/images/logo.png' alt="logo" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 header-search-area sm-width">
                                <div className="header-search categorie-search-box">
                                    <form action="#">
                                        <div className="form-group">
                                            <select className="selectpicker" name="poscats" data-dropup-auto="true">
                                                <option value={0}>Theo Tên</option>
                                                <option value={2}>Theo tác giả</option>
                                                <option value={3}>Theo diễn viên</option>
                                            </select>
                                        </div>
                                        <input className="form-control" type="text" placeholder="Nhập vào từ khóa" />
                                        <button><span className="fa fa-search" /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu />
                <LoginModal isOpen={is_open_popup_login} onClose={this._togglePopupLogin}/>

            </header>
        )
    }
}

export default Header;