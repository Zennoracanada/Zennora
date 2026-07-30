# Zennora Admin Guide — v5.2

## Website corrections included

1. Starter remains **CA$199/month**.
2. Starter annual option is **CA$2,189/year — one month free**.
3. The regular **CA$499 one-time setup and onboarding fee** is shown.
4. The founding offer says the CA$499 setup fee is waived for the **first 5 founding clients/clinics**.
5. “Solutions” is presented as **What Zennora does**, while “Business outcomes” focuses only on results.
6. Pricing buttons send the selected plan to Calendly.
7. The privacy page keeps a broader disclosure for third-party AI providers, including Voiceflow.

## Calendly plan mapping

Calendly must keep this custom question as the first custom question:

**Which plan are you interested in?**

1. Starter Plan
2. Growth Plan
3. Pro / Custom Plan
4. Not sure — help me choose

`site.js` maps the website buttons as follows:

- Starter → `a1=1`
- Growth → `a1=2`
- Pro / Custom → `a1=3`
- General demo → `a1=4`

UTM campaign tracking is also added automatically.

## Files changed in v5.2

Replace at the repository root:

- `index.html`
- `dental.html`
- `privacy.html`
- `site.js`
- `ADMIN.md`

Add at the repository root:

- `updates.css`

Do not delete or replace:

- `style.css`
- `CNAME`
- `favicon.svg`
- `robots.txt`
- `sitemap.xml`
- `demos/`
- existing personalized demo pages

## Personalized demo reminder

For each clinic:

1. Duplicate `demos/demo-template.html`.
2. Use an unpredictable filename.
3. Change the clinic configuration block.
4. Paste the correct Voiceflow project ID.
5. Test the clinic information and booking links.
6. Share only the personalized demo URL.
