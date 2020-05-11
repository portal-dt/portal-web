import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { NavLink, useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Collapse from 'react-bootstrap/Collapse';

import { getCustomers } from '../../utils/api';
import { messages } from './messages';

import Table from '../dashboardTable/DashboardTable';
import TablePagination from '../tablePagination/TablePagination';
import CustomersListTableHeader from '../customersListTableHeader/CustomersListTableHeader';
import Button from '../button/Button';
import { sortColumn } from '../../utils';
import { getCustomersAction } from '../../actions/actions';

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
  const [showNumbers, setShowNumbers] = useState(false);
  const history = useHistory();
  const { formatMessage, formatDate } = useIntl();
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchCustomers = async () => {
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
    const filteredCustomers = customers.filter(({ lastLogin, accountNumbers = [], customerName = '', email = '' }) => {
      const filter = target.value.toLowerCase().trim();
      return (
        customerName.toLowerCase().trim().includes(filter) ||
        lastLogin.toString().includes(filter) ||
        email.includes(filter) ||
        accountNumbers.join(',').includes(filter)
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
        <td className="account-numbers">
          {
            accountNumbers.length > 1 ? (
              <>
                <button
                  className="account-numbers__btn"
                  onClick={() => setShowNumbers(!showNumbers)}
                  aria-controls="collapse-numbers"
                  aria-expanded={showNumbers}>{!showNumbers ? `${accountNumbers[0]}... more` : 'hide'}</button>
                <Collapse in={showNumbers}>
                  <div id="collapse-numbers">
                    {accountNumbers.map((number, i) => <p className="account-numbers__item" key={i}>{number}</p>)}
                  </div>
                </Collapse>
              </>
            ) : <div>{accountNumbers.map((number, i) => <p className="account-numbers__item" key={i}>{number}</p>)}</div>
          }
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
      <div className="page-content__title">
        {formatMessage(messages.customersTitle)} - {filteredCustomers.length} {formatMessage(messages.of)} {customers.length}
      </div>
      {loading ?
        <div className="page-content__spinner">
          <Spinner variant="warning" animation="border" />
        </div> :
        <>
          <Table
            tableData={currentRows}
            TableHeader={TableHeader}
            TableRow={TableRow}
          />
          {
            filteredCustomers.length > 5 &&
            <TablePagination
              rowsPerPage={rowsPerPage}
              totalRows={customers.length}
              paginate={paginate}
              currentNumber={currentPage}
            />
          }
        </>
      }
    </>
  );
};

export default CustomersList;
