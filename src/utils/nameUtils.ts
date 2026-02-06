
export const extractNameFromEmail = (email: string): string => {
  if (!email || !email.includes('@')) {
    return 'User';
  }

  // Get everything before the @ symbol
  const localPart = email.split('@')[0];

  // Remove all numbers from the email
  let cleanName = localPart.replace(/[0-9]/g, '');

  // Replace common separators (dots, underscores, hyphens, plus signs) with spaces
  cleanName = cleanName.replace(/[._\-+]/g, ' ');

  // Split by spaces and get the first word
  const nameParts = cleanName.trim().split(/\s+/).filter(part => part.length > 0);

  if (nameParts.length === 0) {
    // Fallback: if no valid name parts, use first 5 chars of original email
    const fallback = localPart.substring(0, 5);
    return fallback.charAt(0).toUpperCase() + fallback.slice(1).toLowerCase();
  }

  // Get the first part and capitalize it properly
  const firstName = nameParts[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
};

/**
 * Gets display name from user object, prioritizing user.name over email extraction
 */
export const getDisplayName = (user: any): string => {
  if (!user) return 'User';

  // If user has a name field, use the first name only
  if (user.name && user.name.trim()) {
    const nameParts = user.name.trim().split(/\s+/);
    const firstName = nameParts[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  // If no name but has email, extract name from email
  if (user.email) {
    return extractNameFromEmail(user.email);
  }

  return 'User';
};

/**
 * Gets full display name (first + last) from user object
 */
export const getFullDisplayName = (user: any): string => {
  if (!user) return 'User';

  // If user has a name field, use it
  if (user.name && user.name.trim()) {
    return user.name.trim();
  }

  // If no name but has email, extract name from email
  if (user.email) {
    return extractNameFromEmail(user.email);
  }

  return 'User';
};