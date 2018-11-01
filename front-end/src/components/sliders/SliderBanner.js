import React from "react";
import {Link} from "react-router-dom"
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

class SliderBanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            autoplay: true,
            leftIcon:'',
            rightIcon:''
        };
    }

    onSelect = (active, direction) => {
        this.animateSlide();

    };
    animateSlide = () => {
        let arrList = document.querySelectorAll('#bootstrap-touch-slider .item');
        for (let i = 0; i < arrList.length; i++) {
            let needed = arrList[i].querySelectorAll('.animate');

            for (let j = 0; j < needed.length; j++) {
                if (needed[j].classList.contains('animated')) {
                    needed[j].classList.remove('fadeInUp');
                    needed[j].classList.remove('animated');

                }
                if(arrList[i].classList.contains('active')){
                    needed[j].className += ' fadeInUp animated';
                }
            }
            

        }
    }
    visiableOnSelect = active => {
        console.log(`visiable onSelect active=${active}`);
    };
    slideNext = () => {
        this.slider.slideNext();
    };
    slidePrev = () => {
        this.slider.slidePrev();
    };
    goToSlide = () => {
        this.slider.goToSlide(4);
    };
    autoplay = () => {
        this.setState({ autoplay: !this.state.autoplay });
    };

    _setIconPlay = () => {
        this.setState({ leftIcon : <span className="flaticon-send" />, rightIcon: <span className="flaticon-send" /> });
    };
    componentDidMount(){
        this._setIconPlay();
    }
    render() {

        return (
            <div className="slider-section fade control-round" id="bootstrap-touch-slider">
                <div className="slider-items carousel-inner" role="listbox">
                    <RBCarousel
                        animation={true}
                        autoplay={this.state.autoplay}
                        slideshowSpeed={6000}
                        leftIcon={this.state.leftIcon}
                        rightIcon={this.state.rightIcon}
                        onSelect={this.onSelect}
                        version={3}
                    >
                        <div className="slide-item">
                            <div className="slider-img">
                            <div className="bg-top"></div>
                                <img src="https://static.vieplay.vn/vieplay-image/home_carousel_web/2018/10/10/5pkuvvu2_hau_duy_mat_troi_2016_s01__1920x700._1920_700.jpg" />
                            </div>
                            <div className="slider-contents">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-offset-4 col-lg-offset-4 col-lg-7 col-md-7 col-sm-12  col-xs-12">
                                            <div className="slider-content">
                                                <h2 className="fadeInUp animated delay-1s animate" >HẬU DUỆ MẶT TRỜI</h2>
                                                <p className="fadeInUp animated delay-2s animate" >Câu chuyện tình lãng mạn, ngọt ngào làm rung động hàng triệu trái tim của cặp đôi đại úy Yoo Shi Jin và nàng bác sĩ xinh đẹp Kang Mo Yeon khi đang làm nhiệm vụ bảo vệ hòa bình dân t ...</p>
                                                <Link to="/phim/hau-due-mat-troi-567" className="fadeInUp animated delay-3s btn btn-button green-bg button-1 animation animate">Xem Ngay</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="slide-item">
                            <div className="slider-img">
                                <div className="bg-top"></div>
                                <img src="https://static.vieplay.vn/vieplay-image/home_carousel_web/2018/10/09/fko5n30c_dien_hy_cong_luoc_2018_s01_1920x7007765f6cef660b1b64d888c030f445c49._1920_700.jpg" className="img-responsive" />
                            </div>
                            <div className="slider-contents">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-offset-4 col-lg-offset-4 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                            <div className="slider-content">
                                                {/* <h3 className="delay-1s  animate" >DIÊN HY CÔNG LƯỢC</h3> */}
                                                <h2 className="delay-1s  animate" >DIÊN HY CÔNG LƯỢC</h2>
                                                <p className="delay-2s  animate" >Phim xoay quanh những âm mưu, minh tranh ám đấu chốn hậu cung. Nổi bật là mối tình của hoàng đế và hoàng hậu Như Ý cũng như hé lộ lý do mà Như Ý (Kế hoàng hậu) bị thất sủng, giáng v ...</p>
                                                <Link to="/phim/dien-hy-dong-luoc-248" className="delay-3s btn btn-button green-bg button-1 animation  animate">Xem ngay</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </RBCarousel>
                </div>
            </div>
        )
    }
}

export default SliderBanner;