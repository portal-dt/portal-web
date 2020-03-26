import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '../dashboardTable/DashboardTable';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CustomerTableRow from '../customerTableRow/CustomerTableRow';
import CustomerTableHeader from '../customerTableHeader/CustomerTableHeader';

const userName = 'CUSTOMER NAME';

const tableData = [
  {
    documentName: 'Tax invoice',
    documentType: '1',
    creationDate: '27 December 2020',
    openedStatus: null
  },
  {
    documentName: 'Monthly invoice',
    documentType: '2',
    creationDate: '27 December 2020',
    openedStatus: '27 December 2020'
  },
  {
    documentName: 'Document',
    documentType: '3',
    creationDate: '27 December 2020',
    openedStatus: null
  },
  {
    documentName: 'Best document ever',
    documentType: '1',
    creationDate: '27 December 2020',
    openedStatus: '27 December 2020',
  }
];


const CustomerDashboard = () => {
  const [documents, setDocument] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const { data: { documents } } = await axios.get('http://127.0.0.1:5000/v3/archive/documents/100005262?content=true');

      const tableData = documents.map(({ type, openedAt, invoiceDate, invoiceNumber, file }) => ({
        documentNumber: invoiceNumber,
        documentType: type,
        creationDate: invoiceDate,
        openedAt: openedAt,
        document: file
      }));

      setDocument(tableData);
    };

    fetchDocuments();
  }, []);

  return (
    <>
      <Header userName={userName} />
      <Table
        tableData={documents}
        TableHeader={CustomerTableHeader}
        TableRow={CustomerTableRow}
      />
      {/*<Footer />*/}
    </>
  );
};

export default CustomerDashboard;