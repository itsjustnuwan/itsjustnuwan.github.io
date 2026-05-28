# Nuwantha Peiris — Portfolio

A modern, premium static portfolio site for Nuwantha Peiris — IT Undergraduate & Banking Professional.

---

## 📁 Project Structure

```
portfolio/
├── index.html              ← Entry point
├── data/
│   └── content.json        ← ✏️  ALL editable content lives here
├── styles/
│   └── main.css            ← Design system & layout
├── scripts/
│   └── main.js             ← Renders content, handles interactions
├── assets/
│   ├── favicon.svg
│   └── og-image.png        ← Add a 1200×630 preview image
└── README.md
```

---

## ⚡ Local Development

No build step required. Just open with any static server:

```bash
# Option 1 — Python (built-in)
python3 -m http.server 8080

# Option 2 — Node (npx serve)
npx serve .

# Option 3 — VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8080`.

> **Note:** The site fetches `data/content.json` via `fetch()`, so it must be served over HTTP — opening `index.html` directly as a file (`file://`) may block the fetch in some browsers.

---

## 🚀 Deploy to GitHub Pages

1. Push this folder to a GitHub repository (e.g. `yourusername.github.io` or any repo).
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch** → `main` → `/ (root)`.
4. Click **Save**. Your site will be live at `https://yourusername.github.io/`.

---

## ✏️ Editing Content

**All site content is in `data/content.json`.** You never need to touch HTML or JS for routine updates.

### Add a new job

```json
// Inside "experience" array:
{
  "title": "Senior Analyst",
  "company": "New Company Ltd.",
  "period": "Jan 2026 – Present",
  "current": true,
  "sections": [
    {
      "heading": "Responsibilities",
      "duties": [
        "First duty here",
        "Second duty here"
      ]
    }
  ]
}
```

### Add an education entry

```json
// Inside "education" array:
{
  "degree": "MSc Computer Science",
  "institution": "University XYZ",
  "period": "2025 – 2027",
  "status": "Ongoing",
  "highlights": []
}
```

### Add a skill category

```json
// Inside "skills" array:
{
  "category": "Cloud & DevOps",
  "icon": "☁️",
  "items": ["AWS", "Docker", "CI/CD", "Linux"]
}
```

### Add a social link

```json
// Inside "social" array:
{
  "platform": "GitHub",
  "handle": "@itsjustnuwan",
  "url": "https://github.com/itsjustnuwan",
  "icon": "github"
}
```
Supported icon keys: `facebook`, `linkedin`, `twitter`, `instagram`, `github`.

### Add projects

```json
// Inside "projects" array:
{
  "title": "Banking Checklist Tool",
  "description": "HTML/JS workflow tool for front-end banking staff.",
  "tags": ["HTML", "JavaScript"],
  "url": "#"
}
```
*(Once the array is non-empty, update the `buildProjectsPlaceholder` function in `scripts/main.js` to render real cards.)*

---

## 🎨 Customisation

| What | Where |
|---|---|
| Colors / fonts | `:root` variables at top of `styles/main.css` |
| Layout tweaks | Relevant sections in `styles/main.css` |
| Animation timing | CSS keyframes in `styles/main.css` |
| Form endpoint | `action` attribute on `<form>` in `index.html` |
| OG image | Replace `assets/og-image.png` (1200×630px) |

---

## ♿ Accessibility

- Semantic HTML5 landmarks
- ARIA labels on interactive elements
- Keyboard navigable
- Reduced-motion friendly (animations use `opacity`/`transform` only)

---

## 📄 License

Personal portfolio — all rights reserved by Nuwantha Peiris.
