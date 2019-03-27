import React, { Component } from 'react'
// import Player from "./player2";
// import VideoPlayer from 'react-video-js-player';
import { isString } from 'util';

class PlayerMovie extends Component {
    constructor(props) {
        super(props);
        this.player = null;
        this.state = {
            sources: [],
            
        };

    }

    async componentDidMount() {
        let { data } = this.props;
        if (data && data.length > 0) {
            data = this._initSource(data);
            await this.setState({ sources: data });
        }
        
        if (!this.player) {
            let _linkPlay = this._get_link_from_sources(data);
            // this.player = window.videojs(this.refs.player, {
            //     controls: true,
            //     autoplay: true,
            //     techOrder: ['html5'],
            //     fluid: true,
            //     widescreen: true,
            //     metadata: {
            //         "base_url": "Http://domain."
            //     },
            //     ads: [],
            //     sources: [_linkPlay]
            // });
            console.log(_linkPlay);
            
            this.player = window.videojs(this.refs.player, {}).ready(() => {
                console.log(this.refs.player);
                
                this.player.src(_linkPlay);
                this.player.play();
            });
        }

       


    }
    async componentWillReceiveProps(nextProps) {
        let { data } = nextProps;
        if (data && data !== this.state.sources) {
            data = this._initSource(data);
            await this.setState({ sources: data });
        }
        try {
            if (window.videojs.getPlayers()['player']) {
                delete window.videojs.getPlayers()['player'];
            }
        } catch (e) { }
        this.player = null;
        if (!this.player) {
            let _linkPlay = this._get_link_from_sources(data);
            // this.player = window.videojs(this.refs.player, {
            //     controls: true,
            //     autoplay: true,
            //     techOrder: ['html5'],
            //     fluid: true,
            //     widescreen: true,
            //     metadata: {
            //         "base_url": "Http://domain."
            //     },
            //     ads: [],
            //     sources: [_linkPlay]
            // });
            this.player = window.videojs(this.refs.player, {}).ready(() => {
                this.player.src(_linkPlay);
                this.player.play();
              });
        }
    }
    componentWillUnmount(){
        try {
            this.player.dispose();
            console.log("dispose");
            
        } catch (e) { console.log(e);
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
        if (data && data.pt) {
            data.pt[0]['is_play'] = true;
            for (let i = 1; i < data.pt.length; i++) {
                data.pt[i]['is_play'] = false;
            }
        }
        return data;
    }
    _get_link_from_sources = (s, current) => {        
        if (s && s.pt) {
            for (let i = 0; i < s.pt.length; i++) {
                if (s.pt[i].is_play) return s.pt[i];
            }
            return s.pt[0];
        }
        return { src: '', type: '' };
    }
    onPlayerReady(player) {
        console.log("Player is ready: ", player);
        this.player = player;
    }

    onVideoPlay(duration) {
        console.log("Video played at: ", duration);
    }

    onVideoPause(duration) {
        console.log("Video paused at: ", duration);
    }

    onVideoTimeUpdate(duration) {
        console.log("Time updated: ", duration);
    }

    onVideoSeeking(duration) {
        console.log("Video seeking: ", duration);
    }

    onVideoSeeked(from, to) {
        console.log(`Video seeked from ${from} to ${to}`);
    }

    onVideoEnd() {
        console.log("Video ended");
    }
}

export default PlayerMovie;