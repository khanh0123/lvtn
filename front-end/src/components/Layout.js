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
        super(props)
        
        this.state = {
            is_loading: false
        }
        this.loading = null;
        this._autoClearLoading = this._autoClearLoading.bind(this);
        this.childDiv = React.createRef()
    }

    componentDidMount = () => this.handleScroll()

    componentWillReceiveProps(nextProps) {

        if (this.props.location.pathname !== nextProps.location.pathname) {
            if( nextProps.location.pathname == "/" ){
                this.props.set_loading(true);
                this.setState({ is_loading: true });
                this._autoClearLoading();
            }
            
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            
        }

        if (nextProps[LoadingAction.ACTION_SET_LOADING] == false && this.state.is_loading) {
            this.setState({ is_loading: false });
        } else if (nextProps[LoadingAction.ACTION_SET_LOADING] == true && !this.state.is_loading) {
            this.setState({ is_loading: true });
            this._autoClearLoading();
        }
    }

    render() {

        let { is_loading } = this._getDataRender();
        return (
            <div className="App" ref={this.childDiv}>

                <Header clearCache={this._clearCache.bind(this)}/>
                {this.props.children}
                <Footer />                
                {is_loading && <Loading />}
                {/* <ToastContainer autoClose={config.time.default_toast} position={toast.POSITION.TOP_RIGHT} /> */}
                <div className="to-top" id="back-top"><i className="fa fa-angle-up"></i></div>

            </div>
        );
    }
    _clearCache = (callback) => {        
        if(typeof this.props.clearCache == 'function'){            
            this.props.clearCache(() => {                
                callback();
            })
        }
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
            if(this.state.is_loading){
                this.props.set_loading(false);
                this.setState({ is_loading: false });
                this.loading = null;
            }
            
        }, config.time.clearLoading);
    }
    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
              this.childDiv.current.scrollIntoView({ behavior: 'smooth' })
            }, 1000)
          }
        if (!this.props[LoadingAction.ACTION_SET_LOADING]) {
            this.props.set_loading(true);
            this.setState({ is_loading: true });
            this._autoClearLoading();
            
        }
        
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
