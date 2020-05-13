import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import Card from '../card/Card';
import Table from '../dashboardTable/DashboardTable';
import DocumentModal from '../documentModal/DocumentModal';
import BootstrapTable from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { messages } from './messages';
import { getLatestDocumentsByCustomerId, updateViewedDocument } from '../../utils/api';
import { getDocumentName } from '../../utils';
import { userSelector } from '../../selectors';

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

const renderTableRow = ({ documentId, documentType, creationDate, openedAt, dueDate, document }) => {
  const { formatMessage, formatDate } = useIntl();
  const documentName = getDocumentName(creationDate, documentType, formatMessage, messages);
  const [isDocumentActive, setIsDocumentActive] = useState(false);

  const openDocument = () => {
    updateViewedDocument(documentId);
    setIsDocumentActive(true);
  };
  const closeDocument = () => setIsDocumentActive(false);
  return (
    <>
      <tr onClick={openDocument}>
        <td>{documentName}</td>
        <td>{formatDate(creationDate)}</td>
        <td>{formatDate(dueDate)}</td>
        <td>{openedAt ? formatDate(openedAt) : formatMessage(messages.unread)}</td>
      </tr>
      <DocumentModal isActive={isDocumentActive} document={document} onClose={closeDocument} documentName={documentName} />
    </>
  );
};

const renderSpinner = () => (
  <div className="page-content__spinner">
    <Spinner variant="warning" animation="border" />
  </div>
);

const CustomerDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [pdfPreview, setPdfPreview] = useState('');
  const [isDocumentOpened, setIsDocumentOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin } = useSelector(userSelector);
  const { formatMessage, formatDate } = useIntl();

  const fetchLatestDocuments = async () => {
    const customerId = localStorage.getItem('userId');
    const latestDocuments = customerId && await getLatestDocumentsByCustomerId(customerId) || [];

    setDocuments(latestDocuments);
    setIsLoading(false);
  };

  useEffect(() => {
    !isAdmin && fetchLatestDocuments();
  },[isAdmin]);

  const viewDocument = (documentId) => {
    updateViewedDocument(documentId);
    setIsDocumentOpened(true);
  };
  const closeDocument = () => setIsDocumentOpened(false);

  const getMonthlyDocumentData = () => {
    const monthlyDocument = documents.length && documents[0];
    const { documentId, document, documentType, creationDate, referenceNumber, dueDate, isDirectDebit, dueDateAmount } = monthlyDocument;
    const documentName = documents.length && getDocumentName(creationDate, documentType, formatMessage, messages);

    return {
      document,
      referenceNumber,
      dueDate,
      isDirectDebit,
      dueDateAmount,
      documentName,
      documentId
    };
  };

  const onPdfRender = () => {
    const canvas = window.document.querySelector('.pdf-page canvas');
    const pdfImage = canvas.toDataURL();
    setPdfPreview(pdfImage);
  };

  const renderDashboard = () => (
    <>
      <Row>
        <Col xs="12" sm="6">
          <Card
            cardHeaderText={formatMessage(messages.monthlyInvoiceTitle)}
            classNames="text-center dashboard-card card-messages"
          >
            <BootstrapTable striped bordered responsive className="dashboard-table">
              <thead>
              <tr>
                <th>{formatMessage(messages.referenceNumber)}</th>
                <th>{formatMessage(messages.columnDueDate)}</th>
                <th>{formatMessage(messages.amountDue)}</th>
                <th>{formatMessage(messages.method)}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{getMonthlyDocumentData().referenceNumber}</td>
                <td>{formatDate(getMonthlyDocumentData().dueDate)}</td>
                <td>{getMonthlyDocumentData().dueDateAmount}</td>
                <td>{formatMessage(messages[getMonthlyDocumentData().isDirectDebit ? 'directDebitMethod' : 'bankTransferMethod'])}</td>
              </tr>
              </tbody>
            </BootstrapTable>
            <Col xs="6" className="invoice-preview">
              <img
                className="invoice-preview__image"
                src={pdfPreview}
                alt="pdf-preview"
                onClick={() => viewDocument(getMonthlyDocumentData().documentId)}
              />
              {getMonthlyDocumentData().documentName}
            </Col>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card
            cardHeaderText={formatMessage(messages.tableCardTitle)}
            classNames="text-center dashboard-card card-documents"
          >
            <Table
              tableData={documents}
              TableHeader={renderTableHeader()}
              TableRow={renderTableRow}
            />
          </Card>
        </Col>
        <DocumentModal
          isActive={isDocumentOpened}
          document={getMonthlyDocumentData().document}
          onClose={closeDocument}
        />
      </Row>
      {!pdfPreview && <DocumentModal isActive={true} document={getMonthlyDocumentData().document} onRender={onPdfRender} classNames="invisible-document" />}
    </>
  );

  return (
   isLoading
     ? renderSpinner()
     : isAdmin ? <h2>{formatMessage(messages.welcome)}</h2> : renderDashboard()
  );
};

export default CustomerDashboard;