import React from "react";
import { Link } from "react-router-dom";
import { custom_date } from "../helpers";
import config from "../../config";

const SlideItem = ({item, type}) => {
    return (
        <div className="item" key={item.id}>
            <div className="movie-item-contents gradient">
                <div className="background-opacity"></div>

                    <img src={type == 2 ? item.images.poster.url : (item.images ? item.images.thumbnail.url : '')} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = config.images.empty_thumbnail }} />
                
                <div className="movie-item-content">
                    <div className="movie-item-content-top">
                        <div className="pull-left">
                            <span className="movie-count-time hover-left">{`${item.runtime} phút`}</span>
                        </div>
                        <div className="pull-right">
                            <div className="movie-ratting">
                                <a href="#" aria-label="link" ><span className="fa fa-star" />{`${item.avg_rate} /5`}</a>
                            </div>
                        </div>
                    </div>
                    <div className="movie-item-content-center">
                        <Link to={`/phim/${item.id}/${item.slug}`} className="flat-icons" title="Xem ngay"><span className="flaticon-play-button" /></Link>
                    </div>
                    <div className="movie-item-content-buttom">
                        <div className="movie-item-title">
                            <Link to={`/phim/${item.id}/${item.slug}`} >{item.name}</Link>
                        </div>
                        <div className="item-cat">
                            <ul>
                                <li><span>Danh mục : </span><Link to={`/${item.cat_slug}`}>{item.cat_name}</Link></li>
                            </ul>
                            <div className="item-cat-hover">
                                <ul>
                                    <li><span>Ngày phát hành : </span><span>{item.release_date ? custom_date(item.release_date) : 'Đang cập nhật ..'}</span></li>
                                    <li><span>Thể loại : </span>{_renderGenre(item.genre)}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="movie-item-beta">
                            <div className="movie-details">
                                <Link to={`/phim/${item.id}/${item.slug}`} className="btn btn-button button-detals blck-bg">Chi tiết</Link>
                            </div>
                            {/* <div className="view-movie">
                                <a href=""  className="blck-bg" >15k lượt xem</a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const _renderGenre = (data) => {
    let info = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            // info+=data[i].gen_name+", ";  
            let el = <Link key={i} to={`/${data[i].gen_slug}`}>{data[i].gen_name}</Link>
            info.push(el);
            i < data.length - 1 ? info.push(<span key={i + data.length}>, </span>) : '';
        }
        // info+=data[data.length-1].gen_name;
    }

    return info;
}

export default SlideItem;