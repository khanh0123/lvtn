import React from "react";
import { Link } from "react-router-dom";
import { custom_date } from "../helpers";
import config from "../../config";
import LazyLoad from 'react-lazy-load';

class SliderScroll extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let { title, data } = this.props;
        return (

            <div className="movie-item-playlist">
                {title &&
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
                }
                <div className="movie-item-playlist-items scroll-up ">
                    <div className="item">
                        {data && data.length > 0 && data.map((item, i) => {

                            return (
                                <div className="plylist-single" key={i}>
                                    <div className="plylist-img">
                                        <LazyLoad

                                            debounce={false}
                                            offsetVertical={1000}
                                        >
                                            <img src={item.images.thumbnail ? item.images.thumbnail.url : item.images.poster.url} alt={item.name} onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = config.images.empty_thumbnail
                                            }} />
                                        </LazyLoad>

                                    </div>
                                    <div className="plylist-single-content">
                                        <Link to={`/phim/${item.id}/${item.slug}`} >{item.name}</Link>
                                        <div className="view-movi">
                                            <a href="#" aria-label="link">{item.cat_name}</a>
                                        </div>
                                        <ul>
                                            <li className="novie-upload-time"><a href="#" aria-label="link">{item.release_date ? custom_date(item.release_date) : 'Đang cập nhật ..'}</a></li>
                                            <li className="movie-time"><a href="#" aria-label="link">{`${item.runtime} phút`}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        )
    }
}

export default SliderScroll;