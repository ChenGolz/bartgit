import { SearchX } from "lucide-react";

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="card empty-state">
      <SearchX className="icon-lg" />
      <h3>אופס, לא מצאנו מודעה כזו</h3>
      <p>אולי תהיי הראשונה להציע את השירות הזה, או נסי קטגוריה אחרת.</p>
      <button className="btn btn-primary" onClick={onReset} aria-label="איפוס חיפוש וסינון">
        נקה חיפוש
      </button>
    </div>
  );
}
