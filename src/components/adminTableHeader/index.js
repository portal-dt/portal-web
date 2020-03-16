import React from 'react';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

const AdminTableHeader = () => (
  <thead>
    <tr className="bg-secondary">
      <th><input type="checkbox"/></th>
      <th>Customer Name <ArrowUp/></th>
      <th>Customer ID <ArrowDown/></th>
      <th>Creation Date <ArrowUp/></th>
      <th>Contacts <ArrowUp/></th>
      <th>Status</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
);

export default AdminTableHeader;