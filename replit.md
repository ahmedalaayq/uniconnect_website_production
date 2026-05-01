# GradConnect — كلية التربية النوعية

Educational community platform for students and graduates of Faculty of Specific Education (كلية التربية النوعية), Benha University.

## Architecture

- **Type:** Static HTML/CSS/JS site (no build step, no framework)
- **Server:** `npx serve` on port 5000
- **Backend:** Firebase (Auth + Firestore + Storage) via CDN SDK v9.22.0
- **Font:** Cairo (Google Fonts)
- **Direction:** RTL Arabic UI

## Pages

| File | Route | Description |
|------|-------|-------------|
| `index.html` | `/` | Login page |
| `login.html` | `/register` | Registration form |
| `dashboard.html` | `/dashboard` | Main app dashboard with chat |
| `student-services.html` | `/student-services.html` | Student Services hub |
| `profile.html` | `/profile` | User profile |
| `dm.html` | `/messages` | Direct messages |
| `setting.html` | `/settings` | Settings |
| `help_support.html` | — | Help & support |
| `forget_password.html` | — | Password reset |

## Design System

- **Theme:** Dark glassmorphism
- **Brand:** `#667eea` (indigo) → `#764ba2` (purple) gradient
- **Backgrounds:** `#060b18` → `#0d1526` → `#111d35` → `#1a2744`
- **Glass:** `rgba(255,255,255,0.04–0.10)` + `backdrop-filter: blur()`
- **Border:** `rgba(255,255,255,0.08)`
- **Text:** `#f1f5f9` primary, `#94a3b8` dim, `#475569` muted

## Student Services Page

`student-services.html` + `styles/student-services.css` + `scripts/modules/student-services.js`

Features:
- Hero section with animated search bar
- 40 service cards across 9 categories (Academic, Exams, Affairs, Training, E-Learning, Forms, Announcements, Links)
- Sidebar category navigation with counts
- Real-time search with dropdown suggestions
- Grid/list view toggle
- Quick access widgets (top 4 categories)
- Notification panel with badge
- Mini progress dashboard widget
- Loading skeleton animation
- Empty state with reset button
- FAQ accordion (6 items)
- Future features roadmap (6 cards)
- Full responsive: desktop / tablet / mobile drawer
- Auth guard (redirects to login if not authenticated)

## Scripts

| File | Purpose |
|------|---------|
| `scripts/config/firebase-config.js` | Firebase init, auth, db, storage globals |
| `scripts/modules/auth.js` | Login / signup / logout / reset |
| `scripts/modules/chat.js` | Global chat + DMs |
| `scripts/modules/users.js` | Online users listener |
| `scripts/modules/storage.js` | File storage |
| `scripts/modules/student-services.js` | Student Services page logic |
| `scripts/utils/utils.js` | showMessage, formatTimestamp, etc. |

## Firebase Project

- **Project ID:** `uniconnect-c7571`
- **Auth domain:** `uniconnect-c7571.firebaseapp.com`
- **Hosting site:** `uniconnect-c7571`

## Deployment

- Configured as **static** deployment (`publicDir: "."`)
- Dev server: `npm start` → `npx serve -s . -l 5000`
