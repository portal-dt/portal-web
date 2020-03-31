import React from 'react';

import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

import './CustomerTableHeader.less';

const getSortArrow = isAsc => isAsc ? <ArrowUp/> : <ArrowDown/>;

const CustomerTableHeader = ({ onInputChange, sort, sortState }) => (
  <thead className="table-header">
    <tr>
      <th id="documentNumber" onClick={sort}>
        Document Number {getSortArrow(sortState['documentNumber'].isAsc)}
      </th>
      <th id="documentType" onClick={sort}>
        Document Type {getSortArrow(sortState['documentType'].isAsc)}
      </th>
      <th id="creationDate" onClick={sort}>
        Date {getSortArrow(sortState['creationDate'].isAsc)}
      </th>
      <th id="openedAt">
        Status
      </th>
      <th>
        <input type="text" placeholder="Filter by Status" onChange={onInputChange} />
      </th>
    </tr>
  </thead>
);

export default CustomerTableHeader;