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
            source: sources['fb'],
        };
    }
    render() {
        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url = { this.state.source }
                    width='100%'
                    height='100%'
                    controls={true}
                    style={{backgroundImage: "url(https://stanleymovietheater.com/wp-content/uploads/2018/02/Black-Panther-Poster-UnBumf.jpeg)"}}
                />
            </div>
        );
    }
}

export default VideoPlayer;