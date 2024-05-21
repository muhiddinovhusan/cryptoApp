import { useCrypto } from "../crypto-managment/Context";

const Pagination = ({ handlePageChange }  : {handlePageChange:any}) => {
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

  return (
    <div className="flex justify-center items-center my-4">
      <button
        onClick={handlePreviousPage}
        disabled={state.currentPage === 1}
        className="bg-gray-500 text-white px-4 py-2 mx-2 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(state.totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 mx-1 rounded ${
            state.currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={state.currentPage === state.totalPages}
        className="bg-gray-500 text-white px-4 py-2 mx-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
