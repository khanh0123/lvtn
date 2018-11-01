import React from "react";
import {Link} from "react-router-dom";

class SlideItem extends React.Component {
    render() {
        return (
            <div className="item">
                <div className="movie-item-contents gradient">
                    <img src="https://2sao.vietnamnetjsc.vn/images/2018/07/29/21/49/dien-hi-cong-luoc-19.JPG" />
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
                            <Link to="/phim/abc-123/xem-phim" className="flat-icons" title="Xem ngay"><span className="flaticon-play-button" /></Link>
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
                                <div className="view-movie">
                                    <a href=""  className="blck-bg" >15k lượt xem</a>
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