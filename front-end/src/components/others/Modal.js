import React from 'react';
import Modal from 'react-modal';

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
Modal.setAppElement('#root');
class ModalPopup extends React.Component {
    constructor() {
        super();
    }

    componentWillUnmount() {
        this.props.onClose();
    }
    getParent() {
        return document.querySelector('#root');
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.isOpen}
                    onRequestClose={this.props.onClose}
                    style={customStyles}
                    parentSelector={this.getParent}
                >
                    {this.props.children}
                </Modal>
            </React.Fragment>
        );
    }
}
export default ModalPopup;