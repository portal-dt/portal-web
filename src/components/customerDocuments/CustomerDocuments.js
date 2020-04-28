import React, { useState, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { getDocuments, getDocumentsByCustomerId } from '../../utils/api';
import { sortColumn } from '../../utils';
import { messages } from './messages';
import { userSelector } from '../../selectors';

import Table from '../dashboardTable/DashboardTable';
import CustomerTableRow from '../customerTableRow/CustomerTableRow';
import CustomerTableHeader from '../customerTableHeader/CustomerTableHeader';

import './CustomerDocuments.less';

const initialState = {
  documentNumber: { isAsc: true },
  customerName: { isAsc: false },
  documentType: { isAsc: false },
  creationDate: { isAsc: false },
  openedAt: { isAsc: false },
  email: { isAsc: false },
};

const reducer = (state, { field }) => ({
  ...state,
  [field]: { isAsc: !state[field].isAsc }
});


const CustomerDocuments = () => {
  const [sortState, dispatch] = useReducer(reducer, initialState);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const { firstName } = useSelector(userSelector);
  const { formatMessage } = useIntl();
  const isAdmin = firstName === 'Admin';

  useEffect(() => {
    const fetchDocuments = async () => {
      const customerId = localStorage.getItem('userId');
      const customerDocuments = await (firstName === 'Admin' ? getDocuments() : getDocumentsByCustomerId(customerId));
      setDocuments(customerDocuments);
    };
    fetchDocuments();
  }, []);

  const filterTable = ({ target = {} }) => {
    let filteredDocuments = [];
    if (target.value !== '') {
      filteredDocuments = documents.filter(({ documentNumber, documentType, creationDate, openedAt, customerName = '', email = '' }) => {
        const filter = target.value.toLowerCase().trim();
        const openedAts = openedAt ? openedAt : 'unread';
        return (
          customerName.toLowerCase().trim().includes(filter) ||
          documentNumber.toString().includes(filter) ||
          creationDate.toString().includes(filter) ||
          openedAts.toString().includes(filter) ||
          documentType.includes(filter) ||
          email.includes(filter)
        );
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

  const TableHeader = <CustomerTableHeader onInputChange={filterTable} sort={sort} sortState={sortState} isAdmin={isAdmin} />;

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
