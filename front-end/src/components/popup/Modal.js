import React from 'react';
// import Modal from 'react-modal';
import Modal from 'react-responsive-modal';
import Popup from "reactjs-popup";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999
    }
};
// Modal.setAppElement('#root');
class ModalPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.onClose();
    }

    render() {
        const classList = {
            overlay:'modal-popup-overlay',
            modal:'modal-popup',
            closeButton:'btn-close-modal',
        }
        return (
                <Popup 
                    open={this.props.isOpen} 
                    onClose={this.props.onClose}
                    closeOnDocumentClick
                    children={this.props.children || null}
                    closeOnOverlayClick={true}
                    closeOnEscape={true}
                    repositionOnResize={true}
                    center
                    
                    lockScroll={true}
                />
                
        );
    }
}
export default ModalPopup;