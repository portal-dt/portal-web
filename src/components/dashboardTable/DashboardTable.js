import React, { cloneElement, useState } from 'react';
// import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import './DashboardTable.less';

const Table = ({ loading = false, tableData = [], TableRow, TableHeader }) => {
  const renderTableData = () => tableData.map(({ ...data }, index) => <TableRow key={index} { ...data } />);

  
  return (
    <BootstrapTable className="dashboard-table" striped bordered responsive>
      {cloneElement(TableHeader)}
      <tbody>
        {loading ? <Spinner animation="border" /> : renderTableData()}
      </tbody>
    </BootstrapTable>
  );
};

// Table.propTypes = {
//
// };

export default Table;