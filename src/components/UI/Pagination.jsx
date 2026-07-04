import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "../../styles/Pagination.module.css";

/**
 * Display pagination controls for navigating between podcast pages.
 *
 * @returns {JSX.Element | null}
 */
export default function Pagination() {
  const { currentPage, setCurrentPage, totalPages } =
    useContext(PodcastContext);

  // Pagination dissappears when only one or no page displays
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePageClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <nav className={styles.pagination} aria-label="Podcast pagination">
      <button
        type="button"
        className={styles.navButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className={styles.pageDots}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`${styles.dot} ${
              currentPage === pageNumber ? styles.activeDot : ""
            }`}
            onClick={() => handlePageClick(pageNumber)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            <span className={styles.dotNumber}>{pageNumber}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.navButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}
