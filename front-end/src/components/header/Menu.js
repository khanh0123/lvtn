import React, { Component } from "react";
import { MenuAction } from "../../actions"
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import config from "../../config";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_menu: []
        }
        props.get_menu().then(res => {            
            let data = res.payload.data;
            this.setState({ data_menu: data });
        })


    }
    renderMenuitem(item){        
        return (
            item.sub_menu.map((mnu,i) => {
                return <li key={i}><Link to={`/${item.slug}/${mnu.slug}`} >{mnu.name}</Link></li>
            })
            
        );
    }
    render() {
        let { data_menu } = this.state;
        return (
            <nav className="navbar navbar-default bootsnav navbar-sticky">
                <div className="container">
                    <div className="social">
                        <div className="attr-nav">
                            <ul>
                                <li><Link to="#"><i className="fa fa-facebook" /></Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                            <i className="fa fa-align-justify" />
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav navbar-left" data-in="" data-out="">
                            <li>
                                <Link to="/" >Trang Chủ</Link>
                            </li>
                            {data_menu.map((item , i) => {
                                
                                return (item.sub_menu.length > 1 ?
                                    <li className="dropdown" key={i}>
                                        <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">{item.name}</a>
                                        <ul className="dropdown-menu">
                                            {this.renderMenuitem(item)}
                                        </ul>
                                    </li>
                                    :
                                    <li key={i}>
                                        <Link to={item.sub_menu[0].slug} >{item.sub_menu[0].name}</Link>
                                    </li>
                                )

                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        );
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