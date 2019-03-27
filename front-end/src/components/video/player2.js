import React, { Component } from 'react'

class Player extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
      var self = this;      
      var player = window.videojs(this.refs.player, {}).ready(() => {
        player.src(this.props.sources);
        player.play();
      });
    }
  
    componentWillUnmount() {
      // window.videojs.dispose();
    }
    render() {
      return(
          <video
            className="video-js"
            controls
            ref="player" style={{width:"100%"}}>
          </video>
      )
    }
  
    
  }
  
  export default Player;