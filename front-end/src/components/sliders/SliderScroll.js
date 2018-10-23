import React from "react";
import SlideItemSmall from "./SlideItemSmall";

class SliderScroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title:null,
            items:[],
        }
    }
    componentDidMount(){
        let {title='',items=[]} = this.props;
        this.setState({title:title,items:items});
    }
    render() {
        let {title,listItem} = this.state;
        return (

            <div className="movie-item-playlist">
                <div className="movi-plylist-top">
                    <div className="pull-left">
                        <h2>{title}</h2>
                    </div>
                    <div className="pull-right">
                        <div className="plylist-wich">
                            <span className="icofont icofont-toggle-on" />
                        </div>
                    </div>
                </div>
                <div className="movie-item-playlist-items scroll-up ">
                    <div className="item">
                        <SlideItemSmall />
                        <SlideItemSmall />
                        <SlideItemSmall />
                        <SlideItemSmall />
                        <SlideItemSmall />
                        <SlideItemSmall />
                    </div>
                </div>
            </div>

        )
    }
}

export default SliderScroll;