import type { ReactNode } from 'react';

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Splits `text` on every case-insensitive occurrence of `term` and wraps matches in <mark>.
 * Returns the plain text unchanged when there's no active search term or no match.
 */
export function highlightMatches(text: string, term: string): ReactNode {
  const needle = term.trim();
  if (!needle) return text;

  const regex = new RegExp(`(${escapeRegExp(needle)})`, 'gi');
  const parts = text.split(regex);
  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    part.toLowerCase() === needle.toLowerCase() ? (
      <mark key={i} className="jv-mark">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
