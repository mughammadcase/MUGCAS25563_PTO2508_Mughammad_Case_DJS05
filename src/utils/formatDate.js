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
  format(dateStr) {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;
  },
};
