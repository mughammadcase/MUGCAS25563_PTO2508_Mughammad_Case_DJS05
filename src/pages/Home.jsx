import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import PodcastGrid from "../components/Podcasts/PodcastGrid";
import SearchBar from "../components/Filters/SearchBar";
import SortSelect from "../components/Filters/SortSelect";
import GenreFilter from "../components/Filters/GenreFilter";
import Pagination from "../components/UI/Pagination";
import styles from "../styles/App.module.css";

/**
 * Home page of podcast application
 *
 * Renders the podcast browsing interface, including controls, loading/error states, podcast results, pagination, and empty states.
 *
 * @returns {JSX.Element} Home page UI.
 */
export default function Home() {
  const { podcasts, loading, error, searchTitle, selectedGenre } =
    useContext(PodcastContext);

  return (
    <main className={styles.appMain}>
      <section className={styles.controls}>
        <SearchBar />
        <SortSelect />
        <GenreFilter />
      </section>

      {loading && (
        <section className={styles.messageContainer} role="status">
          <div className={styles.spinner}></div>
          <p>Loading podcasts...</p>
        </section>
      )}

      {!loading && error && (
        <section className={styles.messageContainer} role="alert">
          <p className={styles.errorMessage}>Error loading podcasts: {error}</p>
        </section>
      )}

      {!loading && !error && podcasts.length > 0 && (
        <>
          <PodcastGrid podcasts={podcasts} />
          <Pagination />
        </>
      )}

      {!loading && !error && podcasts.length === 0 && (
        <section className={styles.messageContainer}>
          <h2>No podcasts found</h2>
          <p>
            {searchTitle.trim() || selectedGenre !== "all"
              ? "No podcasts matched your current search or filter. Try adjusting your search term or selected genre."
              : "No podcasts are available right now."}
          </p>
        </section>
      )}
    </main>
  );
}
