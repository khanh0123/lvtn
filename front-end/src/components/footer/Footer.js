import React from "react";
class Footer extends React.Component {
    render() {
        return (
            <footer className="footer-section">
                <div className="footer-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 sm-width">
                                <div className="ft-widget">
                                    <div className="ft-content">
                                        <img src="/assets/images/ft-about.jpg" alt="" />
                                        <p>
                                            Movie star - Xem phim online <br/>
                                            Địa chỉ: 180 Cao Lỗ  <br/>
                                            Email: support@luanvantotnghiep.design Số điện thoại: 0982.000.000 (T2 - T6: 9h - 22h; T7-CN: 12h-21h)  <br/>
                                            Liên hệ quảng cáo: HCM: 0982.000.000 - HN: 0982.000.000
                                        </p>
                                        <div className="social-link">
                                            <ul>
                                                <li><a href="javascript:void(0)" className="ft-fb"><span className="fa fa-facebook" /></a></li>
                                                <li><a href="javascript:void(0)" className="ft-twitter"><span className="fa fa-twitter" /></a></li>
                                                <li><a href="javascript:void(0)" className="ft-pintarest"><span className="fa fa-pinterest" /></a></li>
                                                <li><a href="javascript:void(0)" className="ft-youtube"><span className="fa fa-youtube" /></a></li>
                                                <li><a href="javascript:void(0)" className="ft-linkedin"><span className="fa fa-linkedin" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Widget item */}
                            {/* Widget item */}
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 sm-width">
                                <div className="ft-widget">
                                    <h2><span>Danh mục phim</span></h2>
                                    <div className="ft-content">
                                        <ul>
                                            {/* <li><a href="">Movies</a> </li> */}
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* End Widget item */}
                            {/* Widget item */}
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 sm-width">
                                <div className="ft-widget">
                                    <h2><span>Thông tin</span></h2>
                                    <div className="ft-content">
                                        <ul>
                                            <li><a href="javascript:void(0)">Về chúng tôi</a> </li> 
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* End Widget item */}
                            {/* Widget item */}
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 sm-width">
                                <div className="ft-widget">
                                    <div className="ft-content twitter-contnt">
                                        <h2><span>Twitter</span></h2>
                                        <div className="ft-twitter-feed">
                                            <div className="ft-twitter-icon">
                                                <span className="fa fa-twitter" />
                                            </div>
                                            <div className="twitter-dec">
                                                <a href="javascript:void(0)">admin<span className="green">@movie.star</span></a>
                                                <p>Theo dõi chúng tôi trên Twitter </p>
                                                <div className="twitter-meta">
                                                    <ul>
                                                        <li><a href="javascript:void(0)"><span className="fa fa-mail-reply" /></a></li>
                                                        <li><a href="javascript:void(0)"><span className="fa fa-retweet" />12</a></li>
                                                        <li><a href="javascript:void(0)"><span className="fa fa-heart" />21</a></li>
                                                        <li><a href="javascript:void(0)"><span className="fa fa-ellipsis-h" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="newsletter">
                                        <h2><span>Nhận thông báo khi có phim mới</span></h2>
                                        <div className="newsletter-input">
                                            <input type="text" className="form-control" placeholder="Email Address" />
                                            <button className="newsletter-btn"><span className="fa fa-paper-plane" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Widget item */}
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 sm-width">
                                <div className="footer-menu">
                                    <ul>
                                        <li><a href="javascript:void(0)">Về chúng tôi</a></li>
                                        <li><a href="javascript:void(0)">Liên hệ</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 sm-width">
                                <div className="copyright-text">
                                    <p>CopyRight© 2018 - Bản quyền thuộc <a href="/">MovieStar</a> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        )
    }
}

export default Footer;