import React from 'react';
// import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap/Table';

const Table = ({ tableData, TableRow, TableHeader }) => {
  const renderTableData = () => tableData.map(({ ...data }, index) => <TableRow key={index} { ...data } />);

  return (
    <BootstrapTable >
      <TableHeader />
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