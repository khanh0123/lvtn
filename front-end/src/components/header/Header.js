import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <header className="header-section">
                <div className="top-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-account sm-width sm-width-33">
                                <div className="top-accounts">
                                    <ul>
                                        <li><a href=""><span className="fa fa-user" />Đăng Ký</a></li>
                                        <li><a href=""><span className="fa fa-lock" />Đăng Nhập</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-message sm-width sm-width-33">
                                <div className="top-messages">
                                    <p><span className="fa fa-envelope-o" /> Chào Mừng Bạn Đến Với <strong className="green"> ** King Star **</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-visitors hiddens sm-width sm-width-33">
                                <div className="top-visitor">
                                    <p><span className="fa fa-users" /> Lượt truy cập: 32155</p>
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
                                            <select className="selectpicker" name="poscats">
                                                <option value={0}>Movie</option>
                                                <option value={2}>Englesh</option>
                                                <option value={3}>Hindi</option>
                                                <option value={4}>India</option>
                                                <option value={5}>Englesh</option>
                                                <option value={6}>Hindi</option>
                                                <option value={7}>India</option>
                                            </select>
                                        </div>
                                        <input className="form-control" type="text" placeholder="Enter Search" />
                                        <button><span className="fa fa-search" /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="navbar navbar-default bootsnav navbar-sticky">
                    <div className="container">
                        <div className="social">
                            <div className="attr-nav">
                                <ul>
                                    <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                    <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                                    <li><a href="#"><i className="fa fa-instagram" /></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus" /></a></li>
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
                                <li className="dropdown">
                                    <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">Phim Lẻ</a>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/" >Phim Hành Động</Link></li>
                                        <li><Link to="/" >Phim Tâm Lý</Link></li>
                                        <li><Link to="/" >Phim Tình Cảm</Link></li>
                                        <li><Link to="/" >Phim Kinh Dị</Link></li>
                                        <li><Link to="/" >Phim Viễn Tưởng</Link></li>
                                    </ul>
                                </li>
                                <li className="dropdown megamenu-fw">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Shortcode</a>
                                    <ul className="dropdown-menu megamenu-content" role="menu">
                                        <li>
                                            <div className="row">
                                                <div className="col-menu col-md-3">
                                                    <h6 className="title">Page List</h6>
                                                    <div className="content">
                                                        <ul className="menu-col">
                                                            <li><a href="grid-page.html">Grid Page</a></li>
                                                            <li><a href="grid-left.html">grid Left</a></li>
                                                            <li><a href="grid-right.html">grid right</a></li>
                                                            <li><a href="list-page.html">List Page</a></li>
                                                            <li><a href="list-left.html">List left</a></li>
                                                            <li><a href="list-right.html">List right</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* end col-3 */}
                                                <div className="col-menu col-md-3">
                                                    <h6 className="title">Page list</h6>
                                                    <div className="content">
                                                        <ul className="menu-col">
                                                            <li><Link to="/details.html">Details Page</Link></li>
                                                            <li><Link to="/detail">Details Page 2</Link></li>
                                                            <li><a href="call-to-action.html">call-to-action</a></li>
                                                            <li><a href="shortcode-alerts.html">shortcode alert</a></li>
                                                            <li><a href="tag.html">tag</a></li>
                                                            <li><a href="toggle.html">toggle</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* end col-3 */}
                                                <div className="col-menu col-md-3">
                                                    <h6 className="title">page list</h6>
                                                    <div className="content">
                                                        <ul className="menu-col">
                                                            <li><a >Acodiam</a></li>
                                                            <li><a >blockquote</a></li>
                                                            <li><a >breadcrumb</a></li>
                                                            <li><a >pagination</a></li>
                                                            <li><a >tab</a></li>
                                                            <li><a >social icon</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-menu col-md-3">
                                                    <h6 className="title">Moview List</h6>
                                                    <div className="content">
                                                        <ul className="menu-col">
                                                            <li><a >English</a></li>
                                                            <li><a >Hindi</a></li>
                                                            <li><a >india</a></li>
                                                            <li><a >tamil</a></li>
                                                            <li><a >animation</a></li>
                                                            <li><a >3d Movie</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* end col-3 */}
                                            </div>
                                            {/* end row */}
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">page</a>
                                    <ul className="dropdown-menu">
                                        <li><a href="gallery.html">gallery</a></li>
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">404 page</a>
                                            <ul className="dropdown-menu">
                                                <li><a href="404.html">404 page 1</a></li>
                                                <li><a href="404_2.html">404 page 2</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">LogIn page</a>
                                            <ul className="dropdown-menu">
                                                <li><a href="login.html">login 1</a></li>
                                                <li><a href="login-2.html">login 2</a></li>
                                                <li><a href="login-3.html">login 3</a></li>
                                                <li><a href="login-4.html">login 4</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Comming soon</a>
                                            <ul className="dropdown-menu">
                                                <li><a href="coming_soon.html">Comming soon</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Blog</a>
                                    <ul className="dropdown-menu">
                                        <li><a href="blog.html">Blog 1</a></li>
                                        <li><a href="blog-2.html">Blog 2</a></li>
                                        <li><a href="blog-3.html">Blog 3</a></li>
                                        <li><a href="single-blog.html">single blog 1</a></li>
                                        <li><a href="single-blog-2.html">single Blog 2</a></li>
                                        <li><a href="single-blog-3.html">single Blog 3</a></li>
                                    </ul>
                                </li>
                                <li><a href="contact.html">Contacts</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

        )
    }
}

export default Header;