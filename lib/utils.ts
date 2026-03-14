export function getInitials(name: string) {
  return name.trim().slice(0, 1);
}

export function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 12) return "חדש היום";
  if (diffHours < 24) return "עודכן היום";
  if (diffDays === 1) return "לפני יום";
  if (diffDays === 2) return "לפני יומיים";
  if (diffDays < 7) return `לפני ${diffDays} ימים`;

  return date.toLocaleDateString("he-IL");
}
