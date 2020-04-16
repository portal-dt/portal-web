import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from '../button/Button';
import Table from '../dashboardTable/DashboardTable';

import { messages } from './messages';
import { useIntl } from 'react-intl';

import './CustomerMessages.less';
import MessageModal from '../messageModal/MessageModal';

const inboxData = [
    {
        subject: 'test inbox subject',
        name: 'Michael',
        date: '15 April 2020',
        status: 'new',
        message: 'lorem ipsum dolor.'
    },
    {
        subject: 'another inbox subject',
        name: 'John',
        date: '14 April 2020',
        status: 'read',
        message: 'Dolor sit amet.'
    }
];

const outboxData = [
    {
        subject: 'outbox subject',
        name: 'Mark',
        date: '16 April 2020',
        status: 'sent',
        message: 'lorem ipsum dolor sit amet.'
    }
];

const CustomerMessages = () => {
    const { formatMessage } = useIntl();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="page-content__title title-action">
                {formatMessage(messages.messagesTitle)}
                <Button classNames="theme-btn" text="Send Email" onClickHandler={handleShow} />
            </div>
            <div className="messages-page">
            <MessageModal
                isActive={show}
                onClose={handleClose}
            />
                <Tabs defaultActiveKey="inbox" id="uncontrolled-tab-example">
                    <Tab eventKey="inbox" title="Inbox">
                        
                    </Tab>
                    <Tab eventKey="sent" title="Sent">
                        <BootstrapTable className="messages-table" striped bordered responsive>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Answer</td>
                                    <td>Mark</td>
                                    <td>11.04.2020</td>
                                    <td>sent</td>
                                </tr>
                            </tbody>
                        </BootstrapTable>
                    </Tab>
                </Tabs>
            </div>            
        </>
    );
};

export default CustomerMessages;