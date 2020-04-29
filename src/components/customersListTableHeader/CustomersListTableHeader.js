import React from 'react';

import './CustomersListTableHeader.less';


const CustomersListTableHeader = () => {
  
  return (
    <thead className="table-header">
      <tr>
        <th>Customer name</th>
        <th>Email</th>
        <th>Account number</th>
        <th>Last login</th>
        <th>Action</th>
      </tr>
    </thead>
  );
};

export default CustomersListTableHeader;
