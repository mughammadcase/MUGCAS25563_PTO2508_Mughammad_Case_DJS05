/**
 * Utility for formatting podcast update dates into a human-readable format.
 *
 * @module formatDate
 */
export const formatDate = {
  /**
   * Converts an ISO date string into a readable date format.
   *
   * @param {string} dateStr - ISO date string received from the podcast API.
   * @returns {string} Formatted date string.
   */
  format(date) {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  },
};
