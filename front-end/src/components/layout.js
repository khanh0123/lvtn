import React from 'react';

// import Notifications, { notify } from 'react-notify-toast';

import { LoadingAction, UserAction } from "../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import Header from './header/Header';
import Footer from './footer/Footer';
import Loading from "./others/Loading";
import config from "../config";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false
        }
    }

    componentDidMount() {

        if (!this.props[LoadingAction.ACTION_SET_LOADING]) {
            this.props.set_loading(true);
            this.setState({ is_loading: true });
        }
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.set_loading(true);
            this.setState({ is_loading: true });
            window.scrollTo(0, 0);
        }

        if (nextProps[LoadingAction.ACTION_SET_LOADING] == false) {
            this.setState({ is_loading: false });
        } else if (!this.state.is_loading) {
            this.setState({ is_loading: true });
        }
    }

    render() {

        let { is_loading } = this.state;

        return (
            <div className="App">

                    <Header />
                    {this.props.children}
                    <Footer />
                    <div className="to-top" id="back-top"><i className="fa fa-angle-up"></i></div>
                    {is_loading && <Loading />}
                    <ToastContainer autoClose={config.time.default_toast} position={toast.POSITION.TOP_RIGHT}/>
                    {/* <Notifications options={{ zIndex: 9999999999, top: '50px', animationDuration: 1000 }} /> */}


            </div>
        );
    }
}

function mapStateToProps({ loading_results }) {
    return Object.assign({}, loading_results || {});
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        set_loading: LoadingAction.set_loading,
        get_status_login: UserAction.user_get_status_login,
    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
