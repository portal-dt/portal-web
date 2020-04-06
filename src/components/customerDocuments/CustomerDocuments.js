import React, { useState, useEffect, useReducer } from 'react';
import { useIntl } from 'react-intl';

import { getDocumentsByCustomerId } from '../../utils/api';
import { sortColumn } from '../../utils';
import { messages } from './messages';

import Table from '../dashboardTable/DashboardTable';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CustomerTableRow from '../customerTableRow/CustomerTableRow';
import CustomerTableHeader from '../customerTableHeader/CustomerTableHeader';
import Container from 'react-bootstrap/Container';

import './CustomerDocuments.less';

const userName = 'Customer Name';

// const tableData = [
//   {
//     documentNumber: 1,
//     documentType: '1',
//     creationDate: '27 December 2020',
//     openedAt: null
//   },
//   {
//     documentNumber: 2,
//     documentType: '2',
//     creationDate: '27 December 2020',
//     openedAt: '27 December 2020'
//   },
//   {
//     documentNumber: 3,
//     documentType: '3',
//     creationDate: '27 December 2020',
//     openedAt: null
//   },
//   {
//     documentNumber: 4,
//     documentType: '1',
//     creationDate: '27 December 2020',
//     openedAt: '27 December 2020',
//   }
// ];

const initialState = {
  documentNumber: { isAsc: true },
  documentType: { isAsc: false },
  creationDate: { isAsc: false },
};

const reducer = (state, { field }) => ({
  ...state,
  [field]: { isAsc: !state[field].isAsc }
});


const CustomerDocuments = () => {
  const [sortState, dispatch] = useReducer(reducer, initialState);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const { formatMessage } = useIntl();

  useEffect(() => {
    const fetchDocuments = async () => {
      const customerDocuments = await getDocumentsByCustomerId();
      setDocuments(customerDocuments);
    };
    fetchDocuments();
  }, []);

  const filterByStatus = ({ target = {} }) => {
    let filteredDocuments = [];
    if (target.value !== '') {
      filteredDocuments = documents.filter(({ documentType }) => {
        const filter = target.value.toLowerCase().trim();
        return documentType.includes(filter);
      });
    }
    setFilteredDocuments(filteredDocuments.length ? filteredDocuments : documents);
  };

  const tableData = filteredDocuments.length ? filteredDocuments : documents;

  const sort = ({ target = {} }) => {
    const tableDataSorted = sortColumn(tableData, target.id, sortState[target.id].isAsc);
    dispatch({ field: target.id });
    setFilteredDocuments(tableDataSorted);
  };

  const TableHeader = <CustomerTableHeader onInputChange={filterByStatus} sort={sort} sortState={sortState} />;

  return (
    <>
      <div className="page-content__title">{formatMessage(messages.documents)}</div>
      <Table
        tableData={tableData}
        TableHeader={TableHeader}
        TableRow={CustomerTableRow}
      />
    </>
  );
};

export default CustomerDocuments;
