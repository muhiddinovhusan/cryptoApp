import { useCrypto } from "../crypto-managment/Context";
import {  ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ handlePageChange }: { handlePageChange: any }) => {
  const { state, dispatch } = useCrypto();

  const handleNextPage = () => {
    if (state.currentPage < state.totalPages) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage + 1 });
    }
  };

  const handlePreviousPage = () => {
    if (state.currentPage > 1) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage - 1 });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalNumbers = 5; 
    const totalBlocks = totalNumbers + 2;

    if (state.totalPages > totalBlocks) {
      let startPage = Math.max(2, state.currentPage - 2);
      let endPage = Math.min(state.totalPages - 1, state.currentPage + 2);
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (state.totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (endPage - startPage + 1);

      if (hasLeftSpill && !hasRightSpill) {
        startPage -= spillOffset;
      } else if (!hasLeftSpill && hasRightSpill) {
        endPage += spillOffset;
      }

      pageNumbers.push(1);
      if (hasLeftSpill) {
        pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (hasRightSpill) {
        pageNumbers.push('...');
      }
      pageNumbers.push(state.totalPages);
    } else {
      for (let i = 1; i <= state.totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center px-5 flex-wrap max-sm:gap-5 max-sm:justify-start  items-center my-4">
      <button
        onClick={handlePreviousPage}
        disabled={state.currentPage === 1}
        className=" text-white px-2 py-1 mx-2 rounded disabled:opacity-50"
      >
        <ChevronLeft/>
      </button>
      {renderPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          disabled={page === '...'}
          className={`px-4 py-2 mx-1   rounded-full ${
            state.currentPage === page ? 'bg-blue-500  text-white' : 'bg-inherit text-sky-300'
          } ${page === '...' ? 'cursor-default' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={state.currentPage === state.totalPages}
        className=" text-white px-4 py-2 mx-2 rounded disabled:opacity-50"
      >
        <ChevronRight/>
      </button>
    </div>
  );
};

export default Pagination;
