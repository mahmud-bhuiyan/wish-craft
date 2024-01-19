import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Pagination = ({
  currentPage,
  totalPages,
  hasMorePrev,
  hasMoreNext,
  onPageChange,
}) => {
  return (
    <div className="flex">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasMorePrev}
        className="flex items-center px-3 py-1 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
      >
        <GrFormPrevious />
      </button>

      {[...Array(totalPages).keys()].map((pageNumber) => (
        <button
          key={pageNumber + 1}
          onClick={() => onPageChange(pageNumber + 1)}
          className={`items-center ${
            currentPage === pageNumber + 1
              ? "px-3 py-1 mx-1 text-white bg-blue-600 rounded"
              : "hidden px-3 py-1 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          }`}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMoreNext}
        className="flex items-center px-3 py-1 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default Pagination;
