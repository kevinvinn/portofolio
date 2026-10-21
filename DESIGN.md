# DESIGN.md
# Portfolio Redesign Specification

**Project:** Kevin R Portfolio  
**Direction:** Experimental Editorial Hybrid  
**Status:** Design specification only. This document does not authorize implementation by itself.  
**Primary goal:** Redesign the portfolio’s visual experience and navigation while preserving verified content, existing useful functionality, accessibility improvements, and local development infrastructure.

---

## 1. Product and Design Goals

Create a distinctive, polished developer portfolio that combines:

- **Cinematic presentation** in the loading intro and hero.
- **Editorial structure** for biography, experience, and supporting content.
- **Selective neo-brutalist accents** for project cards and key interactive surfaces.
- **Usable light and dark themes** with persistent user preference.
- **Real navigation** to project detail pages, not project-detail modals.
- **Accessible interaction patterns** for keyboard, focus, reduced motion, and dialogs.

The design should feel expressive but remain legible and usable. Do not apply heavy borders, shadows, or motion to every component. Use visual contrast intentionally.

### Non-goals

- Do not rewrite the application wholesale merely to make it match a reference.
- Do not invent project details, credentials, dates, metrics, or personal claims.
- Do not remove existing routes or working functionality without a confirmed replacement and a clear reason.
- Do not add dependencies unless an existing dependency cannot reasonably support the required behavior.
- Do not treat reference-site behavior that was not verified as a requirement.
- Do not replace project detail pages with modals.
- Do not make code changes while only preparing or reviewing this specification.

---

## 2. Reference Direction

The three researched references serve different purposes. Borrow patterns, not their entire visual identities.

### Reference 1: `https://rifkiizzulhaq.vercel.app/en`

Use as inspiration for:
- Atmospheric loader and hero composition.
- Moving technology-stack presentation.
- Experience timeline.
- Certificate hover preview, only if it remains usable on touch devices and accessible to keyboard users.

Do not copy its exact greeting order. The required target order is defined in Section 6.

### Reference 2: `https://www.zahidan.my.id/`

Use as inspiration for:
- Card-based About composition.
- Project grid and image gallery presentation.
- Strong, intentional footer.
- Selective neo-brutalist borders and shadows.
- Light/dark theme support.

The target project detail page must support direct navigation, refresh, and a copied URL, even though direct-route behavior on the reference was not verified.

### Reference 3: `https://fadhilgani.is-a.dev/`

Use as inspiration for:
- Editorial minimalism.
- Selective layered or dashed borders.
- Persistent theme control.
- Certificate detail modal structure.

Do not adopt its project-modal approach. The target portfolio uses dedicated project detail routes.

### Combined art direction

**Experimental Editorial Hybrid**:
- Cinematic hero and introduction.
- Editorial spacing and typography for reading-heavy sections.
- Restrained neo-brutalist treatment on selected cards and interaction states.
- Neutral surfaces with a controlled accent palette.
- Motion used to communicate sequence, hierarchy, or state, never as decoration that blocks access to content.

---

## 3. Existing Application and Compatibility Constraints

The repository audit identified:
- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4.
- Existing theme infrastructure using `next-themes`.
- Existing Framer Motion usage.
- Existing data modules for projects, certifications, experience, and social/profile content.
- Existing routes `/`, `/about`, `/exploration`, and a custom not-found page.
- No existing `/projects/[slug]` route at audit time.
- Existing project and certificate modals with useful accessibility behavior.
- Existing modified and untracked files in the working tree.

### Preserve the current work

Before implementation:
1. Inspect the current working tree and diffs.
2. Do not reset, clean, stash, checkout over, or discard the user's existing changes.
3. Preserve `.opencode/`, its skills and helper infrastructure, `AGENTS.md`, `prd.md`, research documents, `/about`, `/exploration`, and the custom 404 unless a specific, reviewed change is justified.
4. Keep existing verified data and links.
5. Avoid replacing complete files when a focused edit is sufficient.

