# Enterprise RLHF two-response annotator

Local-first React app for **pairwise** RLHF-style annotation: task envelope → deterministic tool calls → responses A/B → rubric + preference → JSON export.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

## Scripts

- `npm run dev`; Vite dev server
- `npm run build`; production bundle

## Data flow

1. Pick a task from the header dropdown.
2. **Run Task**; staged tool trajectory + retrieved JSON slices + programmatic A/B.
3. Optionally reveal **Show ideal answer** for oracle alignment.
4. Score both responses on all rubric dimensions, pick **Prefer A/B**, submit; browser downloads `rlhf_export_<taskId>_<timestamp>.json` and appends the same record to `localStorage` under `rlhf_local_dataset`.

## Deploy on Vercel

1. Push this repo to GitHub (e.g. `ayushrai-hub/UI_slack`).
2. In [Vercel](https://vercel.com), **Add New Project** → import that repository.
3. Leave defaults: **Framework Preset** = Vite, **Build Command** = `npm run build`, **Output Directory** = `dist`.
4. Deploy. Vercel will run `npm install` and serve the static build.

