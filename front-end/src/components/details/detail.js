import React from 'react';
import { Link } from 'react-router-dom';
import Player from '../video/player';
import VideoPlayer from '../video/videoplayer';
import '../../assets/vendors/video-react/video-react.css';
// import parseFB from "../helpers";
import SliderScroll from "../sliders/SliderScroll";
import FacebookProvider, { Comments } from 'react-facebook';
import { custom_date } from "../helpers";
import { MovieAction, LoadingAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import config from "../../config";

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            id: '',
            slug: '',
            episode: 1,
            hot_series_movies: [],
            hot_retail_movies: [],
            link_play: [],
        }
    }
    async componentDidMount() {
        let { id, slug } = this.props.match.params;
        await this.setState({ id: id, slug: slug });
        this._get_link_play(this.props);
        if (!this.props[MovieAction.ACTION_GET_DETAIL_MOVIE] || (this.props[MovieAction.ACTION_GET_DETAIL_MOVIE] && !this.props[MovieAction.ACTION_GET_DETAIL_MOVIE][id])) {
            let data = await this.props.get_detail_movie(id, slug);
            this.setState({ data: data.payload.data.info });
            await this.props.set_loading(false);
        } else {
            let data = this.props[MovieAction.ACTION_GET_DETAIL_MOVIE][id];
            this.setState({ data: data.info });
            await this.props.set_loading(false);
        }

        this._get_hot_series_movies(this.props);
        this._get_hot_retail_movies(this.props);

    }
    componentWillMount() {

    }
    render() {
        let { data, hot_series_movies, hot_retail_movies, link_play } = this.state;

        return data !== '' && (
            <React.Fragment>
                <div className="breadcrumbs">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link to="/"><span className="fa fa-home" /> Trang chủ</Link></li>
                            <li><Link to={`/${data.cat_slug}`}>{data.cat_name}</Link></li>
                            {data.genre && data.genre.length > 0 &&
                                <li><Link to={data.genre[0].gen_slug}>{data.genre[0].gen_name}</Link></li>
                            }
                            <li><Link to={`/phim/${data.id}/${data.slug}`}>{data.name}</Link></li>
                            <li>Xem phim</li>
                        </ul>
                    </div>
                </div>

                <div className="inner-page details-page">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="details-page">
                                    <div className="details-player" style={{ marginTop: '2em' }}>
                                        <VideoPlayer data={link_play} thumbnail={data.images.poster.url} />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9 col-md-9">
                                <div className="details-dectiontion">
                                    <h2 className="title">Nội Dung Phim</h2>
                                    <div dangerouslySetInnerHTML={{ __html: data.long_des }} />
                                </div>
                                <div className="comment-area">
                                    <h2 className="title">Bình Luận</h2>
                                    <FacebookProvider appId="361492804618262">
                                        <Comments href={`${config.domain.fe}/${data.id}/${data.slug}`}>
                                            {/* <a className="socila-tw"><i className="fa fa-facebook" /></a> */}
                                        </Comments>
                                    </FacebookProvider>

                                    {/* <div className="fb-comments" data-href={`${config.domain.fe}/${data.id}/${data.slug}`} data-numposts="5" data-colorscheme="dark" data-width="100%"></div> */}
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-3 hidden-xs">
                                <SliderScroll title="Phim Lẻ Hot" data={hot_retail_movies} />
                                <SliderScroll title="Phim Bộ Hot" data={hot_series_movies} />
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        ) || <div />
    }
    _get_hot_series_movies = async (props) => {
        if (!props[MovieAction.ACTION_GET_HOT_SERIES_MOVIES]) {
            await props.get_hot_series_movies().then((res) => {
                let r = res.payload.data;
                this.setState({ hot_series_movies: r.info.data });
            });
        } else {
            let data = props[MovieAction.ACTION_GET_HOT_SERIES_MOVIES].info.data;
            this.setState({ hot_series_movies: data });
        }
    }
    _get_hot_retail_movies = async (props) => {
        if (!props[MovieAction.ACTION_GET_HOT_RETAIL_MOVIES]) {
            await props.get_hot_retail_movies().then((res) => {
                let r = res.payload.data;
                this.setState({ hot_retail_movies: r.info.data });
            });
        } else {
            let data = props[MovieAction.ACTION_GET_HOT_RETAIL_MOVIES].info.data;
            this.setState({ hot_retail_movies: data });
        }
    }
    _get_link_play = async (props) => {
        let { id, episode } = this.state;
        if (!props[MovieAction.ACTION_GET_LINKPLAY_MOVIE] ||
            (props[MovieAction.ACTION_GET_LINKPLAY_MOVIE] && !props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id]) ||
            (props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id] && !props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode])) {
            await props.get_linkplay_movie(id, episode).then((res) => {
                let r = res.payload.data;
                this.setState({ link_play: r.info.sources });
            });
        } else {
            let data = props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode].info.sources;
            this.setState({ link_play: data });
        }
    }
}

const mapStateToProps = ({ movie_results, loading_results }) => {
    return Object.assign({}, movie_results, loading_results || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        get_detail_movie: MovieAction.get_detail_movie,
        get_linkplay_movie: MovieAction.get_linkplay_movie,
        get_hot_retail_movies: MovieAction.get_hot_retail_movies,
        get_hot_series_movies: MovieAction.get_hot_series_movies,
        set_loading: LoadingAction.set_loading,

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
