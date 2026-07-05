import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPodcastById } from "../api/fetchPodcasts";
import { genreService } from "../utils/genreService";

/**
 * Displays information about a selected podcast.
 *
 * @returns {JSX.Element}
 */
export default function ShowDetails() {
  const { id } = useParams();

  const [podcast, setPodcast] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const season = podcast?.seasons[selectedSeason];
  const genreNames = podcast ? genreService.getNames(podcast.genres) : [];
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
    return <p>Loading podcast...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>{podcast.title}</h1>

      <img src={podcast.image} alt={podcast.title} width="300" />

      <p>
        <strong>Total Seasons:</strong> {podcast.seasons.length}
      </p>

      <p>
        <strong>Last updated:</strong>{" "}
        {new Date(podcast.updated).toLocaleDateString()}
      </p>

      <h2>Seasons</h2>

      <select
        value={selectedSeason}
        onChange={(event) => setSelectedSeason(Number(event.target.value))}
      >
        {podcast.seasons.map((season, index) => (
          <option key={season.season} value={index}>
            {season.title}
          </option>
        ))}
      </select>

      <p>{podcast.description}</p>

      <div>
        {genreNames.map((genre, index) => (
          <span key={`${genre}-${index}`}>{genre}</span>
        ))}
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
    </main>
  );
}
