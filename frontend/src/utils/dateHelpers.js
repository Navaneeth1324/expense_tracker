/**
 * Format a date string to a readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date like "10 Nov 2026"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format a date string to a short format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date like "10 Nov"
 */
export function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getToday() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get the first day of the current month in YYYY-MM-DD format
 */
export function getMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
}

/**
 * Get the last day of the current month in YYYY-MM-DD format
 */
export function getMonthEnd() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
}

/**
 * Get the current month range as { start, end }
 */
export function getCurrentMonthRange() {
  return {
    start: getMonthStart(),
    end: getMonthEnd(),
  };
}

/**
 * Get date range for last N months
 * @param {number} months - Number of months back
 */
export function getLastNMonthsRange(months = 6) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
  return {
    start: start.toISOString().split('T')[0],
    end: getMonthEnd(),
  };
}

/**
 * Format a date to relative time (e.g., "2 hours ago", "Yesterday")
 */
export function getRelativeTime(dateStr) {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

/**
 * Get month name from a month number (0-11) or date string
 */
export function getMonthName(monthOrDate) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (typeof monthOrDate === 'number') {
    return months[monthOrDate];
  }
  const date = new Date(monthOrDate);
  return months[date.getMonth()];
}
