import React from 'react';

import Pagination from 'react-bootstrap/Pagination'

const TablePagination = ({ rowsPerPage, totalRows, paginate }) => {  
  let pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev />
      {pageNumbers.map(number => (
        <Pagination.Item onClick={() => paginate(number)} key={number}>{number}</Pagination.Item>
      ))}
      
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default TablePagination;