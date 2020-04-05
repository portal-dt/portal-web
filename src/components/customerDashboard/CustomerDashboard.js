import React, { useState, useEffect } from 'react';

import { getLatestDocumentsByCustomerId } from '../../utils/api';
import { formatDateToLocalString } from '../../utils';

import Card from '../card/Card';
import Table from '../dashboardTable/DashboardTable';
import DocumentModal from '../documentModal/DocumentModal';
import Button from '../button/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const renderTableHeader = () => (
  <thead>
    <tr>
      <th>Name</th>
      <th>Creation Date</th>
      <th>Due Date</th>
      <th>Last Opened</th>
    </tr>
  </thead>
);

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
          <Card cardHeaderText="This month's invoice" cardText="This month's invoice" />
        </Col>
        <Col xs="12" sm="6">
          <Card cardHeaderText="Messages" cardText="Start sending messages" />
        </Col>
        <Col xs="12" sm="6">
          <Card cardHeaderText="Last documents">
            <Table tableData={documents} TableHeader={renderTableHeader()}  TableRow={renderTableRow} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CustomerDashboard;