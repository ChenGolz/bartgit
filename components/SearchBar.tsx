import { Search } from "lucide-react";
import type { KeyboardEvent } from "react";

export function SearchBar({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="search-box" role="search" aria-label="חיפוש שירותים באתר">
      <Search className="icon-sm muted" aria-hidden="true" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="מה חסר לך היום? למשל: שיעור גיטרה, עיצוב לוגו..."
        aria-label="חיפוש שירותים"
      />
      <button className="btn btn-primary search-btn" onClick={onSubmit} aria-label="ביצוע חיפוש">
        חיפוש
      </button>
    </div>
  );
}
