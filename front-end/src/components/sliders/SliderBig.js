import React from "react";
import SlideItem from "./SlideItem";
import OwlCarousel from 'react-owl-carousel2';
import {Link} from "react-router-dom";
import {custom_date} from "../helpers";
import config from "../../config";

class SliderBig extends React.Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        
        return this.props.data != nextProps.data;
    }
    render() {
        //console.log("render");
        let {data} = this.props;
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
                    items: 2
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
        return data.length > 0 && (
            <div className="container slide-big">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 hidden-xs">
                        <div className="movie-big">
                            <OwlCarousel options={options} events={events}>
                                {data.map((item,i) => {
                                    return <SlideItem item={item} key={i} type={2}/>
                                })}
                            </OwlCarousel>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-10 col-xs-offset-1 col-sm-offset-0">
                    <div className="movie-item-playlist">
                        {/* {title &&
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
                        } */}
                        <div className="movie-item-playlist-items scroll-up ">
                            <div className="item">
                                {data.map((item,i) => {
                                    
                                    return (
                                        <div className="plylist-single" key={i}>
                                            <div className="plylist-img">
                                                <img src={item.images.thumbnail ? item.images.thumbnail.url : item.images.poster.url} alt={item.name} onError={(e)=>{e.target.onerror = null; e.target.src=config.images.empty_thumbnail}}/>
                                            </div>
                                            <div className="plylist-single-content">
                                                <Link to={`/phim/${item.id}/${item.slug}`} >{item.name}</Link>
                                                <div className="view-movi">
                                                    <a href="#" aria-label="link">{item.cat_name}</a>
                                                </div>
                                                <ul>
                                                    <li className="novie-upload-time"><a href="">{item.release_date ? custom_date(item.release_date) : 'Đang cập nhật ..'}</a></li>
                                                    <li className="movie-time"><a href="#" aria-label="link">{`${item.runtime} phút`}</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default SliderBig;