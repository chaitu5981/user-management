const Pagination = ({
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  noOfPages,
}) => {
  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-blue-500 disabled:text-gray-500 underline"
        >
          Previous
        </button>
        <div>
          <span>Rows per page : </span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-2"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <button
          onClick={() =>
            currentPage < noOfPages && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === noOfPages}
          className="text-blue-500 disabled:text-gray-500 underline"
        >
          Next
        </button>
      </div>
      <p>
        Page {currentPage} of {noOfPages}
      </p>
    </div>
  );
};
export default Pagination;