The repository already contains meaningful user changes, including accessibility, contrast, sharing, image optimization, metadata, and route content. These changes are part of the baseline to protect, not disposable scaffolding.

---

## 4. Information Architecture

### Homepage section order

Use this order for the redesigned homepage:

1. Loading Intro
2. Hero
3. About
4. Moving Tech Stack
5. Experience
6. Selected Projects
7. Certifications
8. Footer

Do not reintroduce the old homepage sequence if it conflicts with this order. The current homepage has additional LinkedIn, Exploration, and Publications sections. Decide how to expose them without crowding the main narrative:
- Keep `/about` and `/exploration` as valid standalone routes.
- Preserve publication content and verified links, including existing DOI links, SEMNAS INOTEK records, and Bulletin of Information Technology records. `/about` remains the fuller canonical archive; the homepage About section may summarize selected verified highlights or link to the archive.
- Preserve verified education details, including Universitas Nusantara PGRI Kediri and the existing 2022–2026 timeline, unless current repository evidence indicates a correction is needed.
- Preserve the LinkedIn content and existing contact/social functionality. Integrate useful links where they fit naturally; do not remove them merely to simplify the layout.

### Route requirements

- `/`: primary portfolio landing page.
- `/about`: preserve as a valid standalone route.
- `/exploration`: preserve as a valid standalone route.
- `/projects/[slug]`: dedicated project detail route.
- Existing custom not-found route: preserve and make sure unknown project slugs resolve to it through `notFound()`.

All navigation should use proper Next.js navigation primitives. Project links must be shareable and refresh-safe.

---

## 5. Design System

Treat these as design intentions and initial implementation guidance, not a demand to force every existing component into identical styling.

### Color

Use a restrained neutral foundation with one primary accent and a secondary accent for emphasis.

Reference-derived colors available for consideration:
- Purple primary family: `#7163F1` (cinematic reference).
- Neo-brutalist magenta family: `#F384FC`, `#EA4DE6`, `#D123C7`.
- Sky blue accent family: `#38BDF8`, `#0EA5E9`.

Do not combine every accent at equal intensity. Select a coherent primary accent and use the other hue sparingly, if needed. Verify contrast independently for light and dark themes. Existing improved muted-text contrast (`#52525b`) and focus indicators must not regress.

Define semantic tokens for:
- Page background.
- Primary and secondary surfaces.
- Main text and muted text.
- Borders.
- Primary accent and hover accent.
- Focus ring.
- Success/error feedback if present.

Use theme-aware CSS variables or the established theme system. Avoid scattering new hard-coded colors through unrelated components.

### Borders and shadows

- Use dashed or layered borders selectively, primarily on project cards, small callouts, or purposeful interactive surfaces.
- Keep borders visually consistent and do not surround every section.
- Neo-brutalist shadows should have a clear interaction purpose. Reference values included offsets around 4, 8, and 12 pixels; choose a restrained scale and test it against both themes.
- Hover and focus states must remain visible without relying on color alone.
- Any purely decorative absolute-positioned offset-border layer or pseudo-element must not intercept clicks; use `pointer-events: none` where appropriate and verify that card actions remain clickable.

### Typography

- Use a clear hierarchy with readable body text and strong display typography for the hero.
- Large hero text may scale responsively, with a reference-inspired range around `text-4xl sm:text-5xl lg:text-6xl` where it fits the existing type scale.
- Avoid excessive all-caps labels and overly tight body line-height.
- Use consistent max-widths for reading-heavy text.
- Avoid multiple competing display styles within one viewport.

### Spacing and layout

- Use a consistent spacing scale and section rhythm.
- Give editorial sections enough whitespace to read as separate chapters.
- Keep content width comfortable on desktop and prevent horizontal overflow on small screens.
- Ensure fixed/sticky UI does not cover headings, anchor targets, modal content, or project details.
- Do not add a permanent top padding or offset that conflicts with the loader or section layout; inspect the existing root layout before changing it.

