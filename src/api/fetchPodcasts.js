/**
 * Fetches podcast data from the external API.
 *
 * This function is called when the application loads and returns the full collection of podcasts used throughout the application.
 *
 * @async
 * @throws {Error} Throws an error if the request is unsuccessful.
 * @returns {Promise<Object[]>} Array of podcast objects.
 */
export async function fetchPodcasts() {
  const response = await fetch("https://podcast-api.netlify.app/");

  if (!response.ok) {
    throw new Error("Failed to fetch podcasts from API");
  }

  return response.json();
}
