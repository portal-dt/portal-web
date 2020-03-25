import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Document } from 'react-pdf/dist/entry.webpack';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import Table from '../dashboardTable';
import Header from '../header';
import Footer from '../footer';
import CustomerTableRow from '../customerTableRow';
import CustomerTableHeader from '../customerTableHeader';

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
  // const [document, setDocument] = useState([]);
  //
  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     const { data: { file } } = await axios.get('http://127.0.0.1:5000/v3/archive/');
  //     setDocument(file);
  //   };
  //
  //   fetchDocuments();
  // }, []);

  return (
    <>
      {/*<Document file={document} />*/}
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