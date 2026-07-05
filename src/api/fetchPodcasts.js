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
