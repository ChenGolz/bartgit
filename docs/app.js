const categories = [
  { id: 'all', label: 'הכול', icon: '✨' },
  { id: 'home', label: 'תיקונים לבית', icon: '🔧' },
  { id: 'business', label: 'ייעוץ עסקי', icon: '💼' },
  { id: 'wellness', label: 'טיפול ויוגה', icon: '🧘' },
  { id: 'tech', label: 'תמיכה טכנית', icon: '💻' },
  { id: 'lessons', label: 'שיעורים פרטיים', icon: '🎓' },
  { id: 'media', label: 'צילום ועיצוב', icon: '📷' },
];

const listings = [
  {
    id: 1, name: 'יוסי', city: 'חולון', distance: '4 ק״מ', title: 'תיקון מזגנים ובדיקת תקלות',
    offer: 'מציע שירות תיקון מזגנים לבית ולעסק', wants: 'מחפש בניית אתר תדמית', category: 'home',
    tags: ['מזגנים', 'שירות לבית', 'בארטר מקומי'], rating: 4.9, verified: true, matchScore: 92, createdAt: new Date().toISOString(), icon: '🔧'
  },
  {
    id: 2, name: 'מיכל', city: 'תל אביב', distance: '2 ק״מ', title: 'שיעורי יוגה פרטיים בבית או בזום',
    offer: 'מציעה 2 שיעורי יוגה מותאמים אישית', wants: 'מחפשת עיצוב לוגו ומיתוג בסיסי', category: 'wellness',
    tags: ['יוגה', 'בריאות', 'אונליין'], rating: 4.8, verified: true, matchScore: 89, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), icon: '🧘'
  },
  {
    id: 3, name: 'אדם', city: 'חיפה', distance: '7 ק״מ', title: 'תמיכה טכנית למחשב ולרשת הביתית',
    offer: 'מציע התקנות, גיבויים וסידור מחשב איטי', wants: 'מחפש שיעורי אנגלית לילד בכיתה ו׳', category: 'tech',
    tags: ['מחשבים', 'ראוטר', 'טכנאי'], rating: 4.7, verified: false, matchScore: 84, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), icon: '💻'
  },
  {
    id: 4, name: 'נעמה', city: 'ירושלים', distance: '3 ק״מ', title: 'צילום תדמית לעסקים קטנים',
    offer: 'מציעה יום צילום קצר כולל 10 תמונות ערוכות', wants: 'מחפשת ייעוץ עסקי לשיווק ומכירות', category: 'media',
    tags: ['צילום', 'עסקים', 'מיתוג'], rating: 5, verified: true, matchScore: 95, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), icon: '📷'
  },
  {
    id: 5, name: 'דניאל', city: 'באר שבע', distance: '6 ק״מ', title: 'שיעורים פרטיים במתמטיקה',
    offer: 'מציע 3 שעות תגבור לחטיבה ולתיכון', wants: 'מחפש תיקוני צבע וצביעה בחדר ילדים', category: 'lessons',
    tags: ['מתמטיקה', 'בגרות', 'זום'], rating: 4.6, verified: true, matchScore: 87, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), icon: '🎓'
  },
  {
    id: 6, name: 'שרון', city: 'רמת גן', distance: '1 ק״מ', title: 'ייעוץ עסקי לעצמאים',
    offer: 'מציעה פגישת מיקוד עסקית של 90 דקות', wants: 'מחפשת בניית דף נחיתה או אוטומציה פשוטה', category: 'business',
    tags: ['אסטרטגיה', 'שיווק', 'עצמאים'], rating: 4.9, verified: true, matchScore: 91, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), icon: '💼'
  },
];

const smartMatches = [
  'מצאנו 12 אנשים שמחפשים בדיוק את מה שאת מציעה',
  'יש 4 מודעות קרובות אלייך עם התאמה גבוהה',
  'המערכת ממליצה להתחיל בבארטר של שעה תמורת שעה',
];

let query = '';
let submittedQuery = '';
let activeCategory = 'all';

const normalizeText = (value) => value.trim().toLowerCase();
const getInitials = (name) => name.trim().slice(0, 1);
const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
  const diffDays = Math.floor(diffHours / 24);
  if (diffHours < 12) return 'חדש היום';
  if (diffHours < 24) return 'עודכן היום';
  if (diffDays === 1) return 'לפני יום';
  if (diffDays === 2) return 'לפני יומיים';
  if (diffDays < 7) return `לפני ${diffDays} ימים`;
  return date.toLocaleDateString('he-IL');
};

const filteredListings = () => {
  const appliedQuery = submittedQuery || query;
  return listings.filter((item) => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    const text = normalizeText(`${item.title} ${item.offer} ${item.wants} ${item.city} ${item.tags.join(' ')}`);
    const queryMatch = text.includes(normalizeText(appliedQuery));
    return categoryMatch && queryMatch;
  });
};

function renderCategories() {
  const root = document.getElementById('categoryTabs');
  root.innerHTML = categories.map((item) => `
    <button class="chip ${item.id === activeCategory ? 'chip-active' : ''}" data-category="${item.id}" role="tab" aria-selected="${item.id === activeCategory}" aria-label="סינון לפי ${item.label}">
      <span aria-hidden="true">${item.icon}</span>
      ${item.label}
    </button>
  `).join('');

  root.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-category');
      render();
    });
  });
}

function renderMatches() {
  document.getElementById('matchList').innerHTML = smartMatches.map((item) => `<li><span aria-hidden="true">✅</span>${item}</li>`).join('');
}

