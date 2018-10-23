import React from "react";
import SlideItem from "./SlideItem";
import SliderScroll from "./SliderScroll";
import OwlCarousel from 'react-owl-carousel2';

class Slider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            items:[],
        }
    }
    componentDidMount(){
        let {title = '',items = []} = this.props;
        this.setState({title:title,items:items});
    }
    render() {
        const options = {
            autoplay: false,
            autoplaySpeed: false,
            nav: true,
            dots: false,
            smartSpeed: 1200,
            loop: false,
            navText: ["<i class='flaticon-send'></i>", "<span class='flaticon-send'></span>"],
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 1
                }
                , 480: {
                    items: 1, margin: 15
                }
                , 768: {
                    items: 1, margin: 15
                }
                , 992: {
                    items: 1
                }
                , 1200: {
                    items: 1
                }
            }
            , margin: 29,
        };

        const events = {
            onDragged: function (event) { },
            onChanged: function (event) { }
        };
        return (
            <div className="container slide-big">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <div className="movie-big" id="movie-slide">
                            <OwlCarousel options={options} events={events}>
                                <SlideItem />
                                <SlideItem />
                                <SlideItem />
                                <SlideItem />
                            </OwlCarousel>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <SliderScroll title=""/>
                    </div>

                </div>
            </div>

        )
    }
}

export default Slider;