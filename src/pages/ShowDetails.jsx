import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { fetchPodcastById } from "../api/fetchPodcasts";
import { PodcastContext } from "../context/PodcastContext";
import { genreService } from "../utils/genreService";
import { formatDate } from "../utils/formatDate";
import styles from "../styles/ShowDetails.module.css";

/**
 * Displays information about a selected podcast, including its summary,
 * season information, and episodes.
 *
 * @returns {JSX.Element}
 */
export default function ShowDetails() {
  const { id } = useParams();

  const { allPodcasts } = useContext(PodcastContext);
  const [podcast, setPodcast] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);
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

  // The currently selected season based on the dropdown selection.
  const season = podcast?.seasons[selectedSeason];

  const previewPodcast = allPodcasts.find((item) => item.id === id);
  const genreNames = genreService.getNames(previewPodcast?.genres ?? []);
  const updatedDate = podcast ? formatDate.format(podcast.updated) : "";

  // Calculates the total number of episodes across every season.
  const totalEpisodes = podcast
    ? podcast.seasons.reduce(
        (total, season) => total + season.episodes.length,
        0,
      )
    : 0;

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

  if (!podcast) {
    return (
      <main className={styles.page}>
        <section className={styles.messageContainer}>
          <h2>Podcast not found</h2>
          <p>This podcast could not be loaded.</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {/* Podcast Summary Card */}
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

              <div className={styles.genreList}>
                {genreNames.map((genre) => (
                  <span key={genre} className={styles.genreTag}>
                    {genre}
                  </span>
                ))}
              </div>
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
              <p>{totalEpisodes} Episodes</p>
            </div>
          </div>
        </div>
      </section>
      {/* Current Season */}
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

        <section className={styles.seasonCard}>
          {/* Season Summary */}
          <div className={styles.seasonSummary}>
            <img
              src={season.image}
              alt={season.title}
              className={styles.seasonImage}
            />

            <div className={styles.seasonInfo}>
              <h3>{season.title}</h3>

              <p className={styles.seasonDescription}>{season.description}</p>

              <p className={styles.seasonMeta}>
                {season.episodes.length} Episodes • {updatedDate}
              </p>
            </div>
          </div>

          {/* Episode List */}
          <div className={styles.episodesSection}>
            <ul className={styles.episodeGrid}>
              {season.episodes.map((episode) => {
                const description = episode.description || "";

                return (
                  <li key={episode.episode} className={styles.episodeCard}>
                    <img
                      src={season.image}
                      alt={season.title}
                      className={styles.episodeImage}
                    />

                    <div className={styles.episodeContent}>
                      <h3>
                        Episode {episode.episode}: {episode.title}
                      </h3>

                      <p>
                        {description.length > 200
                          ? `${description.slice(0, 200)}...`
                          : description || "No description available."}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
