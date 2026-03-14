import type { CategoryId } from "@/lib/types";
import type { Category } from "@/lib/types";

export function CategoryTabs({
  items,
  active,
  onChange,
}: {
  items: Category[];
  active: CategoryId;
  onChange: (value: CategoryId) => void;
}) {
  return (
    <div className="categories-row" role="tablist" aria-label="קטגוריות שירותים">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            className={`chip ${isActive ? "chip-active" : ""}`}
            onClick={() => onChange(item.id)}
            role="tab"
            aria-selected={isActive}
            aria-label={`סינון לפי ${item.label}`}
          >
            <Icon className="icon-sm" aria-hidden="true" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
