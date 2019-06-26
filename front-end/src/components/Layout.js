import React from 'react';

// import Notifications, { notify } from 'react-notify-toast';

import { LoadingAction, UserAction } from "../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
// import { Route, Switch } from 'react-router-dom';

import Header from './header/Header';
import Footer from './footer/Footer';
import Loading from "./others/Loading";
import config from "../config";
// import { routes } from "../setup/routes";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false
        }
        this.loading = null;
        this._autoClearLoading = this._autoClearLoading.bind(this);
    }

    componentDidMount() {

        if (!this.props[LoadingAction.ACTION_SET_LOADING]) {
            this.props.set_loading(true);
            this.setState({ is_loading: true });
            this._autoClearLoading();
            window.scrollTo(0, 0);
        }
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.set_loading(true);
            this.setState({ is_loading: true });
            this._autoClearLoading();
            window.scrollTo(0, 0);
        }

        if (nextProps[LoadingAction.ACTION_SET_LOADING] == false) {
            this.setState({ is_loading: false });
        } else if (!this.state.is_loading) {
            this.setState({ is_loading: true });
            this._autoClearLoading();
        }
    }

    render() {

        let { is_loading } = this._getDataRender();
        return (
            <div className="App">

                <Header />
                {this.props.children}
                <Footer />                
                {is_loading && <Loading />}
                {/* <ToastContainer autoClose={config.time.default_toast} position={toast.POSITION.TOP_RIGHT} /> */}
                <div className="to-top" id="back-top"><i className="fa fa-angle-up"></i></div>

            </div>
        );
    }
    _getDataRender = () => {
        let { is_loading } = this.state;
        if(!is_loading && this.props[LoadingAction.ACTION_SET_LOADING] != ''){
            is_loading = this.props[LoadingAction.ACTION_SET_LOADING];
        }
        return {is_loading};
    }

    _autoClearLoading = () => {
        if (this.loading != null) {
            return;
        }
        this.loading = setTimeout(() => {
            this.props.set_loading(false);
            this.setState({ is_loading: false });
            this.loading = null;
        }, config.time.clearLoading);
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
