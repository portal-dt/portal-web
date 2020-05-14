import React, { useState, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useParams, useHistory } from 'react-router-dom';

import Table from '../dashboardTable/DashboardTable';
import TablePagination from '../tablePagination/TablePagination';
import CustomerTableRow from '../customerTableRow/CustomerTableRow';
import CustomerTableHeader from '../customerTableHeader/CustomerTableHeader';
import DateRangeModal from '../dateRangeModal/DateRangeModal';
import Button from '../button/Button';
import Spinner from 'react-bootstrap/Spinner';

import { getDocuments, getDocumentsByCustomerId } from '../../utils/api';
import { sortColumn } from '../../utils';
import { messages } from './messages';
import { userSelector, customersSelector } from '../../selectors';

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
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [sortState, sortStateUpdater] = useReducer(sortReducer, initialState);
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [rangedDocuments, setRangedDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const history = useHistory();
  const { isAdmin } = useSelector(userSelector);
  // const isLoading = useSelector(isLoadingSelector);
  const customers = useSelector(customersSelector);
  const { id } = useParams();
  const { formatMessage, formatDate } = useIntl();
  const rowsPerPage = 5;

  const handleClose = () => setShowDateRangeModal(false);
  const handleShow = () => setShowDateRangeModal(true);

  const fetchDocuments = async () => {
    const customerId = id ? id : localStorage.getItem('userId');
    const customerDocuments = await (isAdmin && !id ? getDocuments() : getDocumentsByCustomerId(customerId));
    if (id) {
      setCurrentCustomer(customers.find(customer => customer.id === id));
    }

    setDocuments(customerDocuments);
    setFilteredDocuments(customerDocuments);
    setRangedDocuments(customerDocuments);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, [isAdmin]);

  const filterByDateRange = (item) => {
    const filteredDocuments = documents.filter(({ creationDate }) => {
      const creationDateNum = Date.parse(creationDate);
      const startDateNum = item.selection.startDate.getTime();
      const endDateNum = item.selection.endDate.getTime();      
      return creationDateNum >= startDateNum && creationDateNum <= endDateNum;
    });
    setFilteredDocuments(filteredDocuments)
    setRangedDocuments(filteredDocuments)
    setDateRange([item.selection]);
  };

  const filterTable = ({ target = {} }) => {
    const filteredDocuments = rangedDocuments.filter(({ documentNumber, documentType, creationDate, openedAt, customerName = '', email = '' }) => {
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
      <div className="page-content__title">
        {
          currentCustomer ? (
            <>
              <Button 
                classNames="theme-btn"
                text={formatMessage(messages.backButton)}
                onClickHandler={() => history.goBack()}
              />
              <span>{currentCustomer.customerName} - </span>
            </> 
          ) : null
        }
        {formatMessage(messages.documents)} - {filteredDocuments.length} {formatMessage(messages.of)} {documents.length}
      </div>
        <div className="page-content__range-wrapper">
          <span className="range-title">Date range:</span> {
            dateRange[0].startDate && dateRange[0].endDate ?
              `${formatDate(dateRange[0].startDate)} - ${formatDate(dateRange[0].endDate)}` :
              'All time'
          }
          <Button classNames="theme-btn" text={'Edit'} onClickHandler={handleShow} />
        </div>
        <DateRangeModal 
          isActive={showDateRangeModal}
          onClose={handleClose}
          dateRange={dateRange}
          onDateChange={filterByDateRange}
        />
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
