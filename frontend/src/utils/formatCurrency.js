/**
 * Format a number as Indian Rupees (₹)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string like ₹1,234.56
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0.00';
  }

  const num = Number(amount);
  
  // Use Intl.NumberFormat for Indian numbering system
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Format a number as compact currency (e.g., ₹1.2K, ₹5.3L)
 */
export function formatCompactCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0';
  }

  const num = Number(amount);
  
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(1)}Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(1)}L`;
  } else if (num >= 1000) {
    return `₹${(num / 1000).toFixed(1)}K`;
  }
  
  return `₹${num.toFixed(0)}`;
}
