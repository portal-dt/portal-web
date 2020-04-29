import React from 'react';

import './CustomersListTableHeader.less';


const CustomersListTableHeader = () => {
  
  return (
    <thead className="table-header">
      <tr>
        <th>Account number</th>
        <th>Customer name</th>
        <th>Email</th>
        <th>Last login</th>
        <th>Action</th>
      </tr>
    </thead>
  );
};

export default CustomersListTableHeader;
