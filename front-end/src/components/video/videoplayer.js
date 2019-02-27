import React, { Component } from 'react'
import ReactPlayer from 'react-player'
const sources = {
    sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
    bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
    local: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
    test: 'https://ca01.vieplay.vn/vielive/on-gioi-cau-day-roi-2017-s04-ep01/hls/mapper-fullhd/profile.m3u8',
    fb: 'https://www.facebook.com/1776182825843105/videos/532860377175475/',
};
class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: []
        };
    }
    async componentDidMount(){
        let {data} = this.props;
        if(data.length > 0) {
            await this.setState({sources:data});
        }

    }
    async componentWillReceiveProps(nextProps){
        let {data} = nextProps;
        if(data !== this.state.sources) {
            await this.setState({sources:data});
        }
    }
    
    render() {
        let {sources} = this.state;
        let link = this._get_link_from_sources(sources);
        console.log(sources);
        
        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url = { link.src }
                    width='100%'
                    height='100%'
                    controls={true}
                    style={{backgroundImage: `url(${link.thumbnail})`}}
                />
            </div>
        );
    }
    _get_link_from_sources = (s) =>{
        if(s.fb && s.fb.src){
            return s.fb;
        }
        return {src:'',thumbnail:''};
    }
}

export default VideoPlayer;