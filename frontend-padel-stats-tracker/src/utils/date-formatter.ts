export const formatDate = (date: Date | string): string => {
  if (!date) return '';

  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return '';
  }
};
