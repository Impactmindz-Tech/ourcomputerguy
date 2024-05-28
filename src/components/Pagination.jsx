import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, handleItemsPerPageChange }) => {
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination items-center bg-white p-4 fixed w-full left-0 bottom-0">
            <div className="flex items-center justify-center gap-2">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    <KeyboardArrowLeftIcon />
                </button>
                <span className="mx-3">
                    <span className="font-bold">{currentPage}</span> / {totalPages}
                </span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    <KeyboardArrowRightIcon />
                </button>
            </div>
            <div className="items-per-page absolute right-52 top-4">
                <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
                <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className="border rounded p-1">
                    <option value={5}>5</option>
                    <option value={7}>7</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
