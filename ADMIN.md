# Zennora Admin Guide

## 1. Create a personalized clinic demo

1. Open `demos/demo-template.html`.
2. Duplicate it.
3. Rename the copy with an unpredictable suffix, for example:

   ```text
   preview-k7m4q9.html
   ```

4. Open the copied file and find the clearly marked `DEMO_CONFIG` block near the bottom.
5. Change only these values:

   ```js
   clinicName: "ABC Dental Clinic",
   clinicWebsite: "https://exampleclinic.ca",
   preparedFor: "Clinic Owner",
   assistantName: "ABC Dental AI Receptionist",
   voiceflowProjectId: "PASTE_VOICEFLOW_PROJECT_ID_HERE"
   ```

6. In the Voiceflow embed code, find:

   ```js
   projectID: "..."
   ```

   Copy only the value inside the quotation marks and paste it into `voiceflowProjectId`.

7. Upload only the new HTML file to the existing `/demos/` folder in GitHub.
8. Share the URL:

   ```text
   https://zennora.ca/demos/preview-k7m4q9.html
   ```

### Demo privacy rules

- Never add the demo file to `sitemap.xml`.
- Do not link it from any public page.
- Use an unpredictable filename.
- Avoid using the full clinic name in the filename.
- Do not include confidential clinic, patient or health information.
- GitHub Pages links are unlisted, not truly private or password-protected.

## 2. Update Calendly

Open `site.js` and change:

```js
calendlyUrl: "https://calendly.com/zennora/30min?hide_gdpr_banner=1"
```

For a personalized demo page, update `bookingUrl` in that demo file's `DEMO_CONFIG` block when needed.

## 3. Update contact email

Public-facing links use the label **Email Zennora**, while the actual Gmail address remains in each `mailto:` link and configuration value.

Public website email is set in:

- `index.html`
- `dental.html`
- `privacy.html`
- `site.js`
- `demos/demo-template.html`

Search the project for `zennora.ca@gmail.com` and replace all occurrences.

## 4. Update pricing

Pricing appears in both:

- `index.html`
- `dental.html`

Search for:

```text
CA$199
CA$399
```

Update the plan features and pricing on both pages so they remain consistent.

## 5. Update the launch offer

The launch offer appears in:

- `index.html` under `id="launch-offer"`
- `dental.html` under `id="dental-launch"`

Keep the offer wording consistent on both pages.

## 6. Publish to GitHub Pages

### Replace the whole website

1. Download and unzip the V5.1 package.
2. Open the GitHub repository.
3. Upload all files and folders to the repository root.
4. Confirm `index.html` is at the root.
5. Commit the changes.
6. Wait a few minutes and open `https://zennora.ca` in a private browser window.

### Add one clinic demo only

Upload only the newly copied demo HTML file into `/demos/`. Do not replace the main website files.

## 7. Quick checks after publishing

- Homepage loads at `https://zennora.ca`
- Dental page loads at `https://zennora.ca/dental.html`
- Pricing buttons open Calendly
- Interactive scenario buttons work
- Contact form opens the email application
- Privacy link works
- Personalized demo loads the correct Voiceflow project
- Demo filename is not listed in the sitemap

## 8. Add a new industry page later

1. Copy `dental.html` as a starting point.
2. Rename it, for example `physio.html`.
3. Replace dental-specific content and safety wording.
4. Update the page title, description, canonical URL and structured data.
5. Add the public page to `sitemap.xml`.
6. Add a link from the homepage industry card only when the new page is ready.
