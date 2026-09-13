# PRF — Project Row Fast

A mobile-first rowing training, fueling, recovery and progress PWA.

## v0.4

- Seven-day training and fueling plan
- Today timeline with planned workout, meals, snacks and creatine
- Tap any timeline item to mark Yes / Modified / No and add notes
- Daily body weight, sleep, recovery and notes
- Calendar navigation
- Recent progress check-ins
- Initial deterministic recovery coaching
- Local-first browser storage
- Installable/offline PWA shell
- Read-only Concept2 Logbook sync through a Netlify Function
- Recent workout, split and interval import without exposing the Concept2 token to the browser
- Interactive plan setup for age, gender, weight, multiple goals and daily workout windows
- Equipment-aware exercise selection plus injury and limitation notes
- Omnivore, pescatarian, vegetarian and vegan meal planning
- Meal-prep rotation based on the number of dishes a user can realistically cook
- Reopenable profile settings that regenerate the week without deleting workout history
- Multiple calendar-style availability blocks per day with optimized session placement
- Daily readiness check-in moved to Today with a labeled five-point scale
- User-added activities on any day
- Weekly rotating meal-prep recommendations

## Run locally

Serve the repository with any static web server. For example, from the repository directory:

`python -m http.server 8000`

Then open `http://localhost:8000`. Concept2 sync requires Netlify local development or the deployed Netlify site.

## Netlify

The server-side Concept2 integration reads `CONCEPT2_TOKEN` from Netlify's runtime environment. The token must have `results:read` access.

## GitHub Pages

In repository Settings → Pages, choose **Deploy from a branch**, select **main** and **/(root)**, then save. GitHub will publish the static PWA.

## Data

v0.1 stores logs locally in the browser. Cloud backup/sync and protected AI coaching will be added later. Do not put an OpenAI API key in frontend JavaScript.
