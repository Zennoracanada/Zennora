# Zennora V5.1

GitHub Pages-ready static website for **Zennora AI Receptionist**.

## What is included

- Outcome-focused homepage
- Dental-specific landing page
- Guided public interactive demos
- Starter, Growth and Pro pricing
- Launch offer
- Privacy page
- Branded 404 page
- Standalone personalized Voiceflow demo template
- Admin instructions
- Lazy-loaded Calendly integration
- Consistent inline SVG icon system
- Public email links display `hello@zennora.ca` and use the matching mailto address

## Upload to GitHub

Upload the contents of this folder to the root of the GitHub repository. Keep the folder structure, especially:

```text
/demos/demo-template.html
```

The repository root should contain `index.html`, not an extra enclosing folder.

## Important settings

- Custom domain: `zennora.ca`
- Contact email: `zennora.ca@gmail.com`
- Calendly event: `https://calendly.com/zennora/30min`
- Keep `CNAME` in the repository root
- Keep `.nojekyll` in the repository root

## Public Voiceflow strategy

The public homepage and dental page do **not** load Voiceflow. They use guided HTML and JavaScript previews.

Voiceflow is reserved for qualified prospects through duplicated files based on:

```text
demos/demo-template.html
```

## Private demo limitation

GitHub Pages does not provide true password protection. Personalized demo pages are unlisted and marked `noindex`, but anyone with the exact URL may be able to access them. Do not place confidential clinic or patient information on a demo page.

See `ADMIN.md` for step-by-step operating instructions.
