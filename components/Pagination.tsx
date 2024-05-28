import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = [];
    let startPage, endPage;

    if (totalPages <= 9) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 5) {
        startPage = 1;
        endPage = 9;
      } else if (currentPage >= totalPages - 4) {
        startPage = totalPages - 8;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 4;
      }
    }

    // Добавляем кнопку "предыдущая" страницы, если это не первая страница
    if (currentPage > 1) {
      pageButtons.push(
        <button
          key="prev"
          className="px-4 py-2 mx-1 rounded-xl bg-[#cecece]"
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;
        </button>
      );
    }

    // Добавляем кнопку первой страницы
    if (startPage > 1) {
      pageButtons.push(
        <button
          key={1}
          className={`px-4 py-2 mx-1 rounded-xl ${
            1 === currentPage ? "bg-[#7f7f7f] text-white" : "bg-[#cecece]"
          }`}
          onClick={() => onPageChange(1)}
        >
          {1}
        </button>
      );
      if (startPage > 2) {
        pageButtons.push(
          <span key="start-dots" className="px-4 py-2">
            ...
          </span>
        );
      }
    }

    // Добавляем кнопки между startPage и endPage
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`px-4 py-2 mx-1 rounded-xl ${
            i === currentPage ? "bg-[#7f7f7f] text-white" : "bg-[#cecece]"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Добавляем кнопку последней страницы
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <span key="end-dots" className="px-4 py-2">
            ...
          </span>
        );
      }
      pageButtons.push(
        <button
          key={totalPages}
          className={`px-4 py-2 mx-1 rounded-xl ${
            totalPages === currentPage
              ? "bg-[#7f7f7f] text-white"
              : "bg-[#cecece]"
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Добавляем кнопку "следующая" страницы, если это не последняя страница
    if (currentPage < totalPages) {
      pageButtons.push(
        <button
          key="next"
          className="px-4 py-2 mx-1 rounded-xl bg-[#cecece]"
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;
        </button>
      );
    }

    return pageButtons;
  };

  return <div>{renderPageButtons()}</div>;
};

export default Pagination;