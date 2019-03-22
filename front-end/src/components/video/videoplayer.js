import React, { Component } from 'react'
import Player from "./player2";
import { isString } from 'util';
// import ReactPlayer from 'react-player'
// import ReactJWPlayer from 'react-jw-player';
// import videojs from 'video.js'
// import "video.js/dist/video-js.css"
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
            index_play: -1,
            link_play: ''

        };

    }
    async componentDidMount() {

        let { data } = this.props;
        if (data.length > 0) {
            let obj = await this._get_link_from_sources(data, 0);
            this.setState({ sources: data, link_play: obj.link_play, index_play: obj.index_play });
        }


    }
    async componentWillReceiveProps(nextProps) {
        let { data } = nextProps;
        if (data !== this.state.sources) {
            let obj = await this._get_link_from_sources(data, 0);
            await this.setState({ sources: data, link_play: obj.link_play, index_play: obj.index_play });
        }
    }

    render() {
        let { link_play } = this.state;
        let { thumbnail } = this.props;
        console.log(link_play);
        

        let link = {
            src:'',
            type:'video/mp4'
        }
        link.src = link_play.src;
        // link_play.src = "https://r6---sn-25ge7nl6.googlevideo.com/videoplayback?id=3095c55bebaf9c97&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-25ge7nl6&ms=nxu&mv=u&pl=23&sc=yes&ei=NHmPXMj1GISehAe15Y7YDA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=2552.499&lmt=1547472817594486&mt=1552905497&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=51.15.218.197&expire=1552913748&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=3B8D76B7383087A7C140B655BE04A637EA7CAD7A3919231D919867235902B31E.5E05BA1413CF0AF46C9C2C6FE28C1D861B483B475E5201BA4A21829745FF0E58&key=us0";

        const videoJsOptions = {
            autoplay: false,
            controls: true,
            sources: [link]
        }
        return (
            <div className='player-wrapper'>
                <Player {...videoJsOptions} />
            </div>
        );
    }
    _get_link_from_sources = (s, current) => {
        let index = 0;
        s = s.sources;
        if (typeof s.pt == 'object') {
            for (let i = 0; i < s.pt.length; i++) {
                index++;
                if (index > current) {
                    return {
                        link_play: s.pt[i],
                        index_play: index,
                    }
                }

            }

        }
        if (s.gd) {
            for (let i = 0; i < s.gd.length; i++) {
                index++;
                if (index > current) {
                    return {
                        link_play: s.gd[i],
                        index_play: index,
                    }
                }

            }

        }
        
        if (typeof s.fb == 'object') {
            for (let i = 0; i < s.fb.length; i++) {
                index++;
                return {
                    link_play: s.fb[i],
                    index_play: index,
                }
            }
        }


        return {
            link_play: {},
            index_play: '',
        }
    }
}

export default VideoPlayer;