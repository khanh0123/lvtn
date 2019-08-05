import React from "react";
import { Link } from "react-router-dom"
import RBCarousel from   "../../assets/js/react-bootstrap-carousel";

class SliderBanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            autoplay: true,
            leftIcon: '',
            rightIcon: ''
        };
    }

    
    componentDidMount() {
        this._setIconPlay();
    }
    shouldComponentUpdate(nextProps){
        return this.props.data != nextProps.data;
    }
    render() {
        let { data } = this.props;

        return data.length > 0 && (
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
                        {data.map((item, i) => {
                            return (
                                <div className="slide-item" key={item.id}>
                                    <div className="slider-img">
                                        <div className="bg-top"></div>
                                        <img src={item.images.poster ? item.images.poster.url : (item.images.thumbnail ? item.images.thumbnail.url : '')} alt={item.name}/>
                                    </div>
                                    <div className="slider-contents">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-offset-4 col-lg-offset-4 col-lg-7 col-md-7 col-sm-12  col-xs-12">
                                                    <div className="slider-content">
                                                        <h2 className={`animated delay-1s animate${i == 0 ? ' fadeInLeft' : ''}`}>{item.name}</h2>
                                                        <p className={`animated delay-2s animate${i == 0 ? ' fadeInRight' : ''}`} dangerouslySetInnerHTML={{ __html: item.short_des }}></p>

                                                        <Link to={`/phim/${item.id}/${item.slug}`} className="fadeInUp animated delay-3s btn btn-button green-bg button-1 animation animate">Xem Ngay</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}




                    </RBCarousel>
                </div>
            </div>
        ) || <div />
    }
    onSelect = (active, direction) => {
        this.animateSlide();

    };
    animateSlide = () => {
        if (typeof window == 'undefined') return;
        let arrList = document.querySelectorAll('#bootstrap-touch-slider .item');
        for (let i = 0; i < arrList.length; i++) {
            let needed = arrList[i].querySelectorAll('.animate');

            for (let j = 0; j < needed.length; j++) {
                if (needed[j].classList.contains('animated') && needed[j].classList.contains('fadeInLeft')) {
                    needed[j].classList.remove('fadeInLeft');
                    needed[j].classList.remove('animated');
                }
                if (needed[j].classList.contains('animated') && needed[j].classList.contains('fadeInRight')) {
                    needed[j].classList.remove('fadeInRight');
                    needed[j].classList.remove('animated');
                }
                if (arrList[i].classList.contains('active')) {
                    needed[j].className += needed[j].classList.contains('delay-1s') ? ' fadeInLeft animated' : ' fadeInRight animated';
                }
            }


        }
    }
    visiableOnSelect = active => {
        //console.log(`visiable onSelect active=${active}`);
    };
    slideNext = () => {
        this.slider.slideNext();
    };
    slidePrev = () => {
        this.slider.slidePrev();
    };
    // goToSlide = () => {
    //     this.slider.goToSlide(4);
    // };
    autoplay = () => {
        this.setState({ autoplay: !this.state.autoplay });
    };

    _setIconPlay = () => {
        this.setState({ leftIcon: <span className="flaticon-send" />, rightIcon: <span className="flaticon-send" /> });
    };
}

export default (SliderBanner);
// export default withStyles(s)(SliderBanner);