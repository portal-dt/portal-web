import React from 'react';

import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

const CustomerTableHeader = () => (
  <thead>
    <tr>
      <th>Document Number <ArrowUp/></th>
      <th>Document Type <ArrowDown/></th>
      <th>Date <ArrowUp/></th>
      <th>Status <ArrowUp/></th>
      <th><input type="text" placeholder="Search..." /></th>
    </tr>
  </thead>
);

export default CustomerTableHeader;