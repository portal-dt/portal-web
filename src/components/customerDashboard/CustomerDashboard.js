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
import classNames from 'classnames';

import { Document, Page } from 'react-pdf/dist/entry.webpack';
import './CustomerDashboard.less';


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

  // const [pageNumber, setPageNumber] = useState(1);

  // const onDocumentLoadSuccess = ({ numPages }) => setPageNumber(numPages);
  const [isDocumentOpened, setIsDocumentOpened] = useState(false);

  const viewDocument = () => setIsDocumentOpened(true);
  const closeDocument = () => setIsDocumentOpened(false);


  return (
    <>
      <Row>
        <Col xs="12" sm="6">
          <Card cardHeaderText={formatMessage(messages.monthlyInvoiceTitle)} classNames="text-center dashboard-card card-messages">
            <Col xs="6" className="invoice-preview">
              <img
                className="invoice-preview__image"
                src="../../../assets/images/pdf_preview.png"
                alt="pdf-preview"
                onClick={viewDocument}
              />
            </Col>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card cardHeaderText={formatMessage(messages.messagesTitle)} classNames="text-center dashboard-card card-invoice"/>
        </Col>
        <Col xs="12" sm="6">
          <Card cardHeaderText={formatMessage(messages.tableCardTitle)} classNames="text-center dashboard-card card-documents">
            <Table tableData={documents} TableHeader={renderTableHeader()}  TableRow={renderTableRow} />
          </Card>
        </Col>
        <DocumentModal
          isActive={isDocumentOpened}
          document={documents.length && documents[0].document}
          onClose={closeDocument}
        />
      </Row>
    </>
  );
};

export default CustomerDashboard;