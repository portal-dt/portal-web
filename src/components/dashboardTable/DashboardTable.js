import React, { cloneElement, useState } from 'react';
// import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import './DashboardTable.less';

const Table = ({ loading = false, tableData = [], TableRow, TableHeader }) => {
  const renderTableData = () => tableData.map(({ ...data }, index) => <TableRow key={index} { ...data } />);
  const loadingSpinner = () => (
    <tr>
      <td colSpan="9" className="dashboard-table__spinner">
        <Spinner variant="primary" animation="border" />
      </td>
    </tr>
  );

  return (
    <BootstrapTable className="dashboard-table" striped bordered responsive>
      {cloneElement(TableHeader)}
      <tbody>
        {loading ? loadingSpinner() : renderTableData()}
      </tbody>
    </BootstrapTable>
  );
};

// Table.propTypes = {
//
// };

export default Table;