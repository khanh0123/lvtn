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
                                            Công ty cổ phần dịch vụ số Thái Bình Dương <br/>
                                            Địa chỉ: Phòng 802, tòa nhà Vietnam Business Center, 57-59 Hồ Tùng Mậu, Phường Bến Nghé, Quận 1, TPHCM.  <br/>
                                            Email: support@hdonline.vn Số điện thoại: 0939.789.133 (T2 - T6: 9h - 22h; T7-CN: 12h-21h)  <br/>
                                            Liên hệ quảng cáo: HCM: (028) 7300 8199 - HN: (024) 355 355 99 GP MXH: số 572/GP-BTTTT do Bộ TTTT cấp ngày 15/12/2016.
                                        </p>
                                        <div className="social-link">
                                            <ul>
                                                <li><a href="" className="ft-fb"><span className="fa fa-facebook" /></a></li>
                                                <li><a href="" className="ft-twitter"><span className="fa fa-twitter" /></a></li>
                                                <li><a href="" className="ft-pintarest"><span className="fa fa-pinterest" /></a></li>
                                                <li><a href="" className="ft-youtube"><span className="fa fa-youtube" /></a></li>
                                                <li><a href="" className="ft-linkedin"><span className="fa fa-linkedin" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Widget item */}
                            {/* Widget item */}
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 sm-width">
                                <div className="ft-widget">
                                    <h2><span>Movie Category</span></h2>
                                    <div className="ft-content">
                                        <ul>
                                            <li><a href="">Movies</a> </li>
                                            <li><a href="">Videos</a></li>
                                            <li><a href="">English</a>
                                            </li><li><a href="">China</a></li>
                                            <li><a href="">Tailor Upcoming Movies</a></li>
                                            <li><a href="">Upcoming Movies</a></li>
                                            <li><a href="">Contact Us</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* End Widget item */}
                            {/* Widget item */}
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 sm-width">
                                <div className="ft-widget">
                                    <h2><span>Information</span></h2>
                                    <div className="ft-content">
                                        <ul>
                                            <li><a href="">About Us</a> </li>
                                            <li><a href="">Song</a></li>
                                            <li><a href="">Forums</a></li>
                                            <li><a href="">Hot Collection</a></li>
                                            <li><a href="">Upcoming Movies</a></li>
                                            <li><a href="">Upcoming Events</a></li>
                                            <li><a href="">All Movies</a></li>
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
                                                <a href="">black-one <span className="green">@24Webpro</span></a>
                                                <p>Lorem Ipsum is simply dumy text of the printing.</p>
                                                <div className="twitter-meta">
                                                    <ul>
                                                        <li><a href=""><span className="fa fa-mail-reply" /></a></li>
                                                        <li><a href=""><span className="fa fa-retweet" />12</a></li>
                                                        <li><a href=""><span className="fa fa-heart" />21</a></li>
                                                        <li><a href=""><span className="fa fa-ellipsis-h" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="newsletter">
                                        <h2><span>newsletter</span></h2>
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
                                        <li><a href="">About Us</a></li>
                                        <li><a href="">Celebrities</a></li>
                                        <li><a href="">News</a></li>
                                        <li><a href="">Contacts</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 sm-width">
                                <div className="copyright-text">
                                    <p>CopyRight© 2018 <a href="">MovieStar</a> . All Rights Reserved.</p>
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