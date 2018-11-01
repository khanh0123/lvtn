import React from "react";
import ModalPopup from '../popup/Modal';
import ReactPlayer from 'react-player'


class Trailer extends React.Component {
    constructor() {
        super();
    }
    render() {

        return (
            <ModalPopup isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <ReactPlayer
                        className='react-player'
                        url = { 'https://www.youtube.com/watch?v=f6Cswdm601A' }
                        width='100%'
                        height='100%'
                        controls={true}
                        style={{backgroundImage: "url(https://stanleymovietheater.com/wp-content/uploads/2018/02/Black-Panther-Poster-UnBumf.jpeg)"}}
                        width='100%'
                        height='100%'
                    />
            </ModalPopup>
        )
    }


}
export default Trailer;