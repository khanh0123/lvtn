import React from "react";
import SliderBanner from "../sliders/SliderBanner";
import Slider from "../sliders/Slider";
import SliderBig from "../sliders/SliderBig";
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
        //console.log("Did mount");
        if (!this.props[MovieAction.ACTION_GET_HOME_MOVIES]) {
            this.props.get_home_movies().then((res) => {
                let r = res.payload.data;
                let {banner_movies,recommend_movies,hot_movies,hot_series_movies,hot_retail_movies} = r;
                this.setState({banner_movies,recommend_movies,hot_movies,hot_series_movies,hot_retail_movies});               
                this.props.set_loading(false);
            });
        } else  {
            let {banner_movies,recommend_movies,hot_movies,hot_series_movies,hot_retail_movies} = this.props[MovieAction.ACTION_GET_HOME_MOVIES];
            this.setState({banner_movies,recommend_movies,hot_movies,hot_series_movies,hot_retail_movies});
            this.props.set_loading(false);
        }
        // Promise.all([

        //     // getMovie(this,this.props,'home_movies',MovieAction),
        //     // getMovie(this,this.props,'hot_movies',MovieAction),
        //     // getMovie(this,this.props,'recommend_movies',MovieAction),
        // ]).then(() => {            
        //     this.props.set_loading(false);
        // }).catch(() => {
        //     this.props.set_loading(false);
        // });
        
        // getMovie(this,this.props,'hot_series_movies',MovieAction);
        // getMovie(this,this.props,'hot_retail_movies',MovieAction);
    }
    // componentWillReceiveProps(nextProps) {
    //     //console.log("recevice prop");
    // }
    componentWillUnmount(){
        this.setState({
            banner_movies: [],
            recommend_movies:[],
            hot_movies: [],
            hot_series_movies: [],
            hot_retail_movies: [],
        })
    }
    shouldComponentUpdate(nextProps){
        return nextProps[MovieAction.ACTION_GET_HOME_MOVIES] != this.props[MovieAction.ACTION_GET_HOME_MOVIES];
    }
    render() {
        //console.log("render");
        let { hot_movies, hot_series_movies, hot_retail_movies, banner_movies , recommend_movies } = this._getDataRender();
        
        return (
            <React.Fragment>
                <CreateHelmetTag
                    page="home"
                />
                {banner_movies.length > 0 && <SliderBanner data={banner_movies} />}
                
                {recommend_movies && recommend_movies.length > 0 &&
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
                {hot_movies && hot_movies.length > 0 &&
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
        
        if(banner_movies.length == 0 && this.props[MovieAction.ACTION_GET_HOME_MOVIES]){
            banner_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].banner_movies;
        }
        if(recommend_movies.length == 0 && this.props[MovieAction.ACTION_GET_HOME_MOVIES]){
            recommend_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].recommend_movies;
        }
        if(hot_series_movies.length == 0 && this.props[MovieAction.ACTION_GET_HOME_MOVIES]){
            hot_series_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].hot_series_movies;
        }
        if(hot_retail_movies.length == 0 && this.props[MovieAction.ACTION_GET_HOME_MOVIES]){
            hot_retail_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].hot_retail_movies;
        }
        if(hot_movies.length == 0 && this.props[MovieAction.ACTION_GET_HOME_MOVIES]){
            hot_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].hot_movies;
        }
        
        return { hot_movies, hot_series_movies, hot_retail_movies, banner_movies ,recommend_movies};
    }
}

Home.serverFetch = ServerAction.init_data_home;

function mapStateToProps({ movie_results, loading_results }) {
    return Object.assign({}, movie_results, loading_results || {});
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        get_home_movies: MovieAction.get_home_movies,
        set_loading: LoadingAction.set_loading,

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
