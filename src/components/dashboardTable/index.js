import React from 'react';
// import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap/Table';

import './index.css';

const Table = ({ tableData, TableRow, TableHeader }) => {
  const renderTableData = () => tableData.map(({ ...data }, index) => <TableRow key={index} { ...data } />);

  return (
    <div className="dashboard-table">
      {/* TODO: action-bar should be component */}
      <div className="dashboard-table__action-bar"></div>
      <BootstrapTable>
        <TableHeader/>
        <tbody>
          {renderTableData()}
        </tbody>
      </BootstrapTable>
    </div>
  );
};

// Table.propTypes = {
//
// };

export default Table;