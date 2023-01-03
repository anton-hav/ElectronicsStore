import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TablePagination from "@mui/material/TablePagination";
import PaginationParameters from "../../types/url-parameters/pagination.parameters";

const defaultPageSize = PaginationParameters.defaultPageSize;

/**
 * Scale page size settings
 */
const rowsPerPageOptions = [
  defaultPageSize,
  defaultPageSize * 3,
  defaultPageSize * 5,
];

/**
 * Paginator based on URL routing.
 * @param {Object} props - props object that contains total count of items and PaginatorParameters
 * @returns React Component
 */
export default function RouteBasedPagination(props) {
  /**
   * Initial page value guard
   * @returns number of the page
   */
  const pageNumberGuard = () => {
    // The Pagination page starts at 1
    // to match the requirement of including the value in the URL.
    // Therefore, when passing a value from the PageNumber property to the state Page,
    // the value of the PageNumber property must be decreased by 1.
    if (pagination.pageNumber < 1) {
      return 0;
    } else if (pagination.pageNumber * pagination.pageSize > itemsCount) {
      return Math.ceil(itemsCount / pagination.pageSize) - 1;
    } else {
      return pagination.pageNumber - 1;
    }
  };

  /**
   * Initial page size value guard
   * @returns page size
   */
  const pageSizeGuard = () => {
    if (!rowsPerPageOptions.includes(pagination.pageSize)) {
      return defaultPageSize;
    } else {
      return pagination.pageSize;
    }
  };

  const { itemsCount, pagination, onChange } = props;
  const [page, setPage] = useState(() => {
    const initialState = pageNumberGuard();
    return initialState;
  });
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const initialState = pageSizeGuard();
    return initialState;
  });

  useEffect(() => {
    if (pagination.pageNumber !== page + 1) {
      setPage(pagination.pageNumber - 1);
    }
  });

  /**
   * Handles change page number.
   * @param {*} event - React event.
   * @param {*} newPage - new page number.
   */
  const handleChangePage = (event, newPage) => {
    const paginationParameters = new PaginationParameters(
      itemsPerPage,
      newPage
    );
    onChange(paginationParameters);
  };

  /**
   * Handles change page size.
   * @param {*} event - React event.
   */
  const handleChangeitemsPerPage = (event) => {
    let pageSize = parseInt(event.target.value, 10);
    const paginationParameters = new PaginationParameters(pageSize, 0);
    setItemsPerPage(pageSize);
    setPage(0);
    onChange(paginationParameters);
  };

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={itemsCount}
      labelDisplayedRows={(from = page) =>
        `${from.from}-${from.to === -1 ? from.count : from.to} of ${from.count}`
      }
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={itemsPerPage}
      onRowsPerPageChange={handleChangeitemsPerPage}
      labelRowsPerPage="Items per page"
    />
  );
}

RouteBasedPagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pagination: PropTypes.instanceOf(PaginationParameters).isRequired,
};
