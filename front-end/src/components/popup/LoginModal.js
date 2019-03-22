import React from "react";
import ModalPopup from "./Modal";
import { UserAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FacebookProvider, LoginButton } from 'react-facebook';
import cookie from "react-cookies";

class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this._responseLoginFacebook = this._responseLoginFacebook.bind(this);
    }

    _responseLoginFacebook = (data) => {
        if (data && data.authResponse) {
            let { accessToken } = data.authResponse;
            if (accessToken) {
                this.props.user_login(accessToken).then((res) => {
                    let data = res.payload.data;
                    
                    if(data.access_token){
                        cookie.save("access_token", data.access_token, { path: '/' })
                        this.props.onClose();
                    }
                });
                // let info = await data;
                // if (data.info) {
                //     console.log("set cookie");
                //     cookie.save("access_token", data.access_token, { path: '/' })
                // }
            }


        }
    }

    onLoginFacebook = () => {
        window.FB.login(this._responseLoginFacebook, { scope: 'email' })
    }
    render() {

        return (
            <ModalPopup
                isOpen={this.props.isOpen}
                onClose={this.props.onClose}
            >
                <div className="login-form">
                    <h2>Đăng nhập để xem những bộ phim yêu thích</h2>
                    <form action="#">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-4">
                                <div className="form-group">
                                    <label htmlFor="email_login">E-mail :</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password_login">Mật khẩu :</label>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-8">
                                <div className="form-group">
                                    <input id="email_login" className="form-control form-mane" type="text" />
                                </div>
                                <div className="form-group">
                                    <input id="password_login" className="form-control form-mane" required type="password" />
                                </div>
                                <div className="buttons">
                                    <a className="btn btn-buttons">Đăng nhập</a>
                                </div>

                                <div style={{ color: 'white' }}>
                                    Hoặc đăng nhập bằng <i style={{ cursor: "pointer" }} className="fa fa-facebook-square fa-3x" onClick={this.onLoginFacebook}></i>
                                </div>
                                <div className="forgat-pass">
                                    <div className="remember-me">
                                        <input type="checkbox" id="remember" className="checkbox" />
                                        <label htmlFor="remember">Ghi nhớ</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </ModalPopup>

        )
    }

}
const mapStateToProps = ({ user_result }) => {
    return Object.assign({}, user_result || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        user_login: UserAction.user_login

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginModal));