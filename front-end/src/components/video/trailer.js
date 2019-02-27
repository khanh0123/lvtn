import React from "react";
import ModalPopup from '../popup/Modal';
import ReactPlayer from 'react-player'


class Trailer extends React.Component {
    constructor() {
        super();
    }
    render() {
        let {source,image} = this.props;

        return (
            <ModalPopup isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <ReactPlayer
                        url = { source }
                        width='100%'
                        height='100%'
                        controls={true}
                        style={{backgroundImage: `url(${image})`}}
                        width='100%'
                        height='100%'
                    />
            </ModalPopup>
        )
    }


}
export default Trailer;