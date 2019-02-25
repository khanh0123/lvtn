import React from "react";
import {Link} from "react-router-dom";
import {custom_date} from "../helpers";

class SlideItem extends React.Component {
    constructor(props){
        super(props)
    }

    _renderGenre(data){        
        let info = '';
        if(data && data.length > 0){
            for (let i = 0; i < data.length - 1; i++) {
                info+=data[i].gen_name+", ";            
            }
            info+=data[data.length-1].gen_name;
        }
        
        return info;
    }
    render() {
        let {item,type} = this.props;
        
        
        return item && (
            <div className="item">
                <div className="movie-item-contents gradient">
                    <img src={type == 2 ? item.images.poster.url : item.images.thumbnail.url} />
                    <div className="movie-item-content">
                        <div className="movie-item-content-top">
                            <div className="pull-left">
                                <span className="movie-count-time hover-left">{`${item.runtime} phút`}</span>
                            </div>
                            <div className="pull-right">
                                <div className="movie-ratting">
                                   <a href="#" ><span className="fa fa-star" />{`${item.avg_rate} /5`}</a>
                                </div>
                            </div>
                        </div>
                        <div className="movie-item-content-center">
                            <Link to={`/phim/${item.slug}/${item.id}`} className="flat-icons" title="Xem ngay"><span className="flaticon-play-button" /></Link>
                        </div>
                        <div className="movie-item-content-buttom">
                            <div className="movie-item-title">
                               <Link to={`/phim/${item.slug}/${item.id}`} >{item.name}</Link>
                            </div>
                            <div className="item-cat">
                                <ul>
                                    <li><span>Danh mục : </span><span>{item.cat_name}</span></li>
                                </ul>
                                <div className="item-cat-hover">
                                    <ul>
                                        <li><span>Ngày phát hành : </span><span>{item.release_date ? custom_date(item.release_date) : 'Đang cập nhật ..'}</span></li>
                                        <li><span>Thể loại : </span><span>{this._renderGenre(item.genre)}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="movie-item-beta">
                                <div className="movie-details">
                                    <Link to={`/phim/${item.slug}/${item.id}`}  className="btn btn-button button-detals blck-bg">Chi tiết</Link>
                                </div>
                                {/* <div className="view-movie">
                                    <a href=""  className="blck-bg" >15k lượt xem</a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        ) || <div/>
    }
}

export default SlideItem;