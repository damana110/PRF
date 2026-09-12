# PRF — Project Row Fast

A mobile-first rowing training, fueling, recovery and progress PWA.

## v0.1

- Seven-day training and fueling plan
- Today timeline with planned workout, meals, snacks and creatine
- Tap any timeline item to mark Yes / Modified / No and add notes
- Daily body weight, sleep, recovery and notes
- Calendar navigation
- Recent progress check-ins
- Initial deterministic recovery coaching
- Local-first browser storage
- Installable/offline PWA shell

## Run locally

Serve the repository with any static web server. For example, from the repository directory:

`python -m http.server 8000`

Then open `http://localhost:8000`.

## GitHub Pages

In repository Settings → Pages, choose **Deploy from a branch**, select **main** and **/(root)**, then save. GitHub will publish the static PWA.

## Data

v0.1 stores logs locally in the browser. Cloud backup/sync and protected AI coaching will be added later. Do not put an OpenAI API key in frontend JavaScript.