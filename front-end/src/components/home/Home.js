import React from "react";
import SliderBanner from "../sliders/SliderBanner";
import Slider from "../sliders/Slider";
import SliderBig from "../sliders/SliderBig";
// import { getMovie } from "../helpers";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MovieAction, LoadingAction, ServerAction } from "../../actions";
// import config from "../../config";
import Loading from "../others/Loading";
import CreateHelmetTag from "../metaseo";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banner_movies: [],
            recommend_movies: [],
            hot_movies: [],
            hot_series_movies: [],
            hot_retail_movies: [],
            status_loading: {
                recommend_movies: false,
                hot_movies: true,
                hot_series_movies: true,
                hot_retail_movies: true,
            }
        };

    }
    componentWillMount(){        
        console.log(window.location);
        
        if(typeof window == "undefined" || typeof window.location == "undefined"){
            console.log("hello");
            
            this.setState({
                status_loading: {
                    recommend_movies: false,
                    hot_movies: false,
                    hot_series_movies: false,
                    hot_retail_movies: false,
                }
            })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this._listenToScroll)
    }
    componentDidMount() {
        //console.log("Did mount");
        if (!this.props[MovieAction.ACTION_GET_HOME_MOVIES]) {
            this.props.get_home_movies().then((res) => {
                let r = res.payload.data;
                let { banner_movies, recommend_movies, hot_movies, hot_series_movies, hot_retail_movies } = r;
                this.setState({ banner_movies, recommend_movies, hot_movies, hot_series_movies, hot_retail_movies });
                this.props.set_loading(false);
            });
        } else {
            let { banner_movies, recommend_movies, hot_movies, hot_series_movies, hot_retail_movies } = this.props[MovieAction.ACTION_GET_HOME_MOVIES];
            this.setState({ banner_movies, recommend_movies, hot_movies, hot_series_movies, hot_retail_movies });
            this.props.set_loading(false);
        }

        window.addEventListener('scroll', this._listenToScroll)
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
    //     console.log("recevice prop");
    // }
    shouldComponentUpdate(nextProps, nextState) {
        let { banner_movies } = this._getDataRender();
        if (banner_movies.length > 0) {
            return true;
        }
        return false
    }
    render() {
        // console.log("render");
        let { hot_movies, hot_series_movies, hot_retail_movies, banner_movies, recommend_movies } = this._getDataRender();
        console.log(this.state.status_loading);
        
        return (
            <React.Fragment>
                <CreateHelmetTag
                    page="home"
                />
                {banner_movies.length > 0 &&
                    <SliderBanner data={banner_movies} />
                    ||
                    <Loading type="2" />
                }

                <React.Fragment>

                    <section className="top-rating pt-75 recommend-movies-area">
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
                                {this.state.status_loading.recommend_movies
                                    &&
                                    <Loading type="2" />
                                    || recommend_movies.length > 0 && 
                                    <Slider data={recommend_movies} />
                                }
                                </div>
                            </div>
                        </div>
                    </section>


                </React.Fragment>



                <section className="top-rating pt-75 hot-movies-area" >
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
                                {this.state.status_loading.hot_movies
                                    &&
                                    <Loading type="2" />
                                    || hot_movies.length > 0 && 
                                    <Slider data={hot_movies} />
                                }
                            </div>
                        </div>
                    </div>
                </section>


                <section className="new-movie pt-75 hot-seriesmovies-area">
                    <div className="haddings">
                        <div className="container">
                            <div className="hadding-area">
                                <h2>Phim Bộ Hot</h2>
                                <p>Phim bộ được xem nhiều nhất</p>
                            </div>
                        </div>
                    </div>
                    <div className="new-movie-inner pt-50">
                        {this.state.status_loading.hot_series_movies
                            &&
                            <Loading type="2" />
                            || hot_series_movies.length > 0 &&
                            <SliderBig title="Phim Bộ Hot" data={hot_series_movies} />
                        }

                    </div>
                </section>
                
                <section className="new-movie pt-75 hot-retailmovies-area">
                    <div className="haddings">
                        <div className="container">
                            <div className="hadding-area">
                                <h2>Phim Lẻ Hot</h2>
                                <p>Phim lẻ được xem nhiều nhất</p>
                            </div>
                        </div>
                    </div>
                    <div className="new-movie-inner pt-50">
                        {this.state.status_loading.hot_retail_movies
                            &&
                            <Loading type="2" />
                            || hot_retail_movies.length > 0 
                            &&
                            <SliderBig title="Phim Lẻ Hot" data={hot_retail_movies} />
                        }
                    </div>
                </section>

            </React.Fragment>
        )
    }
    _listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop
        // const height =
        //     document.documentElement.scrollHeight -
        //     document.documentElement.clientHeight
        let recommend_movies = document.querySelector(".recommend-movies-area").offsetTop
        let hot_movies = document.querySelector(".hot-movies-area").offsetTop
        let hot_series_movies = document.querySelector(".hot-seriesmovies-area").offsetTop
        let hot_retail_movies = document.querySelector(".hot-retailmovies-area").offsetTop
        if(winScroll >= recommend_movies-200 && this.state.status_loading.recommend_movies){
            this.setState(prevState => ({
                status_loading: {                   // object that we want to update
                    ...prevState.status_loading,    // keep all other key-value pairs
                    recommend_movies: false       // update the value of specific key
                }
            }))
        }
        if(winScroll >= hot_movies-200 && this.state.status_loading.hot_movies){
            this.setState(prevState => ({
                status_loading: {                   // object that we want to update
                    ...prevState.status_loading,    // keep all other key-value pairs
                    hot_movies: false       // update the value of specific key
                }
            }))
        }
        if(winScroll >= hot_series_movies-200 && this.state.status_loading.hot_series_movies){
            this.setState(prevState => ({
                status_loading: {                   // object that we want to update
                    ...prevState.status_loading,    // keep all other key-value pairs
                    hot_series_movies: false       // update the value of specific key
                }
            }))
        }
        if(winScroll >= hot_retail_movies-200 && this.state.status_loading.hot_retail_movies){
            this.setState(prevState => ({
                status_loading: {                   // object that we want to update
                    ...prevState.status_loading,    // keep all other key-value pairs
                    hot_retail_movies: false       // update the value of specific key
                }
            }))
        }
 
        


    }
    _getDataRender = () => {
        let { hot_movies, hot_series_movies, hot_retail_movies, banner_movies, recommend_movies } = this.state;

        if (banner_movies.length == 0 && this.props[MovieAction.ACTION_GET_HOME_MOVIES]) {
            hot_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].hot_movies;
            hot_series_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].hot_series_movies;
            hot_retail_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].hot_retail_movies;
            banner_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].banner_movies;
            recommend_movies = this.props[MovieAction.ACTION_GET_HOME_MOVIES].recommend_movies;
        }

        return { hot_movies, hot_series_movies, hot_retail_movies, banner_movies, recommend_movies };
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
