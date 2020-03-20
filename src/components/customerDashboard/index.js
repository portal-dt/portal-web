import React from 'react';

import Table from '../dashboardTable';
import Header from '../header';
import Footer from '../footer';
import CustomerTableRow from '../customerTableRow';
import CustomerTableHeader from '../customerTableHeader';

import './index.css';

const userName = 'CUSTOMER NAME';

const tableData = [
  {
    documentName: 'Tax invoice',
    documentId: '1',
    creationDate: '27 December 2020'
  },
  {
    documentName: 'Monthly invoice',
    documentId: '2',
    creationDate: '27 December 2020'
  },
  {
    documentName: 'Document',
    documentId: '3',
    creationDate: '27 December 2020'
  },
  {
    documentName: 'Best document ever',
    documentId: '1',
    creationDate: '27 December 2020'
  }
];


const CustomerDashboard = () => {
  return (
    <>
      <Header userName={userName} />
      <Table
        tableData={tableData}
        TableHeader={CustomerTableHeader}
        TableRow={CustomerTableRow}
      />
      <Footer />
    </>
  );
};

export default CustomerDashboard;