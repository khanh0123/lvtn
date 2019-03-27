import React from 'react';
import { Link } from 'react-router-dom';
import FacebookProvider, { Share } from 'react-facebook';
import Trailer from "../video/trailer";
import SliderScroll from "../sliders/SliderScroll";
import { custom_date } from "../helpers";
import { MovieAction,  LoadingAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import config from "../../config";
import Comment from "../comment";

// import parseFB from "../helpers/common";
class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_open_trailer: false,
            data: '',
            id: '',
            slug: '',
            hot_series_movies: [],
            hot_retail_movies: [],
        }
    }


    async componentDidMount() {
        let { id, slug } = this.props.match.params;
        this.setState({ id: id, slug: slug });
        if (!this.props[MovieAction.ACTION_GET_DETAIL_MOVIE] || (this.props[MovieAction.ACTION_GET_DETAIL_MOVIE] && !this.props[MovieAction.ACTION_GET_DETAIL_MOVIE][id])) {

            try {
                let data = await this.props.get_detail_movie(id, slug);
                this.setState({ data: data.payload.data });
                this.props.set_loading(false);
            } catch (error) {
                this.props.set_loading(false);
            }
        } else {
            let data = this.props[MovieAction.ACTION_GET_DETAIL_MOVIE][id];
            this.setState({ data: data });
            this.props.set_loading(false);
        }

        this._get_hot_series_movies(this.props);
        this._get_hot_retail_movies(this.props);
    }
    async componentWillReceiveProps(nextProps) {
        let { id, slug } = nextProps.match.params;
        if (id !== this.state.id && nextProps !== this.props) {
            await this.setState({ id: id, slug: slug });
            if (!nextProps[MovieAction.ACTION_GET_DETAIL_MOVIE] || (nextProps[MovieAction.ACTION_GET_DETAIL_MOVIE] && !nextProps[MovieAction.ACTION_GET_DETAIL_MOVIE][id])) {

                try {
                    let res = await nextProps.get_detail_movie(id, slug);
                    this.setState({ data: res.payload.data });
                    this.props.set_loading(false);
                } catch (error) {
                    this.props.set_loading(false);
                }
            } else {
                let data = nextProps[MovieAction.ACTION_GET_DETAIL_MOVIE][id];
                this.setState({ data: data });
                nextProps.set_loading(false);
            }
        }



    }


    render() {
        let { data, hot_series_movies, hot_retail_movies,id } = this.state;

        return data !== '' && (
            <React.Fragment>
                <div className="breadcrumbs  hidden-xs">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link to="/"><span className="fa fa-home" /> Trang chủ</Link></li>
                            <li><Link to={`/${data.cat_slug}`}>{data.cat_name}</Link></li>
                            {data.genre && data.genre.length > 0 &&
                                <li><Link to={data.genre[0].gen_slug}>{data.genre[0].gen_name}</Link></li>
                            }

                            <li>{data.name}</li>
                        </ul>
                    </div>
                </div>
                <div className="inner-page">
                    <div className="container">
                        <div className="details-page">
                            <div className="details-big-img ">
                                <img src={data.images.poster ? data.images.poster.url : (data.images.thumbnail ? data.images.thumbnail.url : config.images.empty_thumbnail)} alt={data.name} className="hidden-xs" />
                                <div className="play-icon">
                                    <Link to={`/phim/${data.id}/${data.slug}/xem-phim`} className="flat-icons"><span className="flaticon-play-button" /></Link>
                                </div>
                            </div>
                            <div className="details-contents">
                                <div className="row">
                                    <div className="col-md-offset-1 col-lg-offset-1 col-lg-11 col-md-11 col-sm-12 col-xs-12">
                                        <div className="details-content">
                                            <div className="details-reviews">
                                                <div className="row">
                                                    <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                                        <div className="dec-review-img">
                                                            <img src={data.images.thumbnail ? data.images.thumbnail.url : config.images.empty_thumbnail} alt={data.name} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                                                        <div className="dec-review-dec">
                                                            <div className="details-title">
                                                                <h2>{data.name}</h2>
                                                            </div>
                                                            <div className="ratting">
                                                                {this._render_star(data.avg_rate)}
                                                                <a href="#">{`${data.avg_rate}/5 rating`}</a>
                                                            </div>
                                                            <div className="dec-review-meta">
                                                                <ul>

                                                                    <li><span>Ngày chiếu <label>:</label></span><a href="javascript:void(0)">{data.release_date ? custom_date(data.release_date) : 'Đang cập nhật ..'}</a></li>
                                                                    <li>
                                                                        <span>Thể loại <label>:</label></span>
                                                                        {data.genre.map((dt, i) => {
                                                                            return (i < data.genre.length - 1) ?
                                                                                <Link key={i} to={`/${dt.gen_slug}`}>{`${dt.gen_name},`}</Link>
                                                                                :
                                                                                <Link key={i} to={`/${dt.gen_slug}`}>{`${dt.gen_name}`}</Link>
                                                                        })}

                                                                    </li>
                                                                    <li>
                                                                        <b className="btn btn-danger" onClick={this._action_trailer.bind(this)}>Xem Trailer</b>
                                                                        <Trailer
                                                                            isOpen={this.state.is_open_trailer}
                                                                            onClose={this._action_trailer.bind(this)}
                                                                            source={data.trailer}
                                                                            image={data.images.poster.url}
                                                                        />
                                                                        <Link to={`/phim/${data.id}/${data.slug}/xem-phim`}><b className="btn btn-success">Xem Phim</b></Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="social-links">
                                                                <strong>Chia sẻ :</strong>
                                                                <FacebookProvider appId="361492804618262">
                                                                    <Share href={`${config.domain.fe}/${data.id}/${data.slug}`}>
                                                                        <a className="socila-tw"><i className="fa fa-facebook" /></a>
                                                                    </Share>
                                                                </FacebookProvider>
                                                                <a href="" className="socila-tw"><i className="fa fa-twitter" /></a>
                                                                <a href="" className="socila-sk"><i className="fa fa-skype" /></a>
                                                                <a href="" className="socila-pin"><i className="fa fa-pinterest" /></a>
                                                                <a href="" className="socila-ins"><i className="fa fa-instagram" /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-9 col-md-9">
                                        <div className="details-dectiontion">
                                            <h2 className="title">Nội Dung Phim</h2>
                                            <div dangerouslySetInnerHTML={{ __html: data.short_des }} />
                                        </div>
                                        {id && <Comment mov_id={id} />}
                                    </div>
                                    <div className="col-lg-3 col-md-3 hidden-xs">
                                        <SliderScroll title="Phim Lẻ Hot" data={hot_retail_movies} />
                                        <SliderScroll title="Phim Bộ Hot" data={hot_series_movies} />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>

        ) || <div />
    }
    _action_trailer() {
        this.setState({ is_open_trailer: !this.state.is_open_trailer }, () => {
        });
    }
    _get_hot_series_movies = async (props) => {
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
    _get_hot_retail_movies = async (props) => {
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
    _render_star = (avg) => {
        let result = [];
        for (let i = 1; i <= 5; i++) {
            if (i < avg) {
                result.push(<span className="fa fa-star star" key={i} />)
            } else {
                result.push(<span className="fa fa-star" key={i} />)
            }

        }
        return result;
    }
}
function mapStateToProps({ movie_results, loading_results }) {
    return Object.assign({}, movie_results, loading_results || {});
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        get_detail_movie: MovieAction.get_detail_movie,
        get_hot_retail_movies: MovieAction.get_hot_retail_movies,
        get_hot_series_movies: MovieAction.get_hot_series_movies,
        set_loading: LoadingAction.set_loading,


    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Info));