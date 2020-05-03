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

import { getCustomersAction } from '../../actions/actions';
import BootstrapTable from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

import './CustomersList.less';

const CustomersList = () => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const { formatMessage } = useIntl();
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchCustomers = async () => {
      const customerId = localStorage.getItem('userId');
      setLoading(true);
      const customersList = await getCustomers();
      dispatch(getCustomersAction(customersList));
      setLoading(false);
      setCustomers(customersList);
    };
    fetchCustomers();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = customers.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const TableHeader = <CustomersListTableHeader />;

  const TableRow = ({customerName, accountNumbers, email, lastLogin, id}) => {    
    return (
      <tr>
        <td>{customerName}</td>
        <td>{email}</td>
        <td>
          {accountNumbers.map((number, i) => <p key={i}>{number}</p>)}
        </td>
        <td>{lastLogin || 'none'}</td>
        <td>
          <Button className="header__link" onClick={() => history.push(`customers/${id}`)}>
            Documents                    
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="page-content__title">Customers</div>
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
