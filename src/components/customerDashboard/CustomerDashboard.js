import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { messages } from './messages';
import { getLatestDocumentsByCustomerId } from '../../utils/api';
import { formatDateToLocalString } from '../../utils';

import Card from '../card/Card';
import Table from '../dashboardTable/DashboardTable';
import DocumentModal from '../documentModal/DocumentModal';
import Button from '../button/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const renderTableHeader = () => {
  const { formatMessage } = useIntl();

  return (
    <thead>
    <tr>
      <th>{formatMessage(messages.columnName)}</th>
      <th>{formatMessage(messages.columnCreationDate)}</th>
      <th>{formatMessage(messages.columnDueDate)}</th>
      <th>{formatMessage(messages.columnLastOpened)}</th>
    </tr>
    </thead>
  );
};

const renderTableRow = ({ documentName, creationDate, openedAt, dueDate, document }) => (
  <tr>
    <td>{documentName}</td>
    <td>{formatDateToLocalString(creationDate)}</td>
    <td>{formatDateToLocalString(dueDate)}</td>
    <td>{openedAt ? formatDateToLocalString(openedAt) : 'Unread'}</td>
  </tr>
);

const CustomerDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const { formatMessage } = useIntl();

  useEffect(() => {
    const fetchLatestDocuments = async () => {
      const latestDocuments = await getLatestDocumentsByCustomerId();

      setDocuments(latestDocuments);
    };

    fetchLatestDocuments();
  },[]);

  return (
    <>
      <Row>
        <Col xs="12" sm="6">
          <Card cardHeaderText={formatMessage(messages.monthlyInvoiceTitle)} />
        </Col>
        <Col xs="12" sm="6">
          <Card cardHeaderText={formatMessage(messages.messagesTitle)} />
        </Col>
        <Col xs="12" sm="6">
          <Card cardHeaderText={formatMessage(messages.tableCardTitle)}>
            <Table tableData={documents} TableHeader={renderTableHeader()}  TableRow={renderTableRow} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CustomerDashboard;