import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPodcastById } from "../api/fetchPodcasts";
import { genreService } from "../utils/genreService";
import { formatDate } from "../utils/formatDate";
import styles from "../styles/ShowDetails.module.css";

/**
 * Displays information about a selected podcast.
 *
 * @returns {JSX.Element}
 */
export default function ShowDetails() {
  const { id } = useParams();

  const [podcast, setPodcast] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);

  // The currently selected season based on the dropdown selection
  const season = podcast?.seasons[selectedSeason];

  // Calculates the number of episodes in the currently selected season.
  const episodeCount = season?.episodes.length ?? 0;

  const genreNames = podcast ? genreService.getNames(podcast.genres) : [];
  const updatedDate = podcast ? formatDate.format(podcast.updated) : "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPodcast() {
      try {
        const data = await fetchPodcastById(id);
        setPodcast(data);
        setSelectedSeason(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPodcast();
  }, [id]);

  if (loading) {
    return (
      <main className={styles.page}>
        <section className={styles.messageContainer} role="status">
          <div className={styles.spinner}></div>
          <p>Loading podcast...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <section className={styles.messageContainer} role="alert">
          <h2>Unable to load podcast</h2>
          <p>{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.summaryCard}>
        <img
          src={podcast.image}
          alt={podcast.title}
          className={styles.coverImage}
        />

        <div className={styles.summaryContent}>
          <h1>{podcast.title}</h1>

          <p className={styles.description}>{podcast.description}</p>

          <div className={styles.infoGrid}>
            <div>
              <h3>Genres</h3>
            </div>

            <div>
              <h3>Last Updated</h3>

              <p>{updatedDate}</p>
            </div>

            <div>
              <h3>Total Seasons</h3>

              <p>{podcast.seasons.length} Seasons</p>
            </div>

            <div>
              <h3>Total Episodes</h3>

              <p>
                {podcast.seasons.reduce(
                  (total, season) => total + season.episodes.length,
                  0,
                )}{" "}
                Episodes
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2>Current Season</h2>

          <select
            className={styles.seasonSelect}
            value={selectedSeason}
            onChange={(event) => setSelectedSeason(Number(event.target.value))}
          >
            {podcast.seasons.map((season, index) => (
              <option key={season.season} value={index}>
                {`Season ${index + 1}: ${season.title}`}
              </option>
            ))}
          </select>
        </div>
        <h2>Episodes</h2>

        <ul>
          {season.episodes.map((episode) => {
            const description = episode.description || "";

            return (
              <li key={episode.episode}>
                <img src={season.image} alt={season.title} />

                <h3>
                  Episode {episode.episode}: {episode.title}
                </h3>

                <p>
                  {description.length > 180
                    ? `${description.slice(0, 180)}...`
                    : description || "No description available."}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.seasonCard}>
        <img
          src={season.image}
          alt={season.title}
          className={styles.seasonImage}
        />

        <div className={styles.seasonInfo}>
          <h3>{season.title}</h3>

          <p className={styles.seasonDescription}>{season.description}</p>

          <p className={styles.seasonMeta}>{season.episodes.length} Episodes</p>
        </div>
      </section>
    </main>
  );
}
