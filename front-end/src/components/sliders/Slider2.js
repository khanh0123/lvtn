import React from "react";
import SlideItem2 from "./SlideItem2";
import SlideItem from "./SlideItem";
import OwlCarousel from 'react-owl-carousel2';

class Slider2 extends React.Component {

    render() {
        const options = {
            autoplay: false, 
            autoplaySpeed: false,
            nav: true,
            dots: false,
            loop: true,
            margin: 30,
            navText: ["<i class='flaticon-send'></i>", "<span class='flaticon-send'></span>"],
            autoplayHoverPause: false,
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
                , 768: {
                    items: 2
                }
                , 992: {
                    items: 3
                }
                , 1200: {
                    items: 3
                }
            } //padding: 10 
        };

        const events = {
            onDragged: function (event) { },
            onChanged: function (event) { }
        };
        return (
            <div className="category-slide">
                <OwlCarousel options={options} events={events}>
                    <SlideItem2 />
                    <SlideItem2 />
                    <SlideItem2 />
                    <SlideItem2 />
                </OwlCarousel>

            </div>

        )
    }
}

export default Slider2;