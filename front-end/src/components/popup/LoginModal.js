import React from "react";
import ModalPopup from "./Modal";

export default class LoginModal {
    render() {
        return (
            <ModalPopup>
                <div className="login-form">
                    <h2>Crate an account</h2>
                    <form action="#">
                        <a href>Did you have an account yet? <span className="green">Just Login.</span></a>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-4">
                                <div className="form-group">
                                    <label htmlFor="first-name">First Name :</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last-name">Last Name :</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail :</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password :</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="con-password">Conform Password :</label>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-8">
                                <div className="form-group">
                                    <input id="first-name" className="form-control form-mane" required type="text" />
                                </div>
                                <div className="form-group">
                                    <input id="last-name" className="form-control form-mane" required type="text" />
                                </div>
                                <div className="form-group">
                                    <input id="email" className="form-control form-mane" required type="text" />
                                </div>
                                <div className="form-group">
                                    <input id="password" className="form-control form-mane" required type="password" />
                                </div>
                                <div className="form-group">
                                    <input id="con-password" className="form-control form-mane" required type="password" />
                                </div>
                                <div className="buttons">
                                    <a href className="btn btn-buttons">create account</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalPopup>

        )
    }
}