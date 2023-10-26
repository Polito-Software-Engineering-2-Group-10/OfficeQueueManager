/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ErrorModal(props) {
    const {setShow} = props;
    const [show, setShowInternal] = useState(true);
    const handleClose = () => {
        setShowInternal(false);
        setShow(false);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ErrorModal;