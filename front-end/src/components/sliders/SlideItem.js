import React from "react";
import {Link} from "react-router-dom";

class SlideItem extends React.Component {
    render() {
        return (
            <div className="item">
                <div className="movie-item-contents gradient">
                    <img src="/assets/images/cat/1.jpg" />
                    <div className="movie-item-content">
                        <div className="movie-item-content-top">
                            <div className="pull-left">
                                <span className="movie-count-time hover-left">02.50.20</span>
                            </div>
                            <div className="pull-right">
                                <div className="movie-ratting">
                                   <a href="" ><span className="fa fa-star" />4/5</a>
                                </div>
                            </div>
                        </div>
                        <div className="movie-item-content-center">
                            <Link to="/phim/abc-123" className="flat-icons"><span className="flaticon-play-button" /></Link>
                        </div>
                        <div className="movie-item-content-buttom">
                            <div className="movie-item-title">
                               <a href="" >Hurry Animate Blue Strack New Movie (2018)</a>
                            </div>
                            <div className="item-cat">
                                <ul>
                                    <li><span>Category :</span><a href="">English Animation Movies</a></li>
                                </ul>
                                <div className="item-cat-hover">
                                    <ul>
                                        <li><span>Release :</span><a href="">October 26, 2017</a></li>
                                        <li><span>Genre :</span><a href="">Action, Drama</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="movie-item-beta">
                                <div className="movie-details">
                                    <a href=""  className="btn btn-button button-detals blck-bg">details</a>
                                </div>
                                <div className="view-movie">
                                    <a href=""  className="blck-bg" >15k view</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SlideItem;