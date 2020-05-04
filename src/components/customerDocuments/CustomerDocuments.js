import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import Table from '../dashboardTable/DashboardTable';
import TablePagination from '../tablePagination/TablePagination';
import CustomerTableRow from '../customerTableRow/CustomerTableRow';
import CustomerTableHeader from '../customerTableHeader/CustomerTableHeader';
import Spinner from 'react-bootstrap/Spinner';

import { getDocuments, getDocumentsByCustomerId } from '../../utils/api';
import { sortColumn } from '../../utils';
import { messages } from './messages';
import { userSelector, isLoadingSelector } from '../../selectors';
import { setLoadingAction } from '../../actions/actions';

import './CustomerDocuments.less';

const initialState = {
  documentNumber: { isAsc: true },
  customerName: { isAsc: false },
  documentType: { isAsc: false },
  creationDate: { isAsc: false },
  openedAt: { isAsc: false },
  email: { isAsc: false },
};

const sortReducer = (state, { field }) => ({
  ...state,
  [field]: { isAsc: !state[field].isAsc }
});


const CustomerDocuments = () => {
  const [sortState, sortStateUpdater] = useReducer(sortReducer, initialState);
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const dispatch = useDispatch();
  const { isAdmin } = useSelector(userSelector);
  const { id } = useParams();
  const { formatMessage } = useIntl();
  const rowsPerPage = 5;

  const fetchDocuments = async () => {
    setIsLoading(true);
    const customerId = id ? id : localStorage.getItem('userId');
    const customerDocuments = await (isAdmin  ? getDocuments() : getDocumentsByCustomerId(customerId));

    setDocuments(customerDocuments);
    setFilteredDocuments(customerDocuments);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, [isAdmin]);

  const filterTable = ({ target = {} }) => {
    const filteredDocuments = documents.filter(({ documentNumber, documentType, creationDate, openedAt, customerName = '', email = '' }) => {
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

    setFilteredDocuments(filteredDocuments);
  };

  const sort = ({ target = {} }) => {
    const tableDataSorted = sortColumn(filteredDocuments, target.id, sortState[target.id].isAsc);
    sortStateUpdater({ field: target.id });
    setDocuments(tableDataSorted);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredDocuments.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const TableHeader = <CustomerTableHeader onInputChange={filterTable} sort={sort} sortState={sortState} isAdmin={isAdmin && !id} />;

  const renderSpinner = () => (
    <div className="page-content__spinner">
      <Spinner variant="warning" animation="border" />
    </div>
  );

  return (
    isLoading ? renderSpinner() : (
      <>
        <div className="page-content__title">{formatMessage(messages.documents)} - {filteredDocuments.length} of {documents.length}</div>
        <Table
          tableData={currentRows}
          TableHeader={TableHeader}
          TableRow={CustomerTableRow}
        />
        {
          filteredDocuments.length > 5 &&
          <TablePagination
            rowsPerPage={rowsPerPage}
            totalRows={filteredDocuments.length}
            paginate={paginate}
            currentNumber={currentPage}
          />
        }
      </>
    )
  );
};

export default CustomerDocuments;
