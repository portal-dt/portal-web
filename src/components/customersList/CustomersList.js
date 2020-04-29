import React, { useState, useEffect, useReducer } from 'react';
import { useIntl } from 'react-intl';
import Spinner from 'react-bootstrap/Spinner';

import { getDocumentsByCustomerId, getCustomers } from '../../utils/api';
import { messages } from './messages';

import Table from '../dashboardTable/DashboardTable';
import TablePagination from '../tablePagination/TablePagination';

import CustomersListTableHeader from '../customersListTableHeader/CustomersListTableHeader';

import './CustomersList.less';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { formatMessage } = useIntl();
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchCustomers = async () => {
      const customerId = localStorage.getItem('userId');
      setLoading(true);
      const customersList = await getCustomers();
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

  const TableRow = ({customerName, accountNumber, email, lastLogin}) => {
    return (
      <tr>
        <td>{accountNumber}</td>
        <td>{customerName}</td>
        <td>{email}</td>
        <td>{lastLogin || 'none'}</td>
        <td>action</td>
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
        </>
      }
    </>
  );
};

export default CustomersList;
