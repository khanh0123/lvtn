import React from "react";
import SlideItem from "./SlideItem";
import OwlCarousel from 'react-owl-carousel2';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     data: []
        // };

    }
    // componentDidMount() {
    //     this.setState({ data: this.props.data });
    // }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ data: nextProps.data });
    // }

    render() {
        let { data } = this.props;
        const options = {
            items: 3,
            autoplay: false,
            center: true,
            loop: true,
            nav: true,
            smartSpeed: 1800,
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