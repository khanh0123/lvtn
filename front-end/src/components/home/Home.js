import React from "react";
import SliderBanner from "../Sliders/SliderBanner";
import Slider from "../Sliders/Slider";
import Slider2 from "../Sliders/Slider2";
import SliderBig from "../Sliders/SliderBig";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends React.Component {
    render() {
        return (
            <div>
                <SliderBanner />
                <section className="top-rating pt-75">
                    <div className="haddings">
                        <div className="container">
                            <div className="hadding-area">
                                <h2>Phim Nổi Bật</h2>
                                <p>Những bộ phim hot nhất hiện nay</p>
                            </div>
                        </div>
                    </div>

                    <div className="Top-rating-items pt-50">
                        <div className="container">
                            <div className="row">
                                <Slider />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="new-movie pt-75">
                    <div className="haddings">
                        <div className="container">
                            <div className="hadding-area">
                                <h2>Phim Bộ Hot</h2>
                                <p>Phim bộ được xem nhiều nhất</p>
                            </div>
                        </div>
                    </div>
                    <div className="new-movie-inner pt-50">
                        <SliderBig title="Phim Bộ Hot"/>
                    </div>
                </section>

                <section className="top-rating pt-75 ">
                    <div className="haddings">
                        <div className="container">
                            <div className="hadding-area">
                                <h2>Phim Lẻ Hot</h2>
                                <p>Những bộ phim lẻ hot nhất</p>
                            </div>
                        </div>
                    </div>

                    <div className="Top-rating-items pt-50">
                        <div className="container">
                            <div className="row">
                                <Slider />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="category-movie pt-75">
                    <div className="haddings">
                        <div className="container">
                            <div className="hadding-area">
                                <h2>Phim Hot Trong Tháng</h2>
                                <p>Những bộ phim đặc sắc trong tháng này</p>
                            </div>
                        </div>
                    </div>
                    <div className="category-movie-items">
                        <div className="container">
                            <div className="cat-menu">
                                <ul className="nav nav-tabs tab-menu">
                                    <li className="active"><a data-toggle="tab" href="#latestmovie"><span>Phim Lẻ</span></a></li>
                                    <li><a data-toggle="tab" href="#top-rating"><span>Phim Bộ</span></a></li>
                                    <li><a data-toggle="tab" href="#commingsoon"><span>Phim Chiếu Rạp</span></a></li>
                                    <li><a data-toggle="tab" href="#tvseries"><span>Phim Hài</span></a></li>
                                </ul>
                            </div>
                            <div className="category-items">
                                <div className="tab-contents">
                                    <div id="latestmovie" className="tab-pane fade active in" role="tabpanel">
                                        <Slider2 />
                                    </div>
                                    <div id="top-rating" className="tab-pane fade" role="tabpanel">
                                        <Slider2 />
                                    </div>
                                    <div id="commingsoon" className="tab-pane fade" role="tabpanel">
                                        <Slider2 />
                                    </div>
                                    <div id="tvseries" className="tab-pane fade" role="tabpanel">
                                        <Slider2 />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>



            </div>
        )
    }
}

export default Home;