import React from 'react';
import { Link } from 'react-router-dom';
import PlayerMovie from '../video/Videoplayer';
// import '../../assets/vendors/video-react/video-react.css';
import ScrollRight from "../others/ScrollRight";
import { MovieAction, LoadingAction, UserAction, ServerAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter,generatePath } from 'react-router';
import config from "../../config";
import Comment from "../comment";
import CreateHelmetTag from "../metaseo";

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            id: '',
            slug: '',
            episode: 1,
            link_play: [],
        }
        this._getCurrentTimeOnEpisode = this._getCurrentTimeOnEpisode.bind(this);
        this._renderLinkEpisode = this._renderLinkEpisode.bind(this);
    }
    async componentDidMount() {
        let { id, slug , episode } = this.props.match.params;
        if(typeof episode == 'undefined' || parseInt(episode) < 1 ) {
            episode = 1;
        }
        await this.setState({ id: id, slug: slug,episode:episode });

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

    }
    static getDerivedStateFromProps(props, state){
        let {id,episode,slug} = props.match.params;
        if(id != state.id || (typeof episode != 'undefined' && parseInt(episode) > 0 && id == state.id && episode != state.episode )){
            return {id:id,episode:episode,slug:slug}
            // await this.setState();
            // this._getLinkPlay(props);
        }
        return null;
        
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log(this.state);
        // console.log(prevState);
        
        if(prevState.episode != this.state.episode){
            this._getLinkPlay(this.props);
        }
        
      }

    render() {
        let { data, link_play, id, url } = this._getDataRender();
        let currentTime = this._getCurrentTimeOnEpisode();

        return data !== '' && (
            <React.Fragment>
                <CreateHelmetTag
                    page="detail"
                    data={data}
                    url={url}
                />
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
                                        <PlayerMovie data={link_play} thumbnail={data.images.poster.url} onUpdateUserEndTime={this._updateUserEndTime.bind(this)} currentTime={currentTime} />
                                    </div>

                                </div>
                            </div>
                            {data.epi_num && data.epi_num > 1 &&
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="btn-toolbar episode" role="toolbar" >
                                        <div className="btn-group" role="group" aria-label="First group">
                                            {this._renderLinkEpisode(data)}
                                        </div>
                                    </div>


                                </div>
                            }
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
                                <ScrollRight />
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        ) || <div />
    }
    _renderLinkEpisode = (data) => {
        let {episode} = this.state;
        let links = [];
        for (let i = 1; i <= data.epi_num; i++) {
            let path = generatePath(config.path.detail_episode,{ id: data.id,slug:data.slug,episode:`${i}` });
            links.push(<Link to={path} key={i} className={`btn btn-default ${episode == i ? 'active' : ''}`}>{i}</Link>);
            
        }
        return links;
    }
    _getDataRender = () => {
        let { url } = this.props.match;
        let { id, slug } = this.props.match.params;
        let { data, link_play } = this.state;
        if (data.length == 0 && this.props[MovieAction.ACTION_GET_DETAIL_MOVIE] && this.props[MovieAction.ACTION_GET_DETAIL_MOVIE][id]) {
            data = this.props[MovieAction.ACTION_GET_DETAIL_MOVIE][id];
        }
        return { data, id, url, link_play };
    }

    _updateUserEndTime = async (timestamp) => {
        let loginStatus = this.props[UserAction.ACTION_GET_STATUS_LOGIN];
        let { id, episode } = this.state;
        let videoinfo = this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode];

        if (loginStatus && loginStatus.isLogged && videoinfo && videoinfo.episode_id) {

            this.props.user_end_time_episode(videoinfo.episode_id, timestamp);
        } else if (typeof window.localStorage !== undefined && videoinfo && videoinfo.episode_id) {
            let endtime = window.localStorage.getItem('endtimeepisode');
            if (!endtime) endtime = {};
            else endtime = JSON.parse(endtime);
            endtime[videoinfo.episode_id] = timestamp;
            window.localStorage.setItem('endtimeepisode', JSON.stringify(endtime));
        }


    }

    _getCurrentTimeOnEpisode = () => {
        let { id, episode } = this.state;
        if (id == '' || episode == '' || !this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE] || !this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id] || !this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode]) return 0;

        let videoinfo = this.props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode];
        let currentTime = 0;
        if (typeof window.localStorage !== undefined) {
            let endtime = window.localStorage.getItem('endtimeepisode');
            if (!endtime) endtime = {};
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
        props.get_linkplay_movie(id, episode).then((res) => {
            let r = res.payload.data;
            this.setState({ link_play: r.sources });
        });
        // } else {
        //     let data = props[MovieAction.ACTION_GET_LINKPLAY_MOVIE][id][episode].sources;
        //     this.setState({ link_play: data });
        // }
    }
}
Detail.serverFetch = ServerAction.init_data_page_detail;

const mapStateToProps = ({ movie_results, loading_results, user_results }) => {
    return Object.assign({}, movie_results, loading_results, user_results || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        get_detail_movie: MovieAction.get_detail_movie,
        get_linkplay_movie: MovieAction.get_linkplay_movie,
        user_end_time_episode: UserAction.user_end_time_episode,
        set_loading: LoadingAction.set_loading,

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
