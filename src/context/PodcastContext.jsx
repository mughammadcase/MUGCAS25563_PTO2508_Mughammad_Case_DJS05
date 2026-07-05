import { createContext, useEffect, useState } from "react";
import { fetchPodcasts } from "../api/fetchPodcasts";

export const PodcastContext = createContext();

/**
 * Provides global podcast state and derived podcast data to the application.
 *
 * This provider is responsible for:
 * - fetching podcast data from the API
 * - storing loading and error state
 * - managing search, sorting, genre filter, and pagination state
 * - deriving the visible podcast list by applying filtering, sorting, and pagination
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components rendered inside the provider.
 * @returns {JSX.Element} Podcast context provider.
 */
export function PodcastProvider({ children }) {
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("date-desc");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [currentPage, setCurrentPage] = useState(1); // For tracking which page the user is on.

  const PODCASTS_PER_PAGE = 12;

  useEffect(() => {
    async function loadPodcasts() {
      try {
        const data = await fetchPodcasts();
        setAllPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPodcasts();
  }, []);

  const filteredPodcasts = allPodcasts.filter((podcast) => {
    const matchesSearch = podcast.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase().trim());

    const matchesGenre =
      selectedGenre === "all" || podcast.genres.includes(Number(selectedGenre));

    return matchesSearch && matchesGenre;
  });

  // sortedPodcasts = full processed list
  const sortedPodcasts = [...filteredPodcasts].sort((a, b) => {
    switch (sortOrder) {
      case "date-desc":
        return new Date(b.updated) - new Date(a.updated);

      case "date-asc":
        return new Date(a.updated) - new Date(b.updated);

      case "title-asc":
        return a.title.localeCompare(b.title);

      case "title-desc":
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedPodcasts.length / PODCASTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PODCASTS_PER_PAGE;
  const endIndex = startIndex + PODCASTS_PER_PAGE;

  // podcasts = just current page slice
  const podcasts = sortedPodcasts.slice(startIndex, endIndex);

  // Resets user back to page 1 when result criteria
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTitle, sortOrder, selectedGenre]);

  const value = {
    allPodcasts,
    podcasts,
    loading,
    error,
    searchTitle,
    setSearchTitle,
    sortOrder,
    setSortOrder,
    selectedGenre,
    setSelectedGenre,
    currentPage,
    setCurrentPage,
    totalPages,
    totalResults: sortedPodcasts.length,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
