import React from 'react';
// import Modal from 'react-modal';
import Modal from 'react-responsive-modal';


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
            <React.Fragment>
                <Modal 
                    open={this.props.isOpen} 
                    onClose={this.props.onClose}
                    classNames={classList}
                    children={this.props.children || null}
                    closeOnOverlayClick={true}
                    center
                    
                >
                </Modal>
            </React.Fragment>
        );
    }
}
export default ModalPopup;