"use client";

import { useState } from "react";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import type { Listing } from "@/lib/types";

export function BarterOfferModal({ listing }: { listing: Listing }) {
  const [open, setOpen] = useState(false);

  const message = `היי ${listing.name}, אשמח שנעשה בארטר!\n\nראיתי שאת/ה מציע/ה ${listing.title} וזה בדיוק מה שחיפשתי.\nבתמורה, אני יכול/ה להציע לך [השירות שלי].\n\nאיך זה יכול לעבוד?\nאני מציע/ה שנעשה החלפה של [כמות זמן/תוצר] שלי מול [כמות זמן/תוצר] שלך.\n\nאפשר לראות עבודות קודמות שלי בפרופיל כאן באתר.\nמה דעתך? נשמע לך רלוונטי?`;

  return (
    <>
      <button className="btn btn-secondary small" onClick={() => setOpen(true)} aria-label={`שליחת הצעת בארטר ל${listing.name}`}>
        <MessageCircle className="icon-xs" aria-hidden="true" />
        שלחי הצעת בארטר
      </button>

      {open ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby={`offer-title-${listing.id}`}>
          <div className="modal-card card">
            <div className="modal-head">
              <div>
                <p className="mini-label">תבנית מוכנה לשליחה</p>
                <h3 id={`offer-title-${listing.id}`}>הצעת בארטר אל {listing.name}</h3>
              </div>
              <button className="icon-button" onClick={() => setOpen(false)} aria-label="סגירת חלון הצעת בארטר">
                <X className="icon-sm" aria-hidden="true" />
              </button>
            </div>

            <div className="offer-template modal-template">
              <p><strong>נושא:</strong> היי {listing.name}, אשמח שנעשה בארטר!</p>
              <p className="offer-inline-note">מבוסס על המודעה: {listing.title}</p>
              <textarea readOnly value={message} className="offer-textarea" aria-label="נוסח הצעת הבארטר" />
            </div>

            <div className="footer-actions">
              <button className="btn btn-primary" onClick={() => setOpen(false)} aria-label="אישור והמשך לשליחה עתידית">
                <SendHorizontal className="icon-sm" aria-hidden="true" />
                שמרי כנוסח מוכן
              </button>
              <button className="btn btn-secondary" onClick={() => setOpen(false)} aria-label="סגירת החלון">
                סגירה
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
