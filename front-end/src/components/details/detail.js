import React from 'react';
import { Link } from 'react-router-dom';
import Player from '../video/player';
import VideoPlayer from '../video/videoplayer';
import '../../assets/vendors/video-react/video-react.css';
// import parseFB from "../helpers";
import SliderScroll from "../sliders/SliderScroll";
import FacebookProvider, { Comments } from 'react-facebook';

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }
    componentDidMount() {
        // parseFB();

    }
    componentWillMount() {

    }
    render() {
        return (
            <React.Fragment>
                <div className="breadcrumbs">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link to="/"><span className="fa fa-home" /> Trang chủ</Link></li>
                            <li><Link to="/tu-khoa/phim-bo">Phim Bộ</Link></li>
                            <li><Link to="/tu-khoa/phim-hanh-dong">Phim Hành Động</Link></li>
                            <li><Link to="/phim/tham-tu-ma-123">Thám Tử Ma</Link></li>
                            <li>Xem Phim</li>
                        </ul>
                    </div>
                </div>

                <div className="inner-page details-page">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="details-page">
                                    <div className="details-player" style={{ marginTop: '2em' }}>
                                        {/* <Player /> */}
                                        <VideoPlayer />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9 col-md-9">
                                <div className="details-dectiontion">
                                    <h2 className="title">Nội Dung Phim</h2>
                                    <p>Phim How It Ends xoay quanh một thảm hoạ kinh hoàng biến nhiều con đường thành địa ngục khi một người cha trẻ đang trên đường quay về nhà với người vợ mang thai ở phía kia đất nước.</p>
                                </div>
                                <div className="comment-area">
                                    <h2 className="title">Bình Luận</h2>
                                    <div className="fb-comments" data-href="http://www.phimmoi.net/phim/nguoi-kien-va-chien-binh-ong-6938/" data-numposts="5" data-colorscheme="dark" data-width="100%"></div>
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-3 hidden-xs">
                                <SliderScroll title="Trailer Phim Mới" />
                                <SliderScroll title="Phim Bộ Hot" />
                                <SliderScroll title="Phim Lẻ Hot" />
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Detail;