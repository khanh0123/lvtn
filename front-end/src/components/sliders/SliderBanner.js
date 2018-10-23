import React from "react";
import ReactDOM from "react-dom";
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
                                <img src="assets/images/slider/home-1/slider.jpg" />
                            </div>
                            <div className="slider-contents">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-offset-4 col-lg-offset-4 col-lg-7 col-md-7 col-sm-12  col-xs-12">
                                            <div className="slider-content">
                                                <h3 className="fadeInUp animated delay-1s animate" >Welcome to Our movie site</h3>
                                                <h2 className="fadeInUp animated delay-2s animate" >Our special <span className="green">Movies</span></h2>
                                                <p className="fadeInUp animated delay-3s animate" >Lorem Ipsum is simply dummy text of the printing and typesetting industrioy. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                                                <a className="fadeInUp animated delay-4s btn btn-button green-bg button-1 animation animate">Xem Ngay</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="slide-item">
                            <div className="slider-img">
                                <img src="assets/images/slider/home-1/slider-2.jpg" />
                            </div>
                            <div className="slider-contents">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-offset-4 col-lg-offset-4 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                            <div className="slider-content">
                                                <h3 className="delay-1s  animate" >Welcome to Our movie site</h3>
                                                <h2 className="delay-2s  animate" >Our special <span className="green">Movies</span></h2>
                                                <p className="delay-3s  animate" >Lorem Ipsum is simply dummy text of the printing and typesetting industrioy. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                                                <a className="delay-4s btn btn-button green-bg button-1 animation  animate">Read More</a>
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