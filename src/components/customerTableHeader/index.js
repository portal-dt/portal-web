import React from 'react';

import { ArrowUp, ArrowDown, Search } from 'react-bootstrap-icons';

const CustomerTableHeader = () => (
  <thead className="dashboard-table__header">
    <tr>
      <th>Document Name <ArrowUp/></th>
      <th>Document ID <ArrowDown/></th>
      <th>Creation Date <ArrowUp/></th>
      <th><input type="text" placeholder="Search..." /></th>
    </tr>
  </thead>
);

export default CustomerTableHeader;