function openModal(listingId) {
  const listing = listings.find((item) => item.id === Number(listingId));
  if (!listing) return;
  const modal = document.getElementById('modalRoot');
  const message = `היי ${listing.name}, אשמח שנעשה בארטר!\n\nראיתי שאת/ה מציע/ה ${listing.title} וזה בדיוק מה שחיפשתי.\nבתמורה, אני יכול/ה להציע לך [השירות שלי].\n\nאיך זה יכול לעבוד?\nאני מציע/ה שנעשה החלפה של [כמות זמן/תוצר] שלי מול [כמות זמן/תוצר] שלך.\n\nאפשר לראות עבודות קודמות שלי בפרופיל כאן באתר.\nמה דעתך? נשמע לך רלוונטי?`;
  modal.innerHTML = `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="offer-title-${listing.id}">
      <div class="modal-card card">
        <div class="modal-head">
          <div>
            <p class="mini-label">תבנית מוכנה לשליחה</p>
            <h3 id="offer-title-${listing.id}">הצעת בארטר אל ${listing.name}</h3>
          </div>
          <button class="icon-button" id="closeModalBtn" aria-label="סגירת חלון הצעת בארטר">✕</button>
        </div>
        <div class="offer-template modal-template">
          <p><strong>נושא:</strong> היי ${listing.name}, אשמח שנעשה בארטר!</p>
          <p class="offer-inline-note">מבוסס על המודעה: ${listing.title}</p>
          <textarea readonly class="offer-textarea" aria-label="נוסח הצעת הבארטר">${message}</textarea>
        </div>
        <div class="footer-actions">
          <button class="btn btn-primary" id="saveTemplateBtn">שמרי כנוסח מוכן</button>
          <button class="btn btn-secondary" id="closeModalBtn2">סגירה</button>
        </div>
      </div>
    </div>
  `;
  modal.querySelector('#closeModalBtn').addEventListener('click', closeModal);
  modal.querySelector('#closeModalBtn2').addEventListener('click', closeModal);
  modal.querySelector('#saveTemplateBtn').addEventListener('click', closeModal);
}

function closeModal() {
  document.getElementById('modalRoot').innerHTML = '';
}

function renderListings() {
  const data = filteredListings();
  document.getElementById('resultsCount').textContent = `${data.length} תוצאות`;
  const root = document.getElementById('listingsRoot');

  if (!data.length) {
    root.innerHTML = `
      <div class="card empty-state">
        <div class="icon-lg" aria-hidden="true">🔎</div>
        <h3>אופס, לא מצאנו מודעה כזו</h3>
        <p>אולי תהיי הראשונה להציע את השירות הזה, או נסי קטגוריה אחרת.</p>
        <button class="btn btn-primary" id="resetFiltersBtn" aria-label="איפוס חיפוש וסינון">נקה חיפוש</button>
      </div>
    `;
    document.getElementById('resetFiltersBtn').addEventListener('click', () => {
      query = '';
      submittedQuery = '';
      activeCategory = 'all';
      document.getElementById('searchInput').value = '';
      render();
    });
    return;
  }

  root.innerHTML = `<div class="listings-grid">${data.map((listing) => `
    <article class="card listing-card">
      <div class="listing-image" aria-hidden="true">
        <div class="listing-image-badge">ללא תמונה</div>
        <div class="listing-image-center">
          <div class="icon-lg">${listing.icon}</div>
          <div class="listing-image-title">${listing.title}</div>
        </div>
      </div>
      <div class="listing-top-row">
        <div class="avatar-block">
          <div class="avatar">${getInitials(listing.name)}</div>
          <div>
            <strong>${listing.name}</strong>
            <div class="meta-row">
              <span>${listing.city}</span>
              <span class="dot"></span>
              <span>${listing.distance}</span>
            </div>
          </div>
        </div>
        <div class="distance-chip" aria-label="מרחק מהמשתמש ${listing.distance}">📍 ${listing.distance}</div>
      </div>
      <div class="listing-body">
        <div class="title-row">
          <h3>${listing.title}</h3>
          <span class="match-pill">${listing.matchScore}% התאמה</span>
        </div>
        <p><strong>מציע/ה:</strong> ${listing.offer}</p>
        <p><strong>מחפש/ת:</strong> ${listing.wants}</p>
        <div class="tags-row">${listing.tags.map((tag) => `<span class="pill">${tag}</span>`).join('')}</div>
        <div class="card-actions">
          <div class="meta-row rating-row">
            <span>⭐ ${listing.rating.toFixed(1)}</span>
            <span>${listing.verified ? '✔️ מאומת/ת' : 'חשבון לא מאומת'}</span>
            <span class="date-pill">${formatRelativeDate(listing.createdAt)}</span>
          </div>
          <button class="btn btn-secondary small" data-offer-id="${listing.id}" aria-label="שליחת הצעת בארטר ל${listing.name}">💬 שלחי הצעת בארטר</button>
        </div>
      </div>
    </article>
  `).join('')}</div>`;

  root.querySelectorAll('[data-offer-id]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-offer-id')));
  });
}

function render() {
  renderCategories();
  renderMatches();
  renderListings();
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  searchInput.addEventListener('input', (e) => {
    query = e.target.value;
    renderListings();
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      submittedQuery = query;
      renderListings();
    }
  });
  searchButton.addEventListener('click', () => {
    submittedQuery = query;
    renderListings();
  });
  render();
});
