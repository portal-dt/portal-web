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
import MessagesTableHeader from '../messagesTableHeader/messagesTableHeader';

const inboxTableData = [
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

const outboxTableData = [
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

    const TableHeader = <MessagesTableHeader />

    const TableRow = ({subject, name, date, status, message}) => {
        return (
            <tr>
                <td>{subject}</td>
                <td>{name}</td>
                <td>{date}</td>
                <td>{status}</td>
            </tr>
        );
    };

    return (
        <>
            <div className="page-content__title title-action">
                {formatMessage(messages.messagesTitle)}
                <Button classNames="theme-btn" text={formatMessage(messages.sendEmail)} onClickHandler={handleShow} />
            </div>
            <div className="messages-page">
                <MessageModal
                    isActive={show}
                    onClose={handleClose}
                />
                <Tabs className="messages-page__tabs" defaultActiveKey="inbox" id="uncontrolled-tab-example">
                    <Tab eventKey="inbox" title="Inbox">
                        <Table
                            tableData={inboxTableData}
                            TableHeader={TableHeader}
                            TableRow={TableRow}
                        />
                    </Tab>
                    <Tab eventKey="sent" title="Sent">
                        <Table
                            tableData={outboxTableData}
                            TableHeader={TableHeader}
                            TableRow={TableRow}
                        />
                    </Tab>
                </Tabs>
            </div>            
        </>
    );
};

export default CustomerMessages;