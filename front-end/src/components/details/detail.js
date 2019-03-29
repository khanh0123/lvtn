import React from 'react';
import { Link } from 'react-router-dom';
import PlayerMovie from '../video/videoplayer';
import '../../assets/vendors/video-react/video-react.css';
import SliderScroll from "../sliders/SliderScroll";
import { getMovie } from "../helpers";
import { MovieAction, LoadingAction ,UserAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import config from "../../config";
import Comment from "../comment";
import { stringify } from 'querystring';

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
        this._getCurrentTimeOnEpisode = this._getCurrentTimeOnEpisode.bind(this);
    }
    async componentDidMount() {
        let { id, slug } = this.props.match.params;
        await this.setState({ id: id, slug: slug });
        
        if (!this.props[MovieAction.ACTION_GET_DETAIL_MOVIE] || (this.props[MovieAction.ACTION_GET_DETAIL_MOVIE] && !this.props[MovieAction.ACTION_GET_DETAIL_MOVIE][id])) {
            try {
                let res = await this.props.get_detail_movie(id, slug);
                this.setState({ data: res.payload.data });
                this.props.set_loading(false);
            } catch (error) {
                this.props.set_loading(false);
            }
        } else {
            let data = this.props[MovieAction.ACTION_GET_DETAIL_MOVIE][id];
            this.setState({ data: data });
            this.props.set_loading(false);
        }

        this._getLinkPlay(this.props);

        getMovie(this,this.props,'hot_series_movies',MovieAction);
        getMovie(this,this.props,'hot_retail_movies',MovieAction);

    }
    componentWillMount() {

    }
    render() {
        let { data, hot_series_movies, hot_retail_movies, link_play,id,episode } = this.state;
        let  currentTime  =  this._getCurrentTimeOnEpisode();
        
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
                                        <PlayerMovie data={link_play} thumbnail={data.images.poster.url} onUpdateUserEndTime={this._updateUserEndTime.bind(this)} currentTime={currentTime}/>
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
                                {id && <Comment mov_id={id} />}

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

    _updateUserEndTime = async (timestamp) => {
        let loginStatus = this.props[UserAction.ACTION_GET_STATUS_LOGIN];
        let { id, episode } = this.state;
        let videoinfo = this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode];
        
        if(loginStatus && loginStatus.isLogged && videoinfo && videoinfo.episode_id){
            
            this.props.user_end_time_episode(videoinfo.episode_id,timestamp);
        } else if(typeof window.localStorage !== undefined  && videoinfo && videoinfo.episode_id ) {
            let endtime = window.localStorage.getItem('endtimeepisode');
            if(!endtime) endtime = {};
            else endtime = JSON.parse(endtime);
            endtime[videoinfo.episode_id] = timestamp;
            window.localStorage.setItem('endtimeepisode', JSON.stringify(endtime));
        }
        

    }

    _getCurrentTimeOnEpisode = () => {
        let { id, episode } = this.state;
        if(id == '' || episode == ''|| !this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE] || !this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id] || !this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode]) return 0;
        
        let videoinfo = this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode];
        let currentTime = 0;
        if(typeof window.localStorage !== undefined){
            let endtime = window.localStorage.getItem('endtimeepisode');
            if(!endtime) endtime = {};
            else endtime = JSON.parse(endtime);
            currentTime = endtime[videoinfo.episode_id] ? endtime[videoinfo.episode_id] : 0;
        }
        currentTime = currentTime == 0 ? ((this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE] && this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id] && this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode]) ? this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode].time_current : 0) : currentTime;

        return currentTime
    }
    _getLinkPlay = async (props) => {
        let { id, episode } = this.state;
        // if (!props[MovieAction.ACTION_GET_LINKPLAY_MOVIE] ||
        //     (props[MovieAction.ACTION_GET_LINKPLAY_MOVIE] && !props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id]) ||
        //     (props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id] && !props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode])) {
            await props.get_linkplay_movie(id, episode).then((res) => {
                let r = res.payload.data;
                this.setState({ link_play: r.sources });
            });
        // } else {
        //     let data = props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode].sources;
        //     this.setState({ link_play: data });
        // }
    }
}

const mapStateToProps = ({ movie_results, loading_results,user_results }) => {
    return Object.assign({}, movie_results, loading_results, user_results || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        get_detail_movie: MovieAction.get_detail_movie,
        get_linkplay_movie: MovieAction.get_linkplay_movie,
        get_hot_retail_movies: MovieAction.get_hot_retail_movies,
        get_hot_series_movies: MovieAction.get_hot_series_movies,
        user_end_time_episode: UserAction.user_end_time_episode,
        set_loading: LoadingAction.set_loading,

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
