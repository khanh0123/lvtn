import React , {} from 'react';
import {Link} from 'react-router-dom';
import Menu from './Menu';

function Header(){
    return (
        <header className="header-section">
                <div className="top-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-account sm-width sm-width-33">
                                <div className="top-accounts">
                                    <ul>
                                        <li><Link to="/"><span className="fa fa-user" />Đăng Ký</Link></li>
                                        <li><Link to="/"><span className="fa fa-lock" />Đăng Nhập</Link></li>
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
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 header-search-area sm-width">
                                <div className="header-search categorie-search-box">
                                    <form action="#">
                                        <div className="form-group">
                                            <select className="selectpicker" name="poscats" data-dropup-auto="true">
                                                <option value={0}>Theo Tên</option>
                                                <option value={2}>Theo tác giả</option>
                                                <option value={3}>Theo diễn viên</option>
                                            </select>
                                        </div>
                                        <input className="form-control" type="text" placeholder="Nhập vào từ khóa" />
                                        <button><span className="fa fa-search" /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu/>
                
            </header>
    )
}
// class Header extends React.Component {
//     render() {
//         return (
//             <header className="header-section">
//                 <div className="top-header">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-account sm-width sm-width-33">
//                                 <div className="top-accounts">
//                                     <ul>
//                                         <li><Link to="/"><span className="fa fa-user" />Đăng Ký</Link></li>
//                                         <li><Link to="/"><span className="fa fa-lock" />Đăng Nhập</Link></li>
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-message sm-width sm-width-33 hidden-xs">
//                                 <div className="top-messages">
//                                     <p><span className="fa fa-envelope-o" /> Chào Mừng Bạn Đến Với <strong className="green"> ** Movie Star **</strong></p>
//                                 </div>
//                             </div>
//                             <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 top-visitors hiddens sm-width sm-width-33 hidden-xs">
//                                 <div className="top-visitor">
//                                     <p><span className="fa fa-users" /> Lượt truy cập hôm nay: 32155</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="header-center">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 header-logos sm-width">
//                                 <div className="header-logo">
//                                     <Link to="/">
//                                         <img src='/assets/images/logo.png' alt="logo" />
//                                     </Link>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 header-search-area sm-width">
//                                 <div className="header-search categorie-search-box">
//                                     <form action="#">
//                                         <div className="form-group">
//                                             <select className="selectpicker" name="poscats" data-dropup-auto="true">
//                                                 <option value={0}>Theo Tên</option>
//                                                 <option value={2}>Theo tác giả</option>
//                                                 <option value={3}>Theo diễn viên</option>
//                                             </select>
//                                         </div>
//                                         <input className="form-control" type="text" placeholder="Nhập vào từ khóa" />
//                                         <button><span className="fa fa-search" /></button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <nav className="navbar navbar-default bootsnav navbar-sticky">
//                     <div className="container">
//                         <div className="social">
//                             <div className="attr-nav">
//                                 <ul>
//                                     <li><Link to="/#"><i className="fa fa-facebook" /></Link></li>
//                                     <li><Link to="/#"><i className="fa fa-twitter" /></Link></li>
//                                     <li><Link to="/#"><i className="fa fa-linkedin" /></Link></li>
//                                     <li><Link to="/#"><i className="fa fa-instagram" /></Link></li>
//                                     <li><Link to="/#"><i className="fa fa-google-plus" /></Link></li>
//                                 </ul>
//                             </div>
//                         </div>

//                         <div className="navbar-header">
//                             <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
//                                 <i className="fa fa-align-justify" />
//                             </button>
//                         </div>

