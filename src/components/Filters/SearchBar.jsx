import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "../../styles/SearchBar.module.css";

/**
 * Search input for filtering podcasts by title.
 *
 * @returns {JSX.Element}
 */
export default function SearchBar() {
  const { searchTitle, setSearchTitle } = useContext(PodcastContext);

  function handleChange(event) {
    setSearchTitle(event.target.value);
  }

  return (
    <div className={styles.searchBar}>
      <label htmlFor="podcast-search" className={styles.label}>
        Search:
      </label>

      <input
        id="podcast-search"
        type="text"
        value={searchTitle}
        onChange={handleChange}
        placeholder="Search podcasts"
        className={styles.input}
      />
    </div>
  );
}
