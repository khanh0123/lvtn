import React from "react";
import {Link} from "react-router-dom";

class SlideItem2 extends React.Component {
    render() {
        return (
            <div className="item">
                <div className="movie-item-contents gradient">
                    <img src="http://tv.vietbao.vn/images/tv2015/tin-tuc/7f676ece0f-1-23244462-1953720461568286-3268780156402845094-n.jpeg" alt="" />
                    <div className="movie-item-content">
                        <div className="movie-item-content-top">
                            <div className="pull-left">
                                <span className="movie-count-time hover-left">02.50.20</span>
                            </div>
                            <div className="pull-right">
                                <div className="movie-ratting">
                                    <a href=""><span className="fa fa-star" />2/20</a>
                                </div>
                            </div>
                        </div>
                        <div className="movie-item-content-center">
                            <Link to="/phim/abc-123" className="flat-icons"><span className="flaticon-play-button" /></Link>
                        </div>
                        <div className="movie-item-content-buttom">
                            <div className="movie-item-title">
                                <Link to="/phim/abc-123" >DIÊN HY CÔNG LƯỢC</Link>
                            </div>
                            <div className="item-cat">
                                <ul>
                                    <li><span>Danh mục : </span><span>Phim bộ Trung Quốc</span></li>
                                </ul>
                                <div className="item-cat-hover">
                                    <ul>
                                        <li><span>Ngày phát hành : </span><span>26/5/2018</span></li>
                                        <li><span>Thể loại : </span><span>Cổ trang</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="movie-item-beta">
                                <div className="movie-details">
                                    <Link to="/phim/abc-123"  className="btn btn-button button-detals blck-bg">Chi tiết</Link>
                                </div>
                                <div className="view-movie hover-right">
                                    <a className="blck-bg" href="#">15k lượt xem</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SlideItem2;