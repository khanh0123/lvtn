import React from "react";
import SlideItem from "./SlideItem";
import OwlCarousel from 'react-owl-carousel2';

class Slider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data } = this.props;
        // let speed =  Math.floor(Math.random()*(2000-1500+1) + 1500);
        // let timeout = Math.floor(Math.random()*(2000-1500+1) + 1500);
        const options = {
            items: 3,
            autoplay: false,
            // autoplaySpeed:true,
            // autoplayTimeout:timeout,
            // autoplayHoverPause:true,
            center: true,
            loop: true,
            nav: true,
            // touchDrag:true,
            mouseDrag:true,
            // lazyLoad:true,
            // smartSpeed: speed,
            navText: ["<span class='flaticon-send'></span>", "<span class='flaticon-send'></span>"],
            responsive: {
                0: {
                    items: 2
                }
                , 480: {
                    items: 2
                }
                , 568: {
                    items: 2
                }
                , 736: {
                    items: 3
                }
                , 768: {
                    items: 3
                }
                , 992: {
                    items: 3
                }
                , 1200: {
                    items: 4
                }
            }
        };

        const events = {
            onDragged: function (event) { },
            onChanged: function (event) { }
        };
        return (
            <ul className="slider">
                {data && data.length > 0 &&
                    <OwlCarousel options={options} events={events}>
                    {data.map((item, i) => {
                        return <SlideItem item={item} key={i} />
                    })}
                    </OwlCarousel>
                }
            </ul>

        )
    }
}

export default Slider;