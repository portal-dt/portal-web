import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { NavLink, useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import { getDocumentsByCustomerId, getCustomers } from '../../utils/api';
import { messages } from './messages';

import Table from '../dashboardTable/DashboardTable';
import TablePagination from '../tablePagination/TablePagination';
import CustomersListTableHeader from '../customersListTableHeader/CustomersListTableHeader';
import Button from '../button/Button';
import { sortColumn } from '../../utils';
import { getCustomersAction } from '../../actions/actions';

import BootstrapTable from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './CustomersList.less';

const initialState = {
  customerName: { isAsc: false },
  accountNumbers: { isAsc: false },
  email: { isAsc: false },
  lastLogin: { isAsc: false }
};

const sortReducer = (state, { field }) => ({
  ...state,
  [field]: { isAsc: !state[field].isAsc }
});

const CustomersList = () => {
  const dispatch = useDispatch();
  const [sortState, sortStateUpdater] = useReducer(sortReducer, initialState);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const { formatMessage, formatDate } = useIntl();
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchCustomers = async () => {
      const customerId = localStorage.getItem('userId');
      setLoading(true);
      const customersList = await getCustomers();
      dispatch(getCustomersAction(customersList));
      setLoading(false);
      setCustomers(customersList);
      setFilteredCustomers(customersList);
    };
    fetchCustomers();    
  }, []);

  const filterTable = ({ target = {} }) => {
    const filteredCustomers = customers.filter(({ lastLogin, customerName = '', email = '' }) => {
      const filter = target.value.toLowerCase().trim();
      return (
        customerName.toLowerCase().trim().includes(filter) ||
        lastLogin.includes(filter) ||
        email.includes(filter)
      );
    });

    setFilteredCustomers(filteredCustomers);
  };

  const sort = ({ target = {} }) => {
    const tableDataSorted = sortColumn(filteredCustomers, target.id, sortState[target.id].isAsc);
    sortStateUpdater({ field: target.id });
    setCustomers(tableDataSorted);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const TableHeader = <CustomersListTableHeader onInputChange={filterTable} sort={sort} sortState={sortState} />;

  const TableRow = ({customerName, accountNumbers, email, lastLogin, id}) => {
    return (
      <tr>
        <td>{customerName}</td>
        <td>{email}</td>
        <td>
          {accountNumbers.map((number, i) => <p key={i}>{number}</p>)}
        </td>
        <td>{formatDate(lastLogin) || 'none'}</td>
        <td>
          <Button 
            classNames="theme-btn"
            text={formatMessage(messages.documents)}
            onClickHandler={() => history.push(`customers/${id}`)}
          />
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="page-content__title">{formatMessage(messages.customersTitle)}</div>
      {loading ?
        <div className="page-content__spinner">
          <Spinner variant="primary" animation="border" />
        </div> :
        <>
          <Table
            tableData={currentRows}
            TableHeader={TableHeader}
            TableRow={TableRow}
          />
          <TablePagination
            rowsPerPage={rowsPerPage}
            totalRows={customers.length}
            paginate={paginate}
            currentNumber={currentPage}
          />
        </>
      }
    </>
  );
};

export default CustomersList;