//                         <div className="collapse navbar-collapse" id="navbar-menu">
//                             <ul className="nav navbar-nav navbar-left" data-in="" data-out="">
//                                 <li>
//                                     <Link to="/" >Trang Chủ</Link>
//                                 </li>
//                                 <li className="dropdown">
//                                     <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">Phim Lẻ</a>
//                                     <ul className="dropdown-menu">
//                                         <li><Link to="/phim-le/phim-hanh-dong" >Phim Hành Động</Link></li>
//                                         <li><Link to="/phim-le/phim-tam-ly" >Phim Tâm Lý</Link></li>
//                                         <li><Link to="/phim-le/phim-tinh-cam" >Phim Tình Cảm</Link></li>
//                                         <li><Link to="/phim-le/phim-kinh-di" >Phim Kinh Dị</Link></li>
//                                         <li><Link to="/phim-le/phim-vien-tuong" >Phim Viễn Tưởng</Link></li>
//                                     </ul>
//                                 </li>
//                                 <li className="dropdown">
//                                     <Link to="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">Phim bộ</Link>
//                                     <ul className="dropdown-menu">
//                                         <li><Link to="/phim-bo/phim-hanh-dong" >Phim bộ Việt Nam</Link></li>
//                                         <li><Link to="/phim-le/phim-tam-ly" >Phim bộ Trung Quốc</Link></li>
//                                         <li><Link to="/phim-le/phim-tinh-cam" >Phim bộ Hàn Quốc</Link></li>
//                                         <li><Link to="/phim-le/phim-tinh-cam" >Phim bộ Mỹ</Link></li>
//                                         <li><Link to="/phim-le/phim-tinh-cam" >Phim bộ Thái Lan</Link></li>
//                                     </ul>
//                                 </li>
//                                 <li className="dropdown megamenu-fw">
//                                     <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">Quốc Gia</a>
//                                     <ul className="dropdown-menu megamenu-content" role="menu">
//                                         <li>
//                                             <div className="row">
//                                                 <div className="col-menu col-md-3">
//                                                 <h6 className="title">Châu Âu</h6>
//                                                     <div className="content">
//                                                         <ul className="menu-col">
//                                                             <li><Link to="/grid-page.html/">Việt Nam</Link></li>
//                                                             <li><Link to="/grid-left.html/">Trung Quốc</Link></li>
//                                                             <li><Link to="/grid-right.html/">Mỹ</Link></li>
//                                                             <li><Link to="/list-page.html/">Đài Loan</Link></li>
//                                                             <li><Link to="/list-left.html/">Châu Âu</Link></li>
//                                                             <li><Link to="/list-right.htm/l">Nhật Bản</Link></li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                                 {/* end col-3 */}
//                                                 <div className="col-menu col-md-3">
//                                                 <h6 className="title">Châu Á</h6>
//                                                     <div className="content">
//                                                         <ul className="menu-col">
//                                                             <li><Link to="/details.html/">Hồng Kông</Link></li>
//                                                             <li><Link to="/detail">Thái Lan</Link></li>
//                                                             <li><Link to="/call-to-action.html/">Châu Á</Link></li>
//                                                             <li><Link to="/shortcode-alerts.html/">Ấn Độ</Link></li>
//                                                             <li><Link to="/tag.html/">Pháp</Link></li>
//                                                             <li><Link to="/toggle.html/">Anh</Link></li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                                 {/* end col-3 */}
//                                                 <div className="col-menu col-md-3">
//                                                 <h6 className="title">Châu Mỹ</h6>
//                                                     <div className="content">
//                                                         <ul className="menu-col">
//                                                             <li><Link to="/details.html/">Hồng Kông</Link></li>
//                                                             <li><Link to="/detail">Thái Lan</Link></li>
//                                                             <li><Link to="/call-to-action.html/">Châu Á</Link></li>
//                                                             <li><Link to="/shortcode-alerts.html/">Ấn Độ</Link></li>
//                                                             <li><Link to="/tag.html/">Pháp</Link></li>
//                                                             <li><Link to="/toggle.html/">Anh</Link></li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                                 {/* end col-3 */}
//                                                 <div className="col-menu col-md-3">
//                                                 <h6 className="title">Châu Đại Dương</h6>
//                                                     <div className="content">
//                                                         <ul className="menu-col">
//                                                             <li><Link to="/details.html/">Hồng Kông</Link></li>
//                                                             <li><Link to="/detail">Thái Lan</Link></li>
//                                                             <li><Link to="/call-to-action.html/">Châu Á</Link></li>
//                                                             <li><Link to="/shortcode-alerts.html/">Ấn Độ</Link></li>
//                                                             <li><Link to="/tag.html/">Pháp</Link></li>
//                                                             <li><Link to="/toggle.html/">Anh</Link></li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                                 {/* end col-3 */}
//                                             </div>
//                                             {/* end row */}
//                                         </li>
//                                     </ul>
//                                 </li>
                                
//                                 <li><Link to="/phim-chieu-rap">Phim Chiếu Rạp</Link></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </nav>
//             </header>

//         )
//     }
// }

export default Header;