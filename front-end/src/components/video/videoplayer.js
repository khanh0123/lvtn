import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import ReactJWPlayer from 'react-jw-player';
// const sources = {
//     sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
//     bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
//     bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
//     local: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
//     test: 'https://ca01.vieplay.vn/vielive/on-gioi-cau-day-roi-2017-s04-ep01/hls/mapper-fullhd/profile.m3u8',
//     fb: 'https://www.facebook.com/1776182825843105/videos/532860377175475/',
// };
class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: [],
            current_play:-1
        };

        this.onAdPlay = this.onAdPlay.bind(this);
        this.onReady = this.onReady.bind(this);
        this.onVideoLoad = this.onVideoLoad.bind(this);
        this.onError = this.onError.bind(this);
        this.onSetupError = this.onSetupError.bind(this);
    }
    async componentDidMount() {
        let { data } = this.props;
        if (data.length > 0) {
            await this.setState({ sources: data });
        }

    }
    async componentWillReceiveProps(nextProps) {
        let { data } = nextProps;
        if (data !== this.state.sources) {
            await this.setState({ sources: data });
        }
    }
    onReady(event) {
        // interact with JW Player API here
        const player = window.jwplayer(this.playerId);
    }
    onAdPlay(event) {
        // track the ad play here
    }
    onVideoLoad(event) {

        console.log("loaded video");
        
    }
    onError(event){
        console.log(event);
        
        console.log('error');
        
    }
    onSetupError(event){
        if(this.state.current_play !== ''){
            this.setState({current_play:this.state.current_play++});
        }
        
    }

    render() {
        let { sources , current_play } = this.state;
        let { thumbnail } = this.props;
        let link = this._get_link_from_sources(sources , current_play);
        let src = link.src;
        
        
        return (
            <div className='player-wrapper'>
                {/* <ReactPlayer
                    className='react-player'
                    url={link.src}
                    width='100%'
                    height='100%'
                    controls={true}
                    style={{ backgroundImage: `url(${link.thumbnail})` }}
                /> */}
                {/* file={link.src} */}
                <ReactJWPlayer
                    file={src}
                    image={thumbnail != '' ? thumbnail : link.thumbnail}
                    onAdPlay={this.onAdPlay}
                    onReady={this.onReady}
                    onVideoLoad={this.onVideoLoad}
                    onError={this.onError}
                    onSetupError={this.onSetupError}
                    playerId={'player-movies'} // bring in the randomly generated playerId
                    playerScript={'https://cdn.jwplayer.com/libraries/Yu5mXJ4F.js'}
                />
            </div>
        );
    }
    _get_link_from_sources = async (s , current) => {
        let index = -1;
        
        if(s.gd) {
            for (let i = 0; i < s.gd.length; i++) {
                index++;
                if(index > current) return s.gd[i];                
            }
            
        }
        if (s.fb ) {
            for (let i = 0; i < s.fb.length; i++) {
                index++;
                if(index > current) return s.gd[i];                
            }
        }
        await this.setState({current_play:''});
        return { src: '', thumbnail: '' };
    }
}

export default VideoPlayer;