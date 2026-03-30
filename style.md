# 🎨 Visual Identity & Design Specification: *Frontend I Code It*

## 1. Core Philosophy: "The Integrated Stream"
The site should not feel like a collection of "pages," but a **single, fluid intellectual journey**. 
- **Non-Sectional Navigation:** Navigation is a part of the layout, not a separate "header block."
- **Uniformity:** The design language must be robust enough to bridge the "Lab" (interactive) and the "Main Site" (content/commerce).

---

## 2. Integrated Navigation Architecture (Crucial)
To match the "Josh/Kent" vibe, the navigation must feel "ambient."
- **Zero-Header Layout:** No traditional thick colored bar at the top. 
- **Floating or Inline Nav:** - **Inline:** The logo and links sit directly on the same background as the content, separated only by generous whitespace (`pt-12`).
  - **Floating Dock:** A minimalist, semi-transparent (glassmorphism) dock at the top or bottom that only appears on scroll, or stays anchored within the content margins.
- **Visual Spec:** `backdrop-blur-md` with `bg-slate-900/50`. No hard borders; use a `1px` subtle top/bottom ring.

---

## 3. Color Palette (The "Midnight & Neon" Spectrum)
*Optimized for cross-site reuse (Dark Mode primary, Light Mode compatible).*

| Layer | Hex Code | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Background** | `#0F172A` | `bg-slate-900` | Main site background |
| **Surface/Card** | `#1E293B` | `bg-slate-800` | Component containers, code blocks |
| **Primary Brand** | `#22D3EE` | `text-cyan-400` | Links, primary buttons, highlights |
| **Secondary Brand** | `#C084FC` | `text-purple-400` | Accents, "Success" states |
| **Danger/Error** | `#F43F5E` | `text-rose-500` | Rollbacks, error messages |
| **Typography (Main)** | `#F8FAFC` | `text-slate-50` | Headers and body text |

---

## 4. Typography (The "Editorial" Stack)
- **Headings (H1, H2, H3):** `Geist Sans` (Bold/Black).
  - **Weight:** `font-extrabold` (800).
  - **Tracking:** `tracking-tighter` (-0.02em).
- **Body Text:** `Inter` (Regular/Medium).
  - **Size:** `18px` (`text-lg`) base size.
  - **Leading:** `leading-relaxed` (1.75) — *Key for long-form articles.*
- **Code:** `JetBrains Mono`. ligatures enabled.

---

## 5. Spacing & Layout (The "Josh Comeau" Ratio)
- **Single Column Flow:** Content width `max-w-4xl` (56rem / 896px) via `ui.mainShell`. 
- **The "Breathing" Room:** - Top padding for content: `pt-24` to `pt-32` (8rem+).
  - Vertical Rhythm: `mb-8` for paragraphs; `mt-16` for H2s.
- **Symmetry:** Ensure the main site (`icodeit.com.au`) uses the same margins to allow for seamless cross-linking.

---

## 6. UI Components & Effects
- **Soft-Diffuse Shadows:** `box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1)`.
- **Rounded Corners:** `rounded-3xl` (24px) for all primary containers/cards.
- **Glassmorphism:** Use `bg-opacity-50` and `backdrop-blur` for all overlay elements (Nav, Modals).

---

## 7. Interaction & Motion (Framer Motion)
- **Entrance:** Content should "float" up on load.
  - `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`.
- **Micro-interactions:** Subtle `scale: 1.02` on card hovers.
- **Springs:** `stiffness: 260, damping: 20`.

---

## 8. Cross-Site Reusability Spec
To ensure `frontend.icodeit.com.au` and `icodeit.com.au` look like siblings:
1.  **Shared Tailwind Config:** Copy the `colors`, `fontFamily`, and `borderRadius` sections exactly between both projects.
2.  **Shared Components:** Extract the `Nav`, `Footer`, and `Card` components into a structure that can be shared or replicated.
3.  **Global CSS:** Use the same CSS reset and custom scrollbar styles (thin, slate-700).

