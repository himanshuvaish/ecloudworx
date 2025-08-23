This project is a **Vite + React 18 SPA** styled with **vanilla CSS modules** (one CSS file per component).
It is production-ready with animations, responsive layout, Dockerfile (Nginx runtime), and Cloud Run deployment support.

---

## 📂 Project Structure

```
ecloudworx-react-clean-working/
│   index.html              # Vite entry HTML
│   package.json            # Dependencies + scripts
│   vite.config.js          # Vite configuration
│   Dockerfile              # Production Dockerfile (multi-stage with Nginx)
│   docker-compose.yml      # Optional local compose setup
│   docker-entrypoint.sh    # Renders nginx.conf with $PORT
│   nginx.conf.template     # Nginx config (SPA routing + headers)
│   README.md               # This file
│
└───src
    │   App.jsx             # Main app, imports all sections
    │   main.jsx            # Vite entry point (ReactDOM.render)
    │
    ├───components
    │   ├───Header/         # Top navigation bar
    │   │       Header.jsx
    │   │       Header.css
    │   │
    │   ├───Hero/           # Hero section (landing intro)
    │   │       Hero.jsx
    │   │       Hero.css
    │   │
    │   ├───Dashboard/      # Dashboard preview section
    │   │       Dashboard.jsx
    │   │       Dashboard.css
    │   │
    │   ├───Features/       # Features grid
    │   │       Features.jsx
    │   │       Features.css
    │   │       FeatureCard.jsx
    │   │
    │   ├───AutomationLibrary/  # Automation library section
    │   │       AutomationLibrary.jsx
    │   │       AutomationLibrary.css
    │   │
    │   ├───Benefits/       # Benefits section (cards with icons)
    │   │       BenefitsSection.jsx
    │   │       BenefitsSection.css
    │   │
    │   ├───SocialProof/    # KPI / stats strip (resources, savings, customers)
    │   │       SocialProof.jsx
    │   │       SocialProof.css
    │   │
    │   ├───Pricing/        # Pricing plans (Free, Pro, Enterprise)
    │   │       Pricing.jsx
    │   │       Pricing.css
    │   │
    │   └───Footer/         # Footer with columns + copyright
    │           Footer.jsx
    │           Footer.css
    │
    ├───hooks
    │       useInView.js    # IntersectionObserver hook for scroll animations
    │
    ├───styles
    │       App.css         # Global app styles
    │       index.css       # Base styles imported in main.jsx
    │       animations.css  # Reusable animation classes (fade+slide, stagger, lift)
    │
    └───data
            cloudProviders.js
            features.js
            navigation.js
```

---

## 🧩 Component Responsibilities

* **App.jsx**

  * Central layout — imports all sections in order:
    `Header → Hero → Dashboard → Features → AutomationLibrary → Benefits → SocialProof → Pricing → Footer`.
  * Handles `isScrolled` state for sticky header styling.
  * Imports global styles and `animations.css`.

* **Header**

  * Sticky nav bar, highlights on scroll.
  * Styles: `Header.css`.

* **Hero**

  * Landing hero section (headline, CTA, background).
  * Styles: `Hero.css`.

* **Dashboard**

  * Dashboard preview screenshot/illustration.
  * Styles: `Dashboard.css`.

* **Features**

  * Grid of feature cards (`FeatureCard.jsx`).
  * Styles: `Features.css`.

* **AutomationLibrary**

  * Showcases automation templates/tools.
  * Styles: `AutomationLibrary.css`.

* **Benefits**

  * `BenefitsSection.jsx` (JSX + lucide-react icons).
  * Cards with icon, title, description.
  * Scroll animations (`useInView` + `.reveal-stagger`).
  * Styles: `BenefitsSection.css`.

* **SocialProof**

  * Stats strip (e.g. **10,000+ resources, 40% savings, 500+ customers**).
  * Animates in staggered fashion.
  * Styles: `SocialProof.css`.

* **Pricing**

  * 3 plans: Free / Pro (highlighted) / Enterprise.
  * CTA buttons: scroll to `#contact` / `#signup`.
  * Styles: `Pricing.css`.

* **Footer**

  * Brand, tagline, 3 link columns, copyright.
  * Contains hidden `#contact` and `#signup` anchors for CTA scrolling.
  * Styles: `Footer.css`.

---

## 🎨 Styling Approach

* Each component has a **paired CSS file** in the same folder.
* Shared animations live in `styles/animations.css`:

  * `.reveal` → fade+slide up
  * `.reveal-stagger` → staggered children
  * `.lift` → hover lift with shadow
* Smooth scroll is global (`html { scroll-behavior: smooth; }`).

---

## ✨ Animations

* Powered by `useInView.js` hook (`IntersectionObserver`).
* Components wrap their grid/header with `reveal` / `reveal-stagger`.
* Once visible, `.is-visible` is added → triggers transitions.

---

## 🐳 Docker / Deployment

* **Dockerfile** (multi-stage):

  1. Build stage: `node:20-alpine` → runs `npm ci && npm run build`.
  2. Runtime stage: `nginx:alpine` → serves `/dist` via Nginx.
* **nginx.conf.template**

  * Listens on `$PORT` (Cloud Run requirement).
  * SPA fallback (`try_files $uri /index.html`).
  * Cache control: static assets = 1 year, `index.html` = no-store.
  * Security headers: CSP, X-Frame-Options, Referrer-Policy, etc.
  * Gzip enabled.
* **docker-entrypoint.sh**

  * Uses `envsubst` to render nginx.conf with `$PORT`.
* **docker-compose.yml**

  * `web` service for local build/run (maps port 8080).

### Local Run

```bash
docker build -t ecloudworx-web .
docker run -p 8080:8080 ecloudworx-web
# open http://localhost:8080
```

### Cloud Run Deploy

```bash
gcloud builds submit --tag gcr.io/<PROJECT_ID>/ecloudworx-web
gcloud run deploy ecloudworx-web \
  --image gcr.io/<PROJECT_ID>/ecloudworx-web \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated
```

---

## 🔧 Updating Workflow

- **Header**
  - Sticky nav bar, highlights on scroll.
  - Displays brand (“☁️ eCloudWorx”) larger than nav links.
  - Navigation links include Features, Pricing, Resources, Signup, and ecloudWorx University (accent style).
  - Styles: `Header.css` (font sizes, spacing, accent coloring, sticky behavior).


When you want to update a section:

1. **Find the component folder** in `src/components/`.
2. Update both the `.jsx` and its paired `.css`.
3. If adding animations → use `useInView` + `animations.css` classes.
4. If adding data-driven items → define defaults inside component or pass as props in `App.jsx`.
5. Run locally:

   ```bash
   npm run dev   # hot reload (Vite)
   ```

   Or test production build:

   ```bash
   npm run build && npm run preview
   ```
6. For production deploy, rebuild Docker image and push to Cloud Run.

---

## 🔑 Key Files Cheat Sheet

* Main entry: `src/App.jsx`
* Animations: `src/hooks/useInView.js`, `src/styles/animations.css`
* Benefits: `src/components/Benefits/BenefitsSection.jsx + .css`
* Social Proof: `src/components/SocialProof/SocialProof.jsx + .css`
* Pricing: `src/components/Pricing/Pricing.jsx + .css`
* Footer: `src/components/Footer/Footer.jsx + .css`
* Infra: `Dockerfile`, `nginx.conf.template`, `docker-entrypoint.sh`, `docker-compose.yml`

---

