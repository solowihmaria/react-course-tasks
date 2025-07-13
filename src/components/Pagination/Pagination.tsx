import { Component } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

class Pagination extends Component<PaginationProps> {
  render() {
    const { currentPage, totalPages, onPageChange } = this.props;

    if (totalPages <= 1) return null;

    return (
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
