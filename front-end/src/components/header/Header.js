import React, { } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import LoginModal from "../popup/LoginModal";
import { UserAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_open_popup_login: false,
            data_user: '',

        };
        this._togglePopupLogin = this._togglePopupLogin.bind(this);
        this._goSearchPage = this._goSearchPage.bind(this);
    }

    componentDidMount() {
        this.props.get_status_login().then((res) => {
            let data = res.payload.data;
            if(data && data.isLogged){
                this.setState({data_user:data.info})
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
                                            <li><a href="javascript:void(0)"><span className="fa fa-lock" />Xin chào {data_user.name}</a></li>
                                            
                                            || 
                                            <li onClick={this._togglePopupLogin}><a href="javascript:void(0)"><span className="fa fa-lock" />Đăng Nhập</a></li>
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
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 header-search-area sm-width col-md-offset-2">
                                <div className="header-search categorie-search-box">
                                    {/* <form action="/tim-kiem" > */}
                                    <input className="form-control" type="text" placeholder="Nhập vào từ khóa" id="search_keyword" />
                                    <button onClick={this._goSearchPage.bind(this)}><span className="fa fa-search" /></button>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu />
                <LoginModal isOpen={is_open_popup_login} onClose={this._togglePopupLogin} />

            </header>
        )
    }
    _goSearchPage() {
        let keyword = document.getElementById("search_keyword");
        if (keyword) {
            keyword = keyword.value;
            this.props.history.push({
                pathname: '/tim-kiem',
                search: "?" + new URLSearchParams({ q: keyword }).toString()
            })
        }


    }
    _togglePopupLogin() {
        this.setState({ is_open_popup_login: !this.state.is_open_popup_login });
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