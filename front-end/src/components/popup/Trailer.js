import React from "react";
// import ModalPopup from '../popup/Modal';
import ReactPlayer from 'react-player';
import Popup from "reactjs-popup";


class Trailer extends React.Component {
    constructor() {
        super();
    }
    _closePopup = () => {
        if(typeof this.props.onClose !== 'undefined'){
            this.props.onClose(false);
        }
    }
    render() {
        let { source, image } = this.props;

        return (
            <Popup
                open={this.props.isOpen}
                onClose={this._closePopup.bind(this)}
                closeOnDocumentClick
                repositionOnResize={true}
                lockScroll={true}>
                <ReactPlayer
                    url={source}
                    width='100%'
                    height='100%'
                    controls={true}
                    style={{ backgroundImage: `url(${image})`,height:'40em' }}
                    width='100%'
                    height='100%'
                />
            </Popup>
        )
    }


}
export default Trailer;