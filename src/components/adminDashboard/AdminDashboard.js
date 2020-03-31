import React, { useState, useEffect } from 'react';

import { getCustomers } from '../../utils/api';

import ControlBar from '../controlBar/ControlBar';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Table from '../dashboardTable/DashboardTable';
import AdminTableHeader from '../adminTableHeader/AdminTableHeader';
import AdminTableRow from '../adminTableRow/AdminTableRow';
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