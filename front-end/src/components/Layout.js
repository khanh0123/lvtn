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
import { log } from 'util';
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
        this.childDiv = React.createRef();
        this.scrollTop = null;

    }

    componentDidMount = () => this.handleScroll()

    async componentWillReceiveProps(nextProps) {
        
        
        
        
        if (this.props.location.pathname !== nextProps.location.pathname) {  
                      
            // if( nextProps.location.pathname == "/" ){
            //     this.props.set_loading(true);
            //     this.setState({ is_loading: true });
                
            // }
            clearTimeout(this.scrollTop)
            this.scrollTop = setTimeout(async () => {
                await this._scrollTop()
                // this.props.set_loading(false);
                // this._autoClearLoading(1000);
            }, 100)
            
        }
        if (nextProps[LoadingAction.ACTION_SET_LOADING] == false && this.state.is_loading) {
                        
            clearTimeout(this.scrollTop)
            this.scrollTop = setTimeout(async () => {
                this._scrollTop()
                // this.setState({is_loading:false})
            }, 100)
            
            
        } 
        else if (nextProps[LoadingAction.ACTION_SET_LOADING] == true && !this.state.is_loading &&  nextProps.location.pathname == "/") {
            this.setState({ is_loading: true },() => {                
                this._autoClearLoading();
            });
            
        }
        // console.log(this.state.is_loading);
    }
    _scrollTop = async () => {        
        return this.childDiv.current.scrollIntoView({ behavior: 'smooth',block: 'start' })
    }

    render() {

        let { is_loading } = this._getDataRender();
        
        return (
            <div className="App" ref={this.childDiv}>
                <Header clearCache={this._clearCache.bind(this)}/>
                {this.props.children}
                <Footer />                
                {is_loading && <Loading />}
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
        this._autoClearLoading();
        return {is_loading};
    }

    _autoClearLoading = (time) => {
        if(time === undefined){
            time = config.time.clearLoading
        } else {
            time = parseInt(time)
        }
        if(time > 5000){
            time = 5000
        }
        clearTimeout(this.loading)
        this.loading = setTimeout(() => {
            if(this.state.is_loading){
                this.props.set_loading(false);
                this.setState({ is_loading: false });
                this.loading = null;
            }            
        }, time);
    }
    handleScroll = (event) => {        
        const { index, selected } = this.props
        
        if (index === selected) {                       
            setTimeout(() => {
            this._scrollTop()
            }, 500);
         
        }
        // if (!this.props[LoadingAction.ACTION_SET_LOADING]) {
        //     this.props.set_loading(true);
        //     this.setState({ is_loading: true },() => {
        //         this._autoClearLoading();
        //     });
        // }
        
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
