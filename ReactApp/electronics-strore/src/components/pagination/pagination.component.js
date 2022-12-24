import * as React from "react";
import PropTypes from 'prop-types';
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import PaginationParameters from "../../types/url-parameters/pagination.parameters";


const defaultPageSize = PaginationParameters.defaultPageSize;
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

  const { itemsCount, pagination } = props;
  const [page, setPage] = React.useState(() => {
    const initialState = pageNumberGuard();
    return initialState;
  });
  const [itemsPerPage, setItemsPerPage] = React.useState(() => {
    const initialState = pageSizeGuard();
    return initialState;
  });

  const navigate = useNavigate();
  console.log(itemsCount);

  /**
   * Get the relative path to the current webpage
   * with pagination parameters as URL search parameters.
   * @param {number} newPage - number of page
   * @param {number} rows - number of items per page
   * @returns relative path to the current webpage with pagination parameters
   */
  const generateUrlPath = (newPage = page, rows = itemsPerPage) => {
    let url = new URL(window.location.href);
    let search = new URLSearchParams(url.search);
    const params = new PaginationParameters(rows, newPage);
    url.search = params.setParametersToUrl(search);
    let relativePath = url.pathname + url.search;
    return relativePath;
  };

  const handleChangePage = (event, newPage) => {
    let relativePath = generateUrlPath((newPage));
    setPage(newPage);
    navigate(relativePath);
  };

  const handleChangeitemsPerPage = (event) => {
    let pageSize = parseInt(event.target.value, 10);
    let relativePath = generateUrlPath(0, pageSize);
    setItemsPerPage(pageSize);
    setPage(0);
    navigate(relativePath);
  };

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={itemsCount}
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
  pagination: PropTypes.instanceOf(PaginationParameters).isRequired
};