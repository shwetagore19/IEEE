# IEEE ICETEC 2027 Conference Portal

Clone and rebuild of the **IEEE International Conference on Emerging Technologies in Engineering & Computing (ICETEC 2027)** hosted by K. K. Wagh Institute of Engineering Education & Research (KKWIEER), Nashik, in collaboration with the IEEE Mumbai Section.

---

## Architecture & Technology Stack

- **HTML5 & Vanilla CSS**: Modern, semantic HTML5 structure with custom CSS design tokens, dark/light theme support (`data-theme="dark"` / `data-theme="light"`), glassmorphism cards, and fluid grid layouts.
- **Modular Vanilla ES Modules (`src/components/`, `src/data/`)**:
  - `src/main.js`: Main conference portal orchestrator.
  - `src/committee-page.js`: Dedicated multi-category committee directory.
  - `src/components/hero.js`: Hero visual section with interactive theme switcher.
  - `src/components/navigation.js`: Mobile drawer navigation, sticky header, and active scroll spy.
  - `src/components/tracks.js`: Dynamic CFP technical tracks with subtopics modal/drawer.
  - `src/components/timeline.js`: Conference submission timeline and important milestones.
  - `src/components/hotels.js`: Interactive accommodation directory with maps and distance indicators.
  - `src/components/gallery.js`: Campus and event photo lightbox gallery.
  - `src/components/contact.js`: Interactive secretariat inquiry form with validation.
  - `src/components/scrollAnimations.js`: IntersectionObserver-based entrance micro-animations.
  - `src/components/scrollTop.js`: Floating back-to-top button.
- **Node.js Local Server (`server.js`)**: Clean static server supporting standard clean routing (`/committee` -> `committee.html`), proper MIME types, and CORS headers.

---

## Directory Structure

```
├── committee.html              # Dedicated Organizing Committee Page
├── index.html                  # Main Conference Portal Page
├── package.json                # Project configuration and npm scripts
├── server.js                   # Node.js static HTTP server
├── public/
│   ├── images/
│   │   ├── clg1.jpg ... clg6.jpg, clgpic.jpg   # Campus & campus gallery images
│   │   ├── committee/                          # Patrons & committee photos
│   │   ├── hotels/                             # Accommodation photos
│   │   └── tracks/                             # Technical track topic banners
│   └── logos/
│       ├── ieee-nashik-section.svg             # IEEE Mumbai Section (light theme)
│       ├── ieee-nashik-section-dark.svg        # IEEE Mumbai Section (dark theme)
│       └── kkw-logo.png                        # KKWIEER Institute Emblem
└── src/
    ├── committee-page.js                       # Committee page controller
    ├── main.js                                 # Main application controller
    ├── components/                             # Modular UI logic
    ├── data/                                   # Conference structured datasets
    └── styles/
        └── main.css                            # Complete CSS design system
```

---

## Setup & Running Locally

### Prerequisites
- Node.js (v18+ or v26+)

### 1. Start the Server
Run the local HTTP server:
```bash
npm start
# or
node server.js
```

### 2. Access the Application
Open your browser and navigate to:
- **Main Portal**: [http://localhost:8080/](http://localhost:8080/)
- **Committee Directory**: [http://localhost:8080/committee](http://localhost:8080/committee)
