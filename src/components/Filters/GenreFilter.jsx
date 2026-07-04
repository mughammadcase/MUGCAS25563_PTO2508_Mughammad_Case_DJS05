import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import { genres } from "../../data.js";
import styles from "../../styles/GenreFilter.module.css";

/**
 * Dropdown for filtering podcasts by genre.
 *
 * @returns {JSX.Element}
 */
export default function GenreFilter() {
  const { selectedGenre, setSelectedGenre } = useContext(PodcastContext);

  function handleChange(event) {
    setSelectedGenre(event.target.value);
  }

  return (
    <div className={styles.genreFilter}>
      <label htmlFor="genre-filter" className={styles.label}>
        Genre filter:
      </label>

      <select
        id="genre-filter"
        className={styles.select}
        value={selectedGenre}
        onChange={handleChange}
      >
        <option value="all">All Genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.title}
          </option>
        ))}
      </select>
    </div>
  );
}
