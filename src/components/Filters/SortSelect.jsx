import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "../../styles/SortSelect.module.css";

/**
 * Dropdown for selecting podcast sort order.
 *
 * @returns {JSX.Element}
 */
export default function SortSelect() {
  const { sortOrder, setSortOrder } = useContext(PodcastContext);

  function handleChange(event) {
    setSortOrder(event.target.value);
  }

  return (
    <div className={styles.sortSelect}>
      <label htmlFor="podcast-sort" className={styles.label}>
        Sort by:
      </label>

      <select
        id="podcast-sort"
        value={sortOrder}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
      </select>
    </div>
  );
}
