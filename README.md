# Flipbook PDF — React (Vite)

A complete example that turns a PDF into an interactive flipbook with page-turn animation, zoom, fullscreen, keyboard shortcuts, and file upload.

## Features
- PDF rendering via `pdfjs-dist`
- Page-flip animation via `react-pageflip`
- Zoom in/out (0.6x–3x) and fullscreen (F key)
- Keyboard controls: ←/→ (flip), `+`/`-` (zoom), `F` (fullscreen)
- Upload your own PDF or use the included sample
- Clean dark UI

## Quick start
```bash
npm i
npm run dev
```

Put your default PDF in `public/sample.pdf` or upload at runtime using the **Load PDF** button.

## Build
```bash
npm run build
npm run preview
```

## Deploy
### Vercel
1. Push this project to a GitHub repo.
2. In Vercel, "New Project" → import your repo.
3. Framework preset: **Vite** (auto-detected). No extra env needed.
4. Deploy. Done.

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages (via Actions)
1. Install gh-pages (optional) or use an Actions workflow.
2. Set `base` in `vite.config.js` if deploying to a subpath, e.g. `/repo-name/`.
3. Build and publish the `dist` folder to the `gh-pages` branch.

## Notes
- For large PDFs, pages render progressively; you can start flipping as they load.
- If you need search, thumbnails, or TOC, create auxiliary components using the rendered images or PDF.js text layer.

# Valhora_catalogo