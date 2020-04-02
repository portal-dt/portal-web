import React, { cloneElement } from 'react';
// import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap/Table';

import './DashboardTable.less';

const Table = ({ tableData = [], TableRow, TableHeader }) => {
  const renderTableData = () => tableData.map(({ ...data }, index) => <TableRow key={index} { ...data } />);

  return (
    <BootstrapTable className="dashboard-table" striped bordered responsive>
      {cloneElement(TableHeader)}
      <tbody>
        {renderTableData()}
      </tbody>
    </BootstrapTable>
  );
};

// Table.propTypes = {
//
// };

export default Table;