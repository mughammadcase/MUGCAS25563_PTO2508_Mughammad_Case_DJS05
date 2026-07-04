import { genreService } from "../../utils/genreService";
import { formatDate } from "../../utils/formatDate";
import styles from "../../styles/PodcastCard.module.css";

/**
 * Displays a preview of a podcast including its artwork, title, season count, genres, and last updated date.
 *
 * @param {Object} props - Component props
 * @param {Object} props.podcast - Podcast data object
 * @param {string} props.podcast.id - Unique podcast identifier
 * @param {string} props.podcast.title - Podcast title
 * @param {string} props.podcast.image - Podcast artwork URL
 * @param {number} props.podcast.seasons - Number of seasons
 * @param {number[]} props.podcast.genres - Array of genre IDs
 * @param {string} props.podcast.updated - ISO date string of last update
 * @returns {JSX.Element} Rendered podcast preview card
 */
export default function PodcastCard({ podcast }) {
  const genreNames = genreService.getNames(podcast.genres);
  const updatedDate = formatDate.format(podcast.updated);

  return (
    <article className={styles.card}>
      <img src={podcast.image} alt={podcast.title} className={styles.image} />

      <div className={styles.content}>
        <h2 className={styles.title}>{podcast.title}</h2>

        <p className={styles.seasons}>
          {podcast.seasons} season{podcast.seasons !== 1 ? "s" : ""}
        </p>

        <div className={styles.genres}>
          {genreNames.map((name) => (
            <span key={name} className={styles.genreTag}>
              {name}
            </span>
          ))}
        </div>

        <p className={styles.updated}>{updatedDate}</p>
      </div>
    </article>
  );
}
