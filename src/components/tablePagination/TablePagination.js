import React from 'react';
import Pagination from 'react-bootstrap/Pagination'

import './TablePagination.less';

const TablePagination = ({ rowsPerPage, totalRows, currentNumber, paginate }) => {  
  let pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <Pagination className="table-pagination">
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev onClick={() => paginate(currentNumber > 1 ? currentNumber - 1 : currentNumber)}/>
      {pageNumbers.map(number => (
        <Pagination.Item 
          active={currentNumber === number}
          onClick={() => paginate(number)} key={number}
        >{number}</Pagination.Item>
      ))}
      
      <Pagination.Next onClick={() => paginate(currentNumber < pageNumbers.length ? currentNumber + 1 : currentNumber)}/>
      <Pagination.Last onClick={() => paginate(pageNumbers.length)}/>
    </Pagination>
  );
};

export default TablePagination;