import React from "react";
import { MenuAction } from "../../actions"
import { Link,withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import config from "../../config";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_menu: []
        }
        
        this._goSearchPage = this._goSearchPage.bind(this);


    }
    async componentDidMount(){
        if(!this.props[MenuAction.ACTION_GET_MENU]){
            let res = await this.props.get_menu();
            let menu = res.payload.data;
            this.setState({ data_menu: menu });
        }
        
        if(typeof window != 'undefined')  document.querySelector('.wrap-sticky')?  document.querySelector('.wrap-sticky').style.height = '5em' : '';
        
    }
    shouldComponentUpdate(nextProps){
        return this.props[MenuAction.ACTION_GET_MENU] != nextProps[MenuAction.ACTION_GET_MENU]

    }
    render() {
        let { data_menu } = this._getDataRender();
        return (
            <nav className="navbar navbar-default bootsnav navbar-sticky">
                <div className="container">
                    {/* <div className="social">
                        <div className="attr-nav">
                            <ul>
                                <li><Link to="#"><i className="fa fa-facebook" /></Link></li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 header-logos sm-width">
                        <div className="header-logo">
                            <Link to="/">
                                <img src='/images/logo.png' alt="logo" />
                            </Link>
                        </div>
                    </div>



                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12 sm-width">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                                <i className="fa fa-align-justify" />
                            </button>
                        </div>

                        <div className="collapse navbar-collapse" id="navbar-menu">
                            <ul className="nav navbar-nav navbar-left" data-in="" data-out="">
                                <li><Link to="/" >Trang Chủ</Link></li>
                                {data_menu.map((item, i) => {
                                    return (item.sub_menu.length > 1 ?
                                        <li className="dropdown" key={i}>
                                            <a href="javascript:void(0)" aria-label="link" className="dropdown-toggle" data-toggle="dropdown">{item.name}</a>
                                            <ul className="dropdown-menu">
                                                {this._renderMenuitem(item)}
                                            </ul>
                                        </li>
                                        :
                                        <li key={i}>
                                            <Link to={'/'+item.sub_menu[0].slug} >{item.sub_menu[0].name}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 sm-width search-box">
                        <div className="header-search categorie-search-box">

                            <div className="newsletter-input">
                                <input type="text" className="form-control"  name="inputsearch" placeholder="Nhập từ khóa" id="search_keyword" onKeyUp={
                                    (event) => {
                                        if(event.key == "Enter"){
                                            this._goSearchPage(event.target.value);
                                        }
                                    }
                                }/>
                                <button name="btn-search" role="button" aria-label="alternative for screen readers" title="alternative for other users" className="newsletter-btn" onClick={() => this._goSearchPage()}><span className="fa fa-search"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
    _getDataRender = () => {
        let { data_menu } = this.state
        
        if(data_menu.length == 0 && this.props[MenuAction.ACTION_GET_MENU]){
            data_menu = this.props[MenuAction.ACTION_GET_MENU];
        }
        return {data_menu}
    }
    _renderMenuitem(item) {
        return (
            item.sub_menu.map((mnu, i) => {
                return <li key={i}><Link to={`/${item.slug}/${mnu.slug}`} >{mnu.name}</Link></li>
            })

        );
    }
    _goSearchPage() {
        if(typeof window == 'undefined') return;
        let search_box = document.getElementById("search_keyword");
        if (search_box) {
            let keyword = search_box.value;
            this.props.history.push({
                pathname: '/tim-kiem',
                search: "?" + new URLSearchParams({ q: keyword }).toString()
            })
            search_box.value = '';
        }
        
    }
}
function mapStateToProps({ menu_results }) {
    return Object.assign({}, menu_results || {});
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        get_menu: MenuAction.get_menu,
    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));