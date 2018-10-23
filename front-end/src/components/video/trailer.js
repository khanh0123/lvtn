import React from "react";
import ModalPopup from '../others/Modal';
// import 'react-modal-video/scss/modal-video.scss';

class Trailer extends React.Component {
    constructor() {
        super();
    }
    render() {

        return (
            <ModalPopup isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <iframe width="800" height="500" src={this.props.source} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            </ModalPopup>
        )
    }


}
export default Trailer;