### Motion

- Motion should clarify entry, progress, hover, gallery changes, or navigation.
- Prefer short, deliberate transitions.
- Respect `prefers-reduced-motion`.
- Never make essential information available only through animation.
- Avoid animation loops that create excessive CPU use or distract from reading.

---

## 6. Loading Intro

### Required greeting sequence

Display these greetings in this exact order:

1. Indonesian
2. English
3. Japanese
4. Chinese / Mandarin
5. Javanese, ending with the exact text **`Sugeng rawuh`**

The progress indicator must not reach 100% until the final greeting has completed. After that, finish the intro and reveal the homepage.

### Behavior

- Show the intro once per browser session, using a session-scoped mechanism.
- On later navigations/reloads in the same session, do not repeatedly block the user with the full intro.
- Keep the loader duration purposeful and short enough not to feel like a forced waiting screen.
- Do not reveal a false 100% progress state while the final greeting is still visible.
- Provide a reduced-motion path that minimizes or skips animated transitions while preserving the greeting or an accessible equivalent.
- Ensure content remains accessible if animation fails or JavaScript behavior changes.
- Avoid hydration mismatch and avoid accessing browser storage during server rendering.
- While active, render the intro as a fixed fullscreen overlay (for example, `fixed inset-0 z-[100]`) above the existing fixed Navbar (`z-50`). Verify actual stacking contexts before finalizing the value.
- Block pointer and keyboard interaction with underlying navigation while the intro is active. Avoid creating a permanent focus trap, and ensure normal interaction is restored when the intro completes.
- Prevent background touch scrolling while the overlay is active, then restore the previous overflow behavior on completion or unmount.
- Ensure the loader cannot prevent users from accessing page content indefinitely.

### Scroll restoration coordination

The existing `ScrollRestorer.tsx` restores a saved scroll position after an approximately 500 ms delay. Coordinate it explicitly with the intro:
- On the first homepage visit in a browser session, suppress scroll restoration while the intro is active.
- Use a clear completion signal or shared state so restoration cannot race the intro. Do not rely only on an arbitrary timeout.
- Define the session flag lifecycle consistently. Mark the intro as seen at a deliberate point, and ensure a failed or interrupted animation cannot permanently block access to the page.
- On later visits in the same session, where the intro is bypassed, preserve normal restoration behavior.
- Do not allow an automatic scroll to move the page underneath an active loader.
- Verify back/forward navigation and direct page loads.
- Do not simply delete scroll restoration without testing the user-visible effect.

---

## 7. Homepage Sections

### 7.1 Hero

Purpose: establish identity, professional focus, and a clear next action immediately.

Requirements:
- Use strong editorial composition with cinematic atmosphere, not a wall of effects.
- State the user's professional identity and focus clearly.
- Include clear primary and secondary calls to action, using verified destinations.
- Keep social/contact actions available without overwhelming the main message.
- Support narrow mobile screens without clipping large type.
- Avoid fabricated job titles, experience claims, or performance metrics.

### 7.2 About

Purpose: provide a concise, credible summary of the person behind the work.

Use the verified biography in the existing `/about` page as the source of truth, including:
- Information Systems degree at Universitas Nusantara PGRI Kediri, 2022–2026.
- Work/training experience already recorded in the project.
- YOLOv8 Nano multi-object detection thesis topic.
- Verified publication and social links where appropriate.

Presentation:
- Editorial card composition with restrained neo-brutalist accents.
- Use concise text on the homepage and link to `/about` for the fuller biography.
- Do not invent personal facts or turn academic work into unsupported production experience.

### 7.3 Moving Tech Stack

Purpose: make technical breadth easy to scan.

Requirements:
- Use the existing, verified technology dataset in `src/components/home/TechStack.tsx` as the source for the Moving Tech Stack. Reuse or extract that dataset rather than maintaining a second, inconsistent list.
- The legacy `Marquee.tsx` contains mock corporate/client names such as `Acme Corp`; do not reuse that mock list for the technology marquee. Retire or leave the old component unused only after checking its consumers.
- Use real technologies supported by the current portfolio and project data. Do not add technologies simply because they appear in a design reference.
- A marquee may move in alternating directions, but motion must be paused or reduced for users who request reduced motion.
- Ensure the stack remains readable if animation is disabled.
- Avoid duplicate, fabricated, or placeholder company/technology names.
- Do not make the marquee the only way to discover technologies; keep the content represented in the DOM.

### 7.4 Experience

Purpose: communicate work and learning progression clearly.

Requirements:
- Reuse or adapt the existing experience data and timeline where practical.
- Keep the heading, dates, organizations, roles, and descriptions legible.
- Desktop may use a two-column editorial layout with a sticky section heading if it remains usable.
- Mobile must use a simple, readable vertical sequence.
- If an accordion is retained, it must support keyboard operation, clear expanded state, visible focus, and understandable labels.
- Preserve existing focus and contrast improvements.

### 7.5 Selected Projects

Purpose: quickly show the most relevant work and lead to deeper case studies.

Known project records from the audit:
- JEPRETIN
- Sky Ticket
- BWeather
- YOLOv8 Logistics

Requirements:
- Build cards from the existing project data, retaining real images and content.
- Cards must navigate to their dedicated detail routes.
- Keep native share and clipboard fallback behavior, including visible feedback, where supported.
- Do not open the old `ProjectModal` for project details.
- Ensure cards are usable by keyboard and touch, with clear action labels.
- Do not invent demo/repository links or show dead buttons.
- Preserve the existing Next Image optimizations and meaningful alternative text.

### 7.6 Certifications

Purpose: show credible credentials with enough detail to be useful.

Requirements:
- Use existing certificate records as the source of truth.
- Optional cursor-following previews may be used on devices where hover is available, but must not be required to discover details.
- Clicking/tapping a certificate opens an in-page modal.
- The modal must preserve or improve existing accessible behavior: semantic dialog, labelled title, focus management, Escape handling, body-scroll locking, focus restoration, and keyboard support.
- Use the existing certificate records as the current source of truth. The current schema contains `id`, `title`, `issuer`, `validity`, and `image`; fields such as `credentialId`, `description`, `skills`, `issuedDate`, and `verificationUrl` may not exist yet.
- Prepare the data model so these additional fields can be added later, but treat them as optional and leave them unset until the user supplies or verifies the values.
- **Do not display visible placeholder text** such as “Add credential ID”, “TODO”, “Not provided”, fake hashes, empty metadata rows, or dead verification buttons in the actual portfolio UI.
- If useful during implementation, use code comments or a clearly documented internal TODO list to identify which certificate details the user needs to fill in later. Do not expose these internal reminders to site visitors.
- Render each metadata row or action only when its value is present and verified.
- Never fabricate a credential ID, issue date, skill, description, issuer, or verification link.
- Do not redirect externally immediately on card click; external verification is a distinct action inside the modal when a verified URL exists.
- Make the modal usable on small screens and when reduced motion is enabled.

### 7.7 Footer

Purpose: provide a clear ending and a reliable path to contact or continue browsing.

Requirements:
- Strong typographic finish, balanced spacing, and a clear contact action.
- Preserve verified GitHub, LinkedIn, Instagram, and other existing real links.
- Use accessible labels for icon-only links.
- Keep contrast and focus states visible in both themes.
- Avoid fake newsletter forms, fake contact states, or placeholder links.
- Keep the footer consistent across homepage and standalone routes where appropriate.

---

## 8. Project Detail Pages

### Route structure

Implement `/projects/[slug]` using the Next.js App Router.

Suggested slugs:
- `jepretin`
- `sky-ticket`
- `bweather`
- `yolov8-logistics`

Before adding these, confirm the actual current project records and ensure each slug is unique. Preserve existing IDs and fields for compatibility. Do not assume the suggested slugs are final if the actual project data indicates a better canonical value.

### Routing behavior

- Use `generateStaticParams()` if the project data supports static generation.
- Use `generateMetadata()` for project-specific page titles and descriptions.
- Because this repository uses Next.js 16, treat dynamic route `params` as a Promise and `await params` in both `generateMetadata()` and the page component. Do not use the older synchronous `params.slug` pattern.
- Keep `src/app/projects/[slug]/page.tsx` as a Server Component so it can export route metadata and static params. Put interactive gallery state and browser event handling in a separate Client Component, such as `src/components/project/ProjectGallery.tsx`, marked with `"use client"`.
- Pass serializable project/gallery data from the Server Component to the gallery component. Do not add `"use client"` to the route page just to support gallery interactions.
- Call `notFound()` for an unknown slug.
- A direct URL must work.
- Refreshing a project URL must work.
- Copying and opening a project URL in a new tab must work.
- Internal project cards and search results must navigate to the same canonical route.
- Confirm production/deployment behavior, not only client-side navigation.

### Content structure

A project detail page should contain:
1. Breadcrumb or back-to-projects navigation.
2. Project title and short summary.
3. Hero image or gallery.
4. Overview / problem being addressed.
5. Role and contribution, only when supported by current project data.
6. Key features.
7. Technology stack.
8. Gallery with active image state and accessible controls.
9. Demo and repository links, only when verified and available.
10. Related projects or a clear return path.

Reuse the useful gallery and metadata presentation from the existing project modal, including keyboard image navigation and image alternative text. Move the experience into a page rather than discarding it.

### Data requirements

- Add a canonical slug to each project record.
- Keep old fields while consumers are migrated.
- Add structured fields for overview, role/contribution, features, stack, gallery, repository URL, and demo URL only where appropriate.
- Add a canonical `slug` alongside the existing `id`; do not remove or repurpose numeric-string IDs because current components such as search may depend on them. Migrate all project navigation to the canonical slug route.
- Update search results to navigate to `/projects/[slug]` instead of selecting a project for the legacy detail modal.
- Validate that image paths exist.
- Use `notFound()` rather than showing a misleading blank page for missing data.
- Do not fabricate detail content to fill empty fields. Omit unavailable sections or use clearly authored, factual summaries from existing material.

### Retiring the project modal

Do not remove `ProjectModal` until:
- All project card entry points navigate to project pages.
- Search results use project routes.
- Share actions remain functional.
- Gallery functionality has a tested replacement.
- No remaining import or route depends on the modal.

After migration, remove or deprecate the old modal only as a separate, verified cleanup step.

---

## 9. Light and Dark Themes

Both themes are first-class, not an afterthought.

Requirements:
- Keep the existing `next-themes` infrastructure unless the audit during implementation proves a concrete issue.
- Provide a persistent, discoverable theme toggle.
- Respect system preference for first-time visitors where the existing theme setup supports it.
- Persist the user's explicit selection.
- Avoid theme flash or hydration mismatch.
- Verify text, muted text, borders, cards, shadows, gallery states, modal surfaces, focus rings, and hover states in both themes.
- Avoid making the light theme a simple inversion of dark colors if that creates poor contrast.
- Do not regress the existing contrast and focus fixes.

---

## 10. Navigation, Search, and Existing Modals

### Navigation

- Preserve existing navigation and social destinations unless a reviewed information-architecture change requires an update.
- Ensure `/about`, `/exploration`, and project pages remain reachable.
- Make active/focus states visible.
- Avoid hidden or hover-only navigation as the only way to access a destination.
- Test the mobile menu with keyboard and touch.

### Search

- Preserve existing accessible search behavior.
- Search results for projects should link to `/projects/[slug]`, not open the project modal.
- Keep dialog labelling, focus trapping, Escape handling, focus restoration, and keyboard selection working.
- Ensure results do not point to placeholder `#` destinations.

### Other modals

Preserve the existing useful behavior of contact, LinkedIn, and certificate dialogs unless a specific replacement is designed and tested. Do not remove an accessible modal merely because the overall visual design is changing.

---

## 11. Responsive and Accessibility Requirements

Test at minimum:
- Small mobile: 320–375 px wide.
- Typical mobile: 390–430 px wide.
- Tablet: around 768 px.
- Laptop: around 1024–1280 px.
- Wide desktop: 1440 px and above.

Requirements:
- No horizontal page overflow.
- No clipped headings, buttons, modal controls, or gallery thumbnails.
- Interactive targets must be comfortable for touch.
- All interactive controls must be keyboard reachable.
- Visible focus styles must remain.
- Use semantic headings and landmarks.
- Provide meaningful image alt text; decorative images should not create redundant announcements.
- Dialogs must be labelled and manage focus.
- Use reduced-motion alternatives.
- Maintain adequate contrast in both themes.
- Do not communicate status by color alone.
- Check browser zoom and longer text.
- Verify that the loader, menus, search, gallery, theme toggle, certificate modal, and project routes work without a mouse.

---

## 12. Performance and Asset Handling

- Prefer existing dependencies and existing optimized image patterns.
- Use `next/image` for appropriate local images and configure remote images only when necessary.
- Validate image paths and image dimensions before changing assets.
- Some project images may use `.jfif`. Conversion may be considered if there is a concrete compatibility or optimization reason; do not convert assets automatically without checking usage.
- Avoid adding large animation or 3D dependencies unless they are justified by the existing stack and performance budget.
- Lazy-load noncritical imagery where appropriate.
- Avoid animating large layout properties continuously.
- Ensure the page remains useful if nonessential animation or an external image fails.

---

## 13. Content Integrity

Use existing repository content and research notes as evidence. When a field is missing:
- Omit it, or
- Write a concise summary only if the existing content supports it.

Never invent:
- Employment or education dates.
- Project metrics or user counts.
- Production status or customer claims.
- Certificate IDs, issuers, dates, skills, or verification links.

For certificate metadata the user may fill in later, keep optional fields unset or documented as internal TODOs in the data/review process. Do not display placeholder strings or empty fields to visitors.
- Demo/repository URLs.
- Technologies that were not used.
- Personal biography details.

The existing `/about` page and data modules are the initial sources of truth. If two sources conflict, inspect the current repository and ask for clarification when the conflict cannot be resolved safely.

---

## 14. Implementation Plan

Implement in small, reviewable stages. After each stage, report the files changed, behavior changed, tests run, and remaining risks.

### Stage 0: Baseline and protection
- Inspect `git status --short` and relevant diffs.
- Confirm current route/data structure and available assets.
- Preserve all existing user changes and `.opencode/` infrastructure.
- Establish baseline build/type/lint results using scripts that actually exist in `package.json`.
- Do not commit or clean the working tree.

### Stage 1: Data preparation
- Inspect current project and certification data.
- Add canonical project slugs and structured detail fields where supported.
- Validate asset paths and outbound links.
- Keep existing fields and consumer compatibility.

### Stage 2: Project detail routes
- Create `/projects/[slug]` as a Server Component.
- Add static params and metadata using the Next.js 16 asynchronous `params` contract.
- Implement unknown-slug handling.
- Create a separate Client Component (for example, `ProjectGallery.tsx`) for interactive gallery state, keyboard controls, and touch behavior.
- Move gallery/detail behavior from the modal to the page.
- Update project cards and search results.
- Verify direct navigation, refresh, back/forward, keyboard gallery controls, and share behavior.

### Stage 3: Design tokens and theme
- Define semantic theme tokens.
- Implement restrained editorial/neo-brutalist visual rules.
- Check light/dark contrast and focus styles.
- Do not globally rewrite styles without checking existing component dependencies.

### Stage 4: Loading intro
- Implement the required greeting sequence and session behavior.
- Coordinate with scroll restoration.
- Add reduced-motion behavior and a safe fallback.
- Verify the progress indicator reaches 100% only after `Sugeng rawuh` completes.

