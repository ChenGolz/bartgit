import {
  BadgeCheck,
  Briefcase,
  Camera,
  GraduationCap,
  HeartHandshake,
  Laptop,
  MapPin,
  Star,
  Wrench,
} from "lucide-react";
import { BarterOfferModal } from "@/components/BarterOfferModal";
import type { Listing } from "@/lib/types";
import { formatRelativeDate, getInitials } from "@/lib/utils";

function ListingVisual({ listing }: { listing: Listing }) {
  const iconMap = {
    home: Wrench,
    business: Briefcase,
    wellness: HeartHandshake,
    tech: Laptop,
    lessons: GraduationCap,
    media: Camera,
  } as const;

  const Icon = iconMap[listing.category];

  return (
    <div className="listing-image" aria-hidden="true">
      <div className="listing-image-badge">ללא תמונה</div>
      <div className="listing-image-center">
        <Icon className="icon-lg" />
        <div className="listing-image-title">{listing.title}</div>
      </div>
    </div>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="card listing-card">
      <ListingVisual listing={listing} />

      <div className="listing-top-row">
        <div className="avatar-block">
          <div className="avatar">{getInitials(listing.name)}</div>
          <div>
            <strong>{listing.name}</strong>
            <div className="meta-row">
              <span>{listing.city}</span>
              <span className="dot" />
              <span>{listing.distance}</span>
            </div>
          </div>
        </div>

        <div className="distance-chip" aria-label={`מרחק מהמשתמש ${listing.distance}`}>
          <MapPin className="icon-xs" aria-hidden="true" />
          {listing.distance}
        </div>
      </div>

      <div className="listing-body">
        <div className="title-row">
          <h3>{listing.title}</h3>
          <span className="match-pill">{listing.matchScore}% התאמה</span>
        </div>

        <p>
          <strong>מציע/ה:</strong> {listing.offer}
        </p>
        <p>
          <strong>מחפש/ת:</strong> {listing.wants}
        </p>

        <div className="tags-row">
          {listing.tags.map((tag) => (
            <span key={tag} className="pill">
              {tag}
            </span>
          ))}
        </div>

        <div className="card-actions">
          <div className="meta-row rating-row">
            <span>
              <Star className="icon-xs star-fill" aria-hidden="true" /> {listing.rating.toFixed(1)}
            </span>
            {listing.verified ? (
              <span>
                <BadgeCheck className="icon-xs" aria-hidden="true" /> מאומת/ת
              </span>
            ) : (
              <span>חשבון לא מאומת</span>
            )}
            <span className="date-pill">{formatRelativeDate(listing.createdAt)}</span>
          </div>

          <BarterOfferModal listing={listing} />
        </div>
      </div>
    </article>
  );
}
