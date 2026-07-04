import { genres } from "../data.js";

/**
 * Service to retrieve genre titles from genre IDs.
 *
 * @principle SRP: Responsible for mapping genre IDs to names.
 */
export const genreService = {
  /**
   * Converts array of genre IDs to their corresponding genre titles.
   * @param {number[]} genreIds - Array of genre IDs.
   * @returns {string[]} Array of genre titles.
   */
  getNames(genreIds) {
    return genreIds.map(
      (id) => genres.find((g) => g.id === id)?.title || "Unknown",
    );
  },
};
