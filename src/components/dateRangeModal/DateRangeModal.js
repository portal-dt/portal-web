import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '../button/Button';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';

import { messages } from './messages';
import { useIntl } from 'react-intl';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRangeModal.less';

const DateRangeModal = ({ isActive, onClose, dateRange, onDateChange }) => {
    const { formatMessage } = useIntl();

    return (
        <>
            <Modal size="sm" className="message-modal" show={isActive} onHide={onClose} animation={false}>
                <Modal.Body className="message-modal__body">
                    <DateRange
                        editableDateInputs={true}
                        onChange={onDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                    />
                </Modal.Body>
                <Modal.Footer className="message-modal__footer">
                    <Button classNames="theme-btn" text="Edit" onClickHandler={onClose} />
                </Modal.Footer>
            </Modal>
        </>
    );
};

DateRangeModal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    dateRange: PropTypes.any.isRequired,
    onDateChange: PropTypes.func.isRequired,
};

export default DateRangeModal;