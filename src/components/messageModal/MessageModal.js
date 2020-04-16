import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from '../button/Button';
import PropTypes from 'prop-types';

import { messages } from './messages';
import { useIntl } from 'react-intl';

import './MessageModal.less';


const MessageModal = ({ isActive, onClose }) => {
    const { formatMessage } = useIntl();

    return (
        <>
            <Modal className="message-modal" show={isActive} onHide={onClose} animation={false}>
                <Modal.Header className="message-modal__header" closeButton>
                    <Modal.Title>Write a message</Modal.Title>
                </Modal.Header>
                <Modal.Body className="message-modal__body">
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="subject" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="message-modal__footer">
                    <Button classNames="theme-btn" text="Send" onClickHandler={onClose} />
                </Modal.Footer>
            </Modal>
        </>
    );
};

MessageModal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default MessageModal;