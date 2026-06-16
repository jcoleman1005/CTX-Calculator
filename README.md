# CTX-Calculator (Rocephin IM Draw-Up Assistant)

A Vite + React build of the Rocephin calculator, configured to deploy to
GitHub Pages at **https://jcoleman1005.github.io/CTX-Calculator/** — the same
URL you already use. No links need to change.

## Run it locally

You need [Node.js](https://nodejs.org) (version 18 or newer) installed.

```bash
npm install      # one time, installs dependencies
npm run dev      # start the local dev server (with instant reload)
npm run build    # produce the production build in dist/
npm run preview  # preview the production build locally
```

## Deploy to GitHub Pages (automatic — recommended)

This repo includes a GitHub Actions workflow at
`.github/workflows/deploy.yml`. To turn it on, once:

1. Push these files to your repository.
2. In your repo on GitHub: **Settings -> Pages**.
3. Under **Build and deployment -> Source**, choose **GitHub Actions**.

From then on, every push to the `main` branch rebuilds the site and publishes
it automatically. You never hand-manage build files. (If your default branch
is not `main`, edit the branch name near the top of `deploy.yml`.)

## Important: the base path

`vite.config.js` sets `base: '/CTX-Calculator/'`. This must match the
repository name exactly, because GitHub serves project sites from a subpath.
If you ever rename the repo, update this value or the page will load blank
with 404s on its CSS and JavaScript.

## Where the clinical numbers live

All vial yields, per-site injection limits, and the dose ceiling are in the
`CONFIG` object at the top of `src/App.jsx`, each commented. These values must
be verified by a qualified clinician against current product labeling and your
institutional protocol. This tool does not confirm they are correct.
