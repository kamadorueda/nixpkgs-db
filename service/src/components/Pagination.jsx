import React, { useEffect, useState } from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

export const Pagination = (props) => {
  const { renderCaption, resultPerPage, results, setResultsOnPage, } = props;

  const [page, setPage] = useState(1);

  const [endPage, startPage] = [
    Math.min((page - 1) * resultPerPage + 1, results.length),
    Math.min((page - 0) * resultPerPage + 0, results.length),
  ];

  const changePage = (delta) => () => {
    setPage(page + delta);
  };

  useEffect(() => {
    setPage(1);
  }, [results]);

  useEffect(() => {
    setResultsOnPage(results.slice(startPage - 1, endPage));
  }, [endPage, results, setResultsOnPage, startPage]);

  return (
    <BootstrapPagination>
      <BootstrapPagination.Prev
        disabled={page === 1}
        onClick={changePage(-1)}
      />
      <BootstrapPagination.Item disabled={true}>
        {renderCaption({
          endPage,
          startPage,
          resultsLength: results.length,
        })}
      </BootstrapPagination.Item>
      <BootstrapPagination.Next
        disabled={page * resultPerPage > results.length}
        onClick={changePage(+1)}
      />
    </BootstrapPagination>
  );
}
