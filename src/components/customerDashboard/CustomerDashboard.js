import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { messages } from './messages';
import { getLatestDocumentsByCustomerId } from '../../utils/api';
import { userSelector } from '../../selectors';

import Card from '../card/Card';
import Table from '../dashboardTable/DashboardTable';
import DocumentModal from '../documentModal/DocumentModal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './CustomerDashboard.less';


// const getDocumentName = (creationDate, documentType, formatMessage = {}) => {
//   const month = new Date(creationDate).toLocaleString('default', { month: 'long' }).toLowerCase();
//   const year = new Date(creationDate).getUTCFullYear();
//   return `${formatMessage(messages[documentType])} ${formatMessage(messages[month])} ${year}`;
// };

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

const renderTableRow = ({ documentType, creationDate, openedAt, dueDate }) => {
  const { formatMessage, formatDate } = useIntl();
  const month = new Date(creationDate).toLocaleString('default', { month: 'long' }).toLowerCase();
  const year = new Date(creationDate).getUTCFullYear();
  const documentName = `${formatMessage(messages[documentType])} ${formatMessage(messages[month])} ${year}`;

  return (
    <tr>
      <td>{documentName}</td>
      <td>{formatDate(creationDate)}</td>
      <td>{formatDate(dueDate)}</td>
      <td>{openedAt ? formatDate(openedAt) : formatMessage(messages.unread)}</td>
    </tr>
  );
};

const CustomerDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [pdfPreview, setPdfPreview] = useState('');
  const [isDocumentOpened, setIsDocumentOpened] = useState(false);
  const { firstName } = useSelector(userSelector);
  const { formatMessage,  } = useIntl();

  useEffect(() => {
    const fetchLatestDocuments = async () => {
      const customerId = localStorage.getItem('userId');
      const latestDocuments = await getLatestDocumentsByCustomerId(customerId);

      setDocuments(latestDocuments);
    };

    fetchLatestDocuments();
  },[]);

  const viewDocument = () => setIsDocumentOpened(true);
  const closeDocument = () => setIsDocumentOpened(false);

  const getMonthlyDocumentData = () => {
    const monthlyDocument = documents.length && documents[0];
    const { document, documentType, creationDate } = monthlyDocument;
    // const documentName = getDocumentName(creationDate, documentType, formatMessage);

    return {
      document,
      // documentName
    };
  };

  const onPdfRender = () => {
    const canvas = window.document.querySelector('.pdf-page canvas');
    const pdfImage = canvas.toDataURL();
    setPdfPreview(pdfImage);
  };

  const isAdmin = firstName === 'Admin';


  return (
    <>
      <Row>
        <Col xs="12" sm="6">
          {
            !isAdmin && (
              <Card
                cardHeaderText={formatMessage(messages.monthlyInvoiceTitle)}
                classNames="text-center dashboard-card card-messages"
              >
                <Col xs="6" className="invoice-preview">
                  {/*{documents.length && getMonthlyDocumentData().documentName}*/}
                  <img
                    className="invoice-preview__image"
                    src="../../../assets/images/pdf_preview.png"
                    alt="pdf-preview"
                    onClick={viewDocument}
                  />
                </Col>
              </Card>
            )
          }
        </Col>
        <Col xs="12" sm={!isAdmin ? 6 : 12} >
          <Card
            cardHeaderText={formatMessage(messages.messagesTitle)}
            classNames="text-center dashboard-card card-invoice"
          />
        </Col>
        <Col xs="12" sm="6">
          {
            !isAdmin && (
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
            )
          }
        </Col>
        <DocumentModal
          isActive={isDocumentOpened}
          document={getMonthlyDocumentData().document}
          onClose={closeDocument}
          onRender={onPdfRender}
        />
      </Row>
    </>
  );
};

export default CustomerDashboard;