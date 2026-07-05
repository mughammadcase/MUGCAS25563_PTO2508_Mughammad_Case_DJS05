import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPodcastById } from "../api/fetchPodcasts";

/**
 * Displays information about a selected podcast.
 *
 * @returns {JSX.Element}
 */
export default function ShowDetails() {
  const { id } = useParams();

  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPodcast() {
      try {
        const data = await fetchPodcastById(id);
        setPodcast(data);
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

      <p>{podcast.description}</p>
    </main>
  );
}