### Stage 5: Homepage components
- Add or refine About and Moving Tech Stack, deriving the moving technology items from the existing verified dataset in `TechStack.tsx`.
- Do not reuse mock corporate/client names from `Marquee.tsx`.
- Refine Experience and Selected Projects.
- Preserve verified bio, real project content, share behavior, and accessibility.
- Move sections into the specified order.

### Stage 6: Certifications and navigation
- Refine certificate cards and accessible detail modal.
- Keep optional certificate metadata fields in the data model available for later completion by the user, but do not render unfilled placeholders in the public UI.
- Update navigation and search for project routes.
- Verify contact and LinkedIn modals still work.

### Stage 7: Responsive polish and QA
- Test all required viewport sizes.
- Test light and dark themes.
- Test reduced motion and keyboard-only interaction.
- Check console errors, broken images, invalid links, and route failures.
- Run the available build/type/lint/test scripts.
- Fix regressions before declaring completion.

### Stage 8: Cleanup
- Remove obsolete project-modal code only after confirming no consumers remain.
- Remove dead code only when its status and impact are verified.
- Do not delete `.opencode/`, research files, route pages, or user changes as part of generic cleanup.
- Do not commit unless explicitly asked.

---

## 15. Acceptance Checklist

### Design
- [ ] Experimental Editorial Hybrid direction is recognizable without visual clutter.
- [ ] Homepage follows the specified section order.
- [ ] Moving Tech Stack uses the existing verified technology dataset, not the legacy mock client list.
- [ ] Verified About and publication content, including DOI links, remains available.
- [ ] Light and dark themes are polished and readable.
- [ ] Dashed borders and neo-brutalist shadows are selective, not universal.
- [ ] Mobile layout has no horizontal overflow.

### Loading intro
- [ ] Greeting order is Indonesian → English → Japanese → Chinese/Mandarin → Javanese.
- [ ] Final greeting is exactly `Sugeng rawuh`.
- [ ] Progress reaches 100% only after the final greeting completes.
- [ ] Intro runs once per browser session.
- [ ] Reduced-motion behavior works.
- [ ] Scroll restoration does not jump under the active loader.

### Projects
- [ ] Each project has a unique canonical slug.
- [ ] Project cards navigate to dedicated project pages.
- [ ] Project details work on direct URL, refresh, and new tab.
- [ ] Dynamic route params follow the Next.js 16 async Promise contract.
- [ ] The project page remains a Server Component and interactive gallery behavior is isolated in a Client Component.
- [ ] Unknown slugs show the custom not-found experience.
- [ ] Gallery supports keyboard and touch.
- [ ] Existing share/clipboard behavior is preserved.
- [ ] No fabricated URLs or project claims appear.
- [ ] Project details no longer depend on `ProjectModal`.

### Certifications
- [ ] Certificate click opens an in-page modal.
- [ ] Modal supports keyboard, Escape, focus management, and scroll locking.
- [ ] External verification is a separate action and only appears when a real URL exists.
- [ ] Optional certificate fields can be completed later by the user.
- [ ] Unfilled certificate metadata is not shown as public placeholder text, empty rows, fake IDs, or dead buttons.
- [ ] No invented certificate metadata.

### Accessibility and quality
- [ ] Focus indicators and contrast fixes remain.
- [ ] Keyboard-only navigation works for core interactions.
- [ ] Reduced-motion preferences are respected.
- [ ] All key viewports are checked.
- [ ] No broken assets, placeholder links, or console errors remain.
- [ ] Available project checks pass, or any pre-existing failure is documented.

---

## 16. Definition of Done

The redesign is complete only when the new visual system and section order are implemented, all project details use robust dedicated routes, existing useful behavior and accessibility are preserved, both themes work, and responsive/manual plus automated checks have been completed.

A visually polished screenshot alone is not sufficient. Navigation, direct URLs, refresh, keyboard operation, reduced motion, content integrity, and protection of existing repository changes are part of the deliverable.
