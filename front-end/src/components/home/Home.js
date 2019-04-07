import React from "react";
import SliderBanner from "../Sliders/SliderBanner";
import Slider from "../Sliders/Slider";
import SliderBig from "../Sliders/SliderBig";
import { getMovie } from "../helpers";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { MovieAction, LoadingAction, ServerAction } from "../../actions";
// import config from "../../config";
import CreateHelmetTag from "../metaseo";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banner_movies: [],
            recommend_movies:[],
            hot_movies: [],
            hot_series_movies: [],
            hot_retail_movies: [],
            

        };

    }
    componentDidMount() {
        Promise.all([
            getMovie(this,this.props,'banner_movies',MovieAction),
            getMovie(this,this.props,'hot_movies',MovieAction),
        ]).then(() => {            
            this.props.set_loading(false);
        }).catch(() => {
            this.props.set_loading(false);
        });
        getMovie(this,this.props,'recommend_movies',MovieAction);
        getMovie(this,this.props,'hot_series_movies',MovieAction);
        getMovie(this,this.props,'hot_retail_movies',MovieAction);
    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
        let { hot_movies, hot_series_movies, hot_retail_movies, banner_movies , recommend_movies } = this._getDataRender();
        
        return (
            <React.Fragment>
                <CreateHelmetTag
                    page="home"
                />
                <SliderBanner data={banner_movies} />
                {recommend_movies.length > 0 &&
                    <section className="top-rating pt-75">
                        <div className="haddings">
                            <div className="container">
                                <div className="hadding-area">
                                    <h2>Đề xuất cho bạn</h2>
                                    <p>Những bộ phim có thể bạn sẽ thích</p>
                                </div>
                            </div>
                        </div>

                        <div className="Top-rating-items pt-50">
                            <div className="container">
                                <div className="row">
                                    <Slider data={recommend_movies} />
                                </div>
                            </div>
                        </div>
                    </section>
                }
                {hot_movies.length > 0 &&
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
                                    <Slider data={hot_movies} />
                                </div>
                            </div>
                        </div>
                    </section>
                }
                {hot_series_movies.length > 0 &&
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
                            <SliderBig title="Phim Bộ Hot" data={hot_series_movies} />
                        </div>
                    </section>
                }
                {hot_retail_movies.length > 0 &&
                    <section className="new-movie pt-75">
                        <div className="haddings">
                            <div className="container">
                                <div className="hadding-area">
                                    <h2>Phim Lẻ Hot</h2>
                                    <p>Phim lẻ được xem nhiều nhất</p>
                                </div>
                            </div>
                        </div>
                        <div className="new-movie-inner pt-50">
                            <SliderBig title="Phim Lẻ Hot" data={hot_retail_movies} />
                        </div>
                    </section>
                }

                {/* <section className="top-rating pt-75 ">
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
                                <Slider data={hot_retail_movies} />
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* <section className="category-movie pt-75">
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
                </section> */}



            </React.Fragment>
        )
    }
    _getDataRender = () => {
        let { hot_movies, hot_series_movies, hot_retail_movies, banner_movies ,recommend_movies} = this.state;
        
        if(banner_movies.length == 0 && this.props[MovieAction.ACTION_GET_BANNER_MOVIES]){
            banner_movies = this.props[MovieAction.ACTION_GET_BANNER_MOVIES].data;
        }
        if(hot_series_movies.length == 0 && this.props[MovieAction.ACTION_GET_HOT_SERIES_MOVIES]){
            hot_series_movies = this.props[MovieAction.ACTION_GET_HOT_SERIES_MOVIES].data;
        }
        if(hot_retail_movies.length == 0 && this.props[MovieAction.ACTION_GET_HOT_RETAIL_MOVIES]){
            hot_retail_movies = this.props[MovieAction.ACTION_GET_HOT_RETAIL_MOVIES].data;
        }
        if(hot_movies.length == 0 && this.props[MovieAction.ACTION_GET_HOT_MOVIES]){
            hot_movies = this.props[MovieAction.ACTION_GET_HOT_MOVIES].data;
        }
        
        return { hot_movies, hot_series_movies, hot_retail_movies, banner_movies ,recommend_movies};
    }
    _getRecommendMovies = async () => {

    }
    _getHotMovies = async (props) => {
        if (!props[MovieAction.ACTION_GET_HOT_MOVIES]) {
            await props.get_hot_movies().then((res) => {
                let r = res.payload.data;
                this.setState({ hot_movies: r.data });
            });
        } else {
            let data = props[MovieAction.ACTION_GET_HOT_MOVIES].data;
            this.setState({ hot_movies: data });
        }
    }
    _getHotSeriesMovies = async (props) => {
        if (!props[MovieAction.ACTION_GET_HOT_SERIES_MOVIES]) {
            await props.get_hot_series_movies().then((res) => {
                let r = res.payload.data;
                this.setState({ hot_series_movies: r.data });
            });
        } else {
            let data = props[MovieAction.ACTION_GET_HOT_SERIES_MOVIES].data;
            this.setState({ hot_series_movies: data });
        }
    }
    _getHotRetailMovies = async (props) => {
        if (!props[MovieAction.ACTION_GET_HOT_RETAIL_MOVIES]) {
            await props.get_hot_retail_movies().then((res) => {
                let r = res.payload.data;
                this.setState({ hot_retail_movies: r.data });
            });
        } else {
            let data = props[MovieAction.ACTION_GET_HOT_RETAIL_MOVIES].data;
            this.setState({ hot_retail_movies: data });
        }
    }

    _getBannerMovies = async (props) => {
        if (!props[MovieAction.ACTION_GET_BANNER_MOVIES]) {
            await props.get_banner_movies().then((res) => {
                let r = res.payload.data;
                this.setState({ banner_movies: r.data });
            });
        } else {
            let data = props[MovieAction.ACTION_GET_BANNER_MOVIES].data;
            this.setState({ banner_movies: data });
        }
    }
}

Home.serverFetch = ServerAction.init_data_home;

function mapStateToProps({ movie_results, loading_results }) {
    return Object.assign({}, movie_results, loading_results || {});
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        get_hot_movies: MovieAction.get_hot_movies,
        get_hot_retail_movies: MovieAction.get_hot_retail_movies,
        get_hot_series_movies: MovieAction.get_hot_series_movies,
        get_banner_movies: MovieAction.get_banner_movies,
        get_recommend_movies: MovieAction.get_recommend_movies,
        set_loading: LoadingAction.set_loading,

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
