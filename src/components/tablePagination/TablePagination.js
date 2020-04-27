import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

import './TablePagination.less';

const TablePagination = ({ rowsPerPage, totalRows, currentNumber, paginate }) => {  
  let pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginationItem = (number) => (
    <Pagination.Item 
      active={currentNumber === number}
      onClick={() => paginate(number)} key={number}
    >{number}</Pagination.Item>
  );

  const paginationItemFirst = () => <Pagination.First onClick={() => paginate(1)} />;
  const paginationItemPrev = () => <Pagination.Prev onClick={() => paginate(currentNumber > 1 ? currentNumber - 1 : currentNumber)}/>;
  const paginationItemNext = () => <Pagination.Next onClick={() => paginate(currentNumber < pageNumbers.length ? currentNumber + 1 : currentNumber)}/>;
  const paginationItemLast = () => <Pagination.Last onClick={() => paginate(pageNumbers.length)}/>;
  
  return (
    <Pagination className="table-pagination">
      {paginationItemFirst()}
      {paginationItemPrev()}      
      {pageNumbers.map(number => paginationItem(number))}
      {paginationItemNext()}
      {paginationItemLast()}
    </Pagination>
  );
};

export default TablePagination;