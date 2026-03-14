"use client";

import { useMemo, useState } from "react";
import {
  ArrowRightLeft,
  CheckCircle2,
  ChevronLeft,
  CircleHelp,
  Filter,
  Flag,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { EmptyState } from "@/components/EmptyState";
import { ListingCard } from "@/components/ListingCard";
import { SearchBar } from "@/components/SearchBar";
import { SectionTitle } from "@/components/SectionTitle";
import { categories, listings, smartMatches } from "@/lib/data";
import type { CategoryId } from "@/lib/types";
import { normalizeText } from "@/lib/utils";

export default function Page() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const appliedQuery = submittedQuery || query;

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const categoryMatch = activeCategory === "all" || item.category === activeCategory;
      const text = normalizeText(`${item.title} ${item.offer} ${item.wants} ${item.city} ${item.tags.join(" ")}`);
      const queryMatch = text.includes(normalizeText(appliedQuery));
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, appliedQuery]);

  const handleSearchSubmit = () => {
    setSubmittedQuery(query);
  };

  const resetFilters = () => {
    setQuery("");
    setSubmittedQuery("");
    setActiveCategory("all");
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy card">
          <div className="eyebrow">
            <ArrowRightLeft className="icon-sm" />
            זירת ההחלפות של ישראל
          </div>
          <h1>אל תשלמו בכסף, תשלמו בכישרון שלכם.</h1>
          <p>
            מצאו אנשים שצריכים את מה שיש לכם לתת, וקבלו בחזרה את מה שאתם באמת צריכים —
            מקומי, אנושי, מהיר ובגובה העיניים.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" aria-label="מעבר לטופס פרסום שירות">אני רוצה להציע שירות</button>
            <button className="btn btn-secondary" aria-label="מעבר לחיפוש שירותים">אני מחפש שירות</button>
          </div>

          <SearchBar value={query} onChange={setQuery} onSubmit={handleSearchSubmit} />

          <div className="trust-row">
            <div className="trust-item">
              <ShieldCheck className="icon-sm" />
              אימות משתמשים
            </div>
            <div className="trust-item">
              <Star className="icon-sm" />
              דירוגים וביקורות
            </div>
            <div className="trust-item">
              <MapPin className="icon-sm" />
              דגש על קרוב אליי
            </div>
          </div>
        </div>

        <div className="hero-card card">
          <div className="hero-card-top">
            <div>
              <p className="mini-label">התאמה חכמה</p>
              <h3>המערכת מחברת בין מה שאת מציעה למה שאת מחפשת</h3>
            </div>
            <span className="score">92%</span>
          </div>

          <div className="match-box">
            <div>
              <strong>את נותנת</strong>
              <p>ניהול עמוד אינסטגרם</p>
            </div>
            <div className="match-swap">
              <ArrowRightLeft className="icon-sm" />
            </div>
            <div>
              <strong>את מקבלת</strong>
              <p>צילומי תדמית לעסק</p>
            </div>
          </div>

          <ul className="match-list">
            {smartMatches.map((item) => (
              <li key={item}>
                <CheckCircle2 className="icon-sm" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section card">
        <div className="hero-copy">
          <SectionTitle
            title="איך זה עובד?"
            subtitle="3 צעדים פשוטים כדי להתחיל להחליף שירותים בצורה הוגנת, בטוחה ומקומית — כולל טיפ להצלחה: התחילו משעה תמורת שעה כדי לייצר תחושת הוגנות ברורה"
          />

          <div className="stack-grid section">
            <article className="step-card card">
              <div className="mini-label">שלב 1</div>
              <h3>מפרסמים</h3>
              <p>מעלים מודעה עם מה שאתם נותנים ומה הייתם רוצים לקבל בתמורה.</p>
            </article>
            <article className="step-card card">
              <div className="mini-label">שלב 2</div>
              <h3>מתכתבים</h3>
              <p>מוצאים התאמה, שולחים הצעת בארטר ברורה וסוגרים את הפרטים בצ׳אט.</p>
            </article>
            <article className="step-card card">
              <div className="mini-label">שלב 3</div>
              <h3>מחליפים</h3>
              <p>נותנים שירות, מקבלים שירות, ומשאירים ביקורת שבונה אמון בקהילה.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="feed-header">
          <SectionTitle
            title="טרנדים עכשיו"
            subtitle="קטגוריות חמות בישראל — עם דגש על החלפות קרובות, אמינות ושימושיות"
          />
          <div className="feed-tools">
            <span className="mini-label">
              <Filter className="icon-sm" />
              סינון מהיר
            </span>
          </div>
        </div>

        <CategoryTabs items={categories} active={activeCategory} onChange={setActiveCategory} />
      </section>

      <section className="section">
        <div className="feed-header">
          <SectionTitle
            title="פיד מודעות אחרונות"
            subtitle="כרטיסיות עם התאמה חכמה, מרחק מהמשתמש וקריאה ברורה לפעולה"
          />
          <span className="mini-label">{filteredListings.length} תוצאות</span>
        </div>

        {filteredListings.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div className="listings-grid">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>

      <section className="section two-col">
        <div className="card stack-col" style={{ padding: 24 }}>
          <SectionTitle
            title="הצעת בארטר מוכנה לשליחה"
            subtitle="תבנית מכבדת, ברורה וקונקרטית שאפשר לשלב בצ׳אט הפנימי"
          />
          <div className="offer-template">
            <p><strong>נושא:</strong> היי [שם המשתמש], אשמח שנעשה בארטר!</p>
            <p>
              ראיתי שאת/ה מציע/ה <strong>[שם השירות]</strong> וזה בדיוק מה שחיפשתי.
              בתמורה, אני יכול/ה להציע <strong>[שם השירות שלי]</strong>.
            </p>
            <p>
              אני מציע/ה שנעשה החלפה של <strong>[כמות זמן/תוצר]</strong> שלי מול
              <strong> [כמות זמן/תוצר]</strong> שלך.
            </p>
            <p>אפשר לראות עבודות קודמות שלי בפרופיל כאן באתר. מה דעתך?</p>
          </div>
        </div>

        <div className="card stack-col" style={{ padding: 24 }}>
          <SectionTitle
            title="בטיחות, הוגנות ואמון"
            subtitle="הדברים שהכי חשובים לקהל הישראלי לפני שסוגרים עסקה"
          />
          <div className="safety-list">
            <div>
              <ShieldCheck className="icon-sm" />
              אימות משתמשים כדי לצמצם פרופילים פיקטיביים.
            </div>
            <div>
              <Flag className="icon-sm" />
              כפתור דיווח בולט להתנהגות לא הולמת.
            </div>
            <div>
              <CircleHelp className="icon-sm" />
              המלצה להחליף על בסיס שעה תמורת שעה או שווי שוק דומה.
            </div>
            <div>
              <MapPin className="icon-sm" />
              סינון חזק לפי עיר / אזור כדי לשמור על מקומיות.
            </div>
          </div>
        </div>
      </section>

      <section className="section footer-cta card">
        <div className="eyebrow" style={{ color: "#d0f3df" }}>
          <Sparkles className="icon-sm" />
          מוכנה לשלב הבא
        </div>
        <h2>הגרסה הבאה: משתמשים אמיתיים, צ׳אט, אימות ו-DB</h2>
        <p>
          בגרסת GitHub הזו כבר הכנסתי את השיפורים לביצוע חיפוש, מצב אין-תוצאות, מבנה
          קוד מסודר ותחילת תשתית ל-API ו-Prisma כדי שתוכלי להמשיך לפיתוח מלא.
        </p>
        <div className="footer-actions">
          <button className="btn btn-primary" aria-label="התחלת בניית צד שרת">
            להתחיל לבנות Backend
            <ChevronLeft className="icon-sm" />
          </button>
          <button className="btn btn-secondary" aria-label="הוספת אימות משתמשים וצ׳אט">להוסיף Auth וצ׳אט</button>
        </div>
      </section>
    </main>
  );
}
