# Product Requirements Document (PRD)

**Project Name:** Kevin Risky Personal Portfolio (Clone of portfolio.sfauzi.dev)
**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Lucide React.
**Goal:** To meticulously recreate the reference portfolio website with 100% pixel-perfect accuracy, ensuring all layouts, animations, and interactive elements exactly match the original design.

---

## 1. Project Objectives & Usage

- **Purpose:** A personal portfolio website to showcase projects, professional experience, tech stack, certifications, and LinkedIn activity.
- **Target Audience:** Recruiters, clients, and fellow developers.
- **Key Features:** Fully responsive, dark/light mode toggle, command palette search (Ctrl+K), animated sections, interactive modals for deep dives into projects/certs.

## 2. Current Shortcomings & Future To-Dos

- **Static Mock Data:** Currently, the site uses placeholder data (`src/data/projects.ts`, etc.). The new AI agent needs to help replace this with real data.
- **Missing Assets:** The profile pictures and project screenshots are currently Unsplash placeholders. Real images need to be uploaded to `public/` and linked.
- **No CMS / Backend:** The site is entirely static. Any new project or experience must be added manually in code.
- **Form Submission:** The "Get in touch" CTA currently opens a Link-Hub modal instead of a functional email form.

---

## 3. EXTREMELY DETAILED UI/UX SPECIFICATIONS

_(Attention VSCode AI Agent: Read this section very carefully. Do NOT deviate from these layout structures, as they have been rigorously reviewed and fixed against visual references.)_

### Global Styles

- **Fonts:** `Inter` for standard text, `Caveat` for the signature logo.
- **Background:** Uses a subtle grid background (`hero-bg-grid`) with radial glow effects.
- **Z-Index Strategy:** `<main>` MUST NOT have `relative z-0`. Modals must use `z-[999]` to successfully cover the sticky `Navbar` (`z-50`).

### 1. Navbar & Navigation

- **Layout:** Sticky top (`fixed`), frosted glass effect (`backdrop-blur`).
- **Left:** Signature logo "kevin.dev" using Caveat font.
- **Right:** Search icon button (Ctrl+K), Social links (Behance, GitHub, LinkedIn), and a Hamburger menu toggle.
- **Menu Dropdown:** Floating popover when hamburger is clicked, containing nav links and a mini-footer for socials.

### 2. Selected Work (Projects Grid)

- **Layout:** 2-column grid on desktop.
- **Card Design:**
  - Image at the top with NO dark overlay.
  - Below image (Left): Large Project Title.
  - Below image (Right): Two circular action buttons (Share icon, ArrowUpRight icon) sitting exactly parallel to the title.
  - Bottom: Tech stack tags styled as outline pills (border only, no background).

### 3. Project Detail Modal

- **Layout:** Full-screen modal, 2 distinct columns (Left is wide, Right is narrow).
- **Sticky Header:** Project title centered, "Next >" button and "X" close button on the right.
- **Left Column (Scrollable):**
  - Starts with an Image Gallery/Thumbnail.
  - The image has a dark badge on the top-left corner indicating "1 / 5".
  - Below the image is the "Description" heading followed by paragraphs of text.
- **Right Column (Scrollable Sidebar):**
  - Large Project Title, alongside a black circular "External Link" button.
  - Short summary text.
  - Metadata rows using bold icons: Calendar (Created at), Building (Category).
  - "Tags" section mapping out tech stack pills.
  - "Connect With Me" text at the very bottom.

### 4. My Recently in LinkedIn

- **Goal:** MUST look exactly like an embedded LinkedIn post card.
- **Card Styling:** Light gray background (`bg-[#f3f4f6]`), rounded corners.
- **Header:**
  - Left: Circular profile picture, Name ("Kevin Risky"), "• Ke-2", Headline ("Full Stack Developer"), Date ("1 thn").
  - Right: Official blue "Linked[in]" text logo.
- **Body:** Scrollable text area (`overflow-y-auto`) preserving line breaks.
- **Hover Action:** A black pill button saying "View" absolutely positioned at the bottom right, appearing ONLY on card hover.

### 5. My Stack

- **Layout:** 2-column grid (`grid-cols-2`) for desktop (Left: Development, Right: Design). Do NOT use a vertical stack.
- **Accordion Header:** Contains a solid black circle with a white number (e.g., "1", "2") followed by the category title (Development/Design) and a chevron on the right.
- **Accordion Content:** A flex-wrap container displaying ACTUAL circular logos of the technologies (using Devicon SVGs like Vue, React, Tailwind, Laravel), NOT text pills. The icons sit inside light-gray circular wrappers with hover scale effects.

### 6. Work Experience (Timeline)

- **Layout:** 2-column flex. Left side (30% width) contains sticky large text "Work Experience". Right side (70% width) contains the timeline.
- **The Timeline Line:** MUST be `position: absolute` spanning top to bottom so it NEVER shifts or breaks when accordions open.
- **Timeline Nodes:** Solid cyan circles with thick white borders for current jobs, gray for past jobs.
- **Item Header:** Format is `Company Name — Role` (e.g., `SPM Studio — Fullstack Developer`).
- **Metadata:** A flex row containing `MapPin` (Location) `|` `Calendar` (Date).
- **Duration Badge:** Below metadata, a gray pill containing a `Clock` icon and text (e.g., "2 years 8 months").
- **Highlights Toggle:** Muted text saying "^ Hide highlights (4)" with a chevron icon.
- **Highlights Content:** Bulleted list where the bullets are custom gray dots aligned to a faint left border line.

### 7. Certifications & Certification Modal

- **Grid:** 3-column grid of certification cards.
- **Modal Z-Index:** Must strictly be `z-[999]` to cover the navbar completely.
- **Modal Header:**
  - Large Title.
  - Subtitle: Issuer name (e.g., "DJKI") next to a green pill badge with a checkmark saying "Verified".
  - Right side: "X" close button in a gray circle.
  - Bottom: Horizontal divider line.
- **Modal Meta:** `Calendar` icon with "Issued: [Date]".
- **Modal Image:** The certificate image sits inside a large light-gray padding box (`bg-[#f3f4f6]`) filling the bottom half of the modal.

---

**Final Note to AI:** Do not alter the CSS structural logic (absolute positioning for timelines, flex/grid rules, z-indexes) described above. They were specifically engineered to solve layout breakage and overlapping bugs. Build _upon_ this foundation.
