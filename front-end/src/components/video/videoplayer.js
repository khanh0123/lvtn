import React, { Component } from 'react'
// import Player from "./player2";
// import VideoPlayer from 'react-video-js-player';
import config from '../../config';

class PlayerMovie extends Component {
    constructor(props) {
        super(props);
        this.player = null;
        this.state = {
            sources: [],
            currentTime: 0,

        };
        this._onVideoTimeUpdate = this._onVideoTimeUpdate.bind(this);
        this._onVideoPause = this._onVideoPause.bind(this);
        this._onVideoPlay = this._onVideoPlay.bind(this);
        this._onVideoEnd = this._onVideoEnd.bind(this);
        this._onVideoError = this._onVideoError.bind(this);

        this._trackingUserEndTimeEpisode = this._trackingUserEndTimeEpisode.bind(this);
        this.userEndTimeEpisode = null;

    }

    async componentDidMount() {
        let { data, currentTime } = this.props;
        if (data !== '') {
            data = this._initSource(data);            
            await this.setState({ sources: data, currentTime: currentTime });
        }

        let _linkPlay = this._getLinkFromSources(data);

        // try { if (window.videojs.getPlayers()['player']) delete window.videojs.getPlayers()['player']; } catch (e) { };

        this.player = null;
        // if (_linkPlay && _linkPlay.src != '') {
        //     console.log("1");


        this.player = window.videojs(this.refs.player, {}).ready(() => {

            this.player.src(_linkPlay);
            this.player.currentTime(currentTime);
            this.player.play();
            this.player.on('pause', this._onVideoPause);
            this.player.on('play', this._onVideoPlay);
            this.player.on('error', this._onVideoError);
            this.player.on('timeupdate', this._onVideoTimeUpdate);
            this.player.on('ended', this._onVideoEnd);

        });

        // }




    }
    async componentWillReceiveProps(nextProps) {
        let { data, currentTime } = nextProps;
        if (data !== '') {
            data = this._initSource(data);
            await this.setState({ sources: data, currentTime: currentTime });
            let _linkPlay = this._getLinkFromSources(data);
            
            if (this.player && _linkPlay && _linkPlay.src != '') {
                this.player.src(_linkPlay);
                this.player.currentTime(currentTime);
                this.player.trigger('srcchange');
                this.player.play();
            }
        }



    }
    componentWillUnmount() {

        try {
            this.player.dispose();
            // clearInterval(this.userEndTimeEpisode);
            // console.log("dispose player");

        } catch (e) {
            console.log(e);
        }
    }

    render() {

        return (
            <div className='player-wrapper'>
                <video
                    className="video-js"
                    controls
                    ref="player" style={{ width: "100%" }}>
                </video>
            </div>
        );
    }

    _initSource = (data) => {
        if (data && data.pt && data.pt.length > 0) {
            // data.pt[0]['is_play'] = true;
            for (let i = 0; i < data.pt.length; i++) {
                data.pt[i]['is_play'] = data.pt[i].quality == "720p" ? true : false;
            }
        } 
        if (data && data.hff) {
            let a = "";
            let e = data.hff;
            let t = 69;
            e.toString();
            for (var i = 0; i < e.length; i++) {
                var r = e.charCodeAt(i)
                    , o = r ^ t;
                a += String.fromCharCode(o)
            }
            data.hff = a;
        }
        return data;
    }
    _getLinkFromSources = (s, current) => {
        
        if (s && s.pt) {
            for (let i = 0; i < s.pt.length; i++) {
                if (s.pt[i].is_play) return s.pt[i];
            }
            return s.pt[0];
        } 
        if(s && s.hff){
            return {
                src:s.hff,
                type:"application/x-mpegURL",
                quality:"",
            };
        }
        return null;
    }
    _onPlayerReady = (player) => {
        console.log("Player is ready: ", player);
        // this.player = player;
    }

    _onVideoPlay = () => {
        if (this.userEndTimeEpisode !== null) return;
        this.userEndTimeEpisode = setInterval(() => {
            this._trackingUserEndTimeEpisode()
            console.log("tracking");

        }, config.time.user_end_time);
    }

    _onVideoPause = (duration) => {
        clearInterval(this.userEndTimeEpisode);
        this.userEndTimeEpisode = null;
    }

    _onVideoTimeUpdate = () => {

    }

    _onVideoSeeking = (duration) => {
        console.log("Video seeking: ", duration);
    }

    _onVideoSeeked = (from, to) => {
        console.log(`Video seeked from ${from} to ${to}`);
    }

    _onVideoEnd = () => {
        console.log("Video ended");
    }
    _onVideoError = () => {
        console.log("Video error");
    }

    _trackingUserEndTimeEpisode = () => {
        if (this.userEndTimeEpisode !== null && typeof this.props.onUpdateUserEndTime !== undefined) {
            let currentTime = this.player.currentTime();
            this.props.onUpdateUserEndTime(currentTime);
        }

    }
}

export default PlayerMovie;