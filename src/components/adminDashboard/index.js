import React, { useState, useEffect } from 'react';

import { getCustomers } from '../../utils';

import ControlBar from '../controlBar';
import Header from '../header';
import Footer from '../footer';
import Table from '../dashboardTable';
import AdminTableHeader from '../adminTableHeader';
import AdminTableRow from '../adminTableRow';
import axios from "axios";

const tableData = [
  {
    customerName: 'Customer',
    customerId: '1',
    creationDate: '27 December 2020',
    contacts: '251-2345-1245',
    status: false,
  },
  {
    customerName: 'Customer',
    customerId: '1',
    creationDate: '27 December 2020',
    contacts: '251-2345-1245',
    status: true,
  },
  {
    customerName: 'Customer',
    customerId: '1',
    creationDate: '27 December 2020',
    contacts: '251-2345-1245',
    status: false,
  },
  {
    customerName: 'Customer',
    customerId: '1',
    creationDate: '27 December 2020',
    contacts: '251-2345-1245',
    status: true,
  }
];


const userName = 'ACCOUNT DETAILS';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data: { customers } } = await axios.get('http://127.0.0.1:3000/customers');
      setUsers(customers);
    };
    fetchCustomers();
  }, []);
  console.log(users);
  return (
    <>
      <Header userName={userName} />
      <div>Customers</div>
      <div>Partners</div>
      <ControlBar />
      <Table
        tableData={tableData}
        TableRow={AdminTableRow}
        TableHeader={AdminTableHeader}
      />
      <Footer/>
    </>
  );
};

export default AdminDashboard;