/**
 * Fetches podcast data from the external API.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of podcast objects
 */
export async function fetchPodcasts() {
  const response = await fetch("https://podcast-api.netlify.app/");

  if (!response.ok) {
    throw new Error("Failed to fetch podcasts from API");
  }

  return response.json();
}

/**
 * Fetches a single podcast by ID
 *
 * @async
 * @param {string} id Podcast ID
 * @returns {Promise<Object>}
 */
export async function fetchPodcastById(id) {
  const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch podcast");
  }

  return response.json();
}
