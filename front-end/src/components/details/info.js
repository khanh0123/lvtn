import React from 'react';
import { Link } from 'react-router-dom';
import FacebookProvider, { Share } from 'react-facebook';
import Trailer from "../video/trailer";
import SliderScroll from "../sliders/SliderScroll";
import parseFB from "../helpers/common";
class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_open_trailer: false
        }
    }

    componentDidMount() {
        parseFB();
    }
    action_Trailer() {
        this.setState({ is_open_trailer: !this.state.is_open_trailer } , () => {
            console.log(this.state.is_open_trailer);
            
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="breadcrumbs">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link to="/"><span className="fa fa-home" /> Trang chủ</Link></li>
                            <li><Link to="/tu-khoa/phim-bo">Phim Bộ</Link></li>
                            <li><Link to="/tu-khoa/phim-hanh-dong">Phim Hành Động</Link></li>
                            <li>Thám Tử Ma</li>
                        </ul>
                    </div>
                </div>
                <div className="inner-page">
                    <div className="container">
                        <div className="details-page">
                            <div className="details-big-img ">
                                <img src="/assets/images/details/1.jpg" alt="" className="hidden-xs" />
                                <div className="play-icon">
                                    <Link to="/phim/tham-tu-ma-123/xem-phim" className="flat-icons"><span className="flaticon-play-button" /></Link>
                                </div>
                            </div>
                            <div className="details-contents">
                                <div className="row">
                                    <div className="col-md-offset-1 col-lg-offset-1 col-lg-11 col-md-11 col-sm-12 col-xs-12">
                                        <div className="details-content">
                                            <div className="details-reviews">
                                                <div className="row">
                                                    <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                                        <div className="dec-review-img">
                                                            <img src="/assets/images/details/2.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                                                        <div className="dec-review-dec">
                                                            <div className="details-title">
                                                                <h2>Thám Tử Ma (2018)</h2>
                                                            </div>
                                                            <div className="ratting">
                                                                <span className="fa fa-star" />
                                                                <span className="fa fa-star" />
                                                                <span className="fa fa-star" />
                                                                <span className="fa fa-star" />
                                                                <span className="fa fa-star" />
                                                                <a href="">4.5/5 rating</a>
                                                            </div>
                                                            <div className="dec-review-meta">
                                                                <ul>

                                                                    <li><span>Đạo diễn <label>:</label></span><a href="">Khánh đẹp trai</a></li>
                                                                    <li><span>Ngày chiếu <label>:</label></span><a href="">15/10/2018</a></li>
                                                                    <li>
                                                                        <span>Diễn viên <label>:</label></span>
                                                                        <a href="">abc,</a>
                                                                        <a href="">xyz,</a>
                                                                        <a href="">pwa</a>
                                                                    </li>
                                                                    <li>
                                                                        <span>Thể loại <label>:</label></span>
                                                                        <a href="">Tình cảm,</a>
                                                                        <a href="">Gia đình,</a>
                                                                        <a href="">Cổ trang</a>
                                                                    </li>
                                                                    <li>
                                                                        <b className="btn btn-danger" onClick={this.action_Trailer.bind(this)}>Xem Trailer</b>
                                                                        <Trailer 
                                                                            isOpen={this.state.is_open_trailer} 
                                                                            onClose={this.action_Trailer.bind(this)}
                                                                            source={'https://www.youtube.com/embed/fkdTsUW_yYM?autoplay=1'} 
                                                                        />
                                                                        <Link to="/phim/tham-tu-ma-123/xem-phim"><b className="btn btn-success">Xem Phim</b></Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="social-links">
                                                                <strong>Chia sẻ :</strong>
                                                                <FacebookProvider appId="361492804618262">
                                                                    <Share href="http://www.facebook.com">
                                                                        <a className="socila-tw"><i className="fa fa-facebook" /></a>
                                                                    </Share>
                                                                </FacebookProvider>
                                                                <a href="" className="socila-tw"><i className="fa fa-twitter" /></a>
                                                                <a href="" className="socila-sk"><i className="fa fa-skype" /></a>
                                                                <a href="" className="socila-pin"><i className="fa fa-pinterest" /></a>
                                                                <a href="" className="socila-ins"><i className="fa fa-instagram" /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-offset-1 col-lg-offset-1 col-lg-8 col-md-8">
                                        <div className="details-dectiontion">
                                            <h2 className="title">Nội Dung Phim</h2>
                                            <p>Phim How It Ends xoay quanh một thảm hoạ kinh hoàng biến nhiều con đường thành địa ngục khi một người cha trẻ đang trên đường quay về nhà với người vợ mang thai ở phía kia đất nước.</p>
                                        </div>
                                        <div className="comment-area">
                                            <h2 className="title">Bình Luận</h2>
                                            <div className="fb-comments" data-href="http://www.phimmoi.net/phim/nguoi-kien-va-chien-binh-ong-6938/" data-numposts="5" data-colorscheme="dark" data-width="100%"></div>
                                        </div>

                                    </div>
                                    <div className="col-lg-3 col-md-3 hidden-xs">
                                        <SliderScroll title="Trailer Phim Mới" />
                                        <SliderScroll title="Phim Bộ Hot" />
                                        <SliderScroll title="Phim Lẻ Hot" />

                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
            </React.Fragment>

        )
    }
}

export default Info;