import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import Card from '../card/Card';
import Table from '../dashboardTable/DashboardTable';
import DocumentModal from '../documentModal/DocumentModal';
import BootstrapTable from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { messages } from './messages';
import { getLatestDocumentsByCustomerId } from '../../utils/api';
import { userSelector } from '../../selectors';

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

const renderTableRow = ({ documentType, creationDate, openedAt, dueDate, document }) => {
  const { formatMessage, formatDate } = useIntl();
  // const month = new Date(creationDate).toLocaleString('default', { month: 'long' }).toLowerCase();
  const year = new Date(creationDate).getUTCFullYear();
  const documentName = `${formatMessage(messages.invoice)} ${formatMessage(messages.march)} ${year}`;
  const [isDocumentActive, setIsDocumentActive] = useState(false);

  const openDocument = () => setIsDocumentActive(true);
  const closeDocument = (event) => {
    event.stopPropagation();
    setIsDocumentActive(false);
  };
  return (
    <tr onClick={openDocument}>
      <td>{documentName}</td>
      <td>{formatDate(creationDate)}</td>
      <td>{formatDate(dueDate)}</td>
      <td>{openedAt ? formatDate(openedAt) : formatMessage(messages.unread)}</td>
      <DocumentModal isActive={isDocumentActive} document={document} onClose={closeDocument} documentName={documentName} />
    </tr>
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
  const dispatch = useDispatch();
  const { formatMessage, formatDate } = useIntl();

  const fetchLatestDocuments = async () => {
    setIsLoading(true);
    const customerId = localStorage.getItem('userId');
    const latestDocuments = customerId && await getLatestDocumentsByCustomerId(customerId) || [];

    setDocuments(latestDocuments);
    setIsLoading(false);
  };

  useEffect(() => {
    !isAdmin && fetchLatestDocuments();
  },[localStorage.getItem('userId')]);

  const viewDocument = () => setIsDocumentOpened(true);
  const closeDocument = () => setIsDocumentOpened(false);

  const getMonthlyDocumentData = () => {
    const monthlyDocument = documents.length && documents[0];
    const { document, documentType, creationDate, referenceNumber, dueDate, isDirectDebit, dueDateAmount } = monthlyDocument;
    // const documentName = getDocumentName(creationDate, documentType, formatMessage);

    return {
      document,
      referenceNumber,
      dueDate,
      isDirectDebit,
      dueDateAmount
    };
  };

  const onPdfRender = () => {
    const canvas = window.document.querySelector('.pdf-page canvas');
    const pdfImage = canvas.toDataURL();
    setPdfPreview(pdfImage);
  };

  return (

   isLoading ? renderSpinner() :
     (
       <>
         <Row>
           <Col xs="12" sm="6">
             {
               !isAdmin ? (
                 <Card
                   cardHeaderText={formatMessage(messages.monthlyInvoiceTitle)}
                   classNames="text-center dashboard-card card-messages"
                 >
                   <BootstrapTable striped bordered responsive>
                     <thead>
                        <tr>
                          <th>Reference no</th>
                          <th>Due Date</th>
                          <th>Amount Due</th>
                          <th>Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{getMonthlyDocumentData().referenceNumber}</td>
                          <td>{formatDate(getMonthlyDocumentData().dueDate)}</td>
                          <td>{getMonthlyDocumentData().dueDateAmount}</td>
                          <td>{getMonthlyDocumentData().isDirectDebit ? 'Direct Debit' : 'Bank Transfer'}</td>
                        </tr>
                      </tbody>
                   </BootstrapTable>
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
               ) : <h2>Welcome</h2>
             }
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
     )
  );
};

export default CustomerDashboard;