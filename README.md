# Lead Generation Architect

roduct Strategist You are a Senior Product Strategist and UX Architect with 20 years of experience designing high-converting consulting websites. Do NOT design a portfolio. Create the complete information architecture for a premium personal brand website. Goal: Generate qualified marketing leads. Audience: Startup founders, restaurants, clinics, e-commerce businesses and GCC companies. The website must answer these questions in order: - Who are you? - Can I trust you? - Have you done this before? - How can you help me? - Why should I choose you? - How do we work together? - How can I contact you? Every section should have a clear conversion goal. Avoid unnecessary sections. Think like Apple, Stripe and Linear.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2381f634-d201-4910-b25d-a273a71612bf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Analytics & lead tracking

The site now includes a privacy-friendly-by-default tracking layer that activates when the deployment environment contains the following public measurement IDs:

- `VITE_GA4_MEASUREMENT_ID` — Google Analytics 4
- `VITE_META_PIXEL_ID` — Meta Pixel
- `VITE_TIKTOK_PIXEL_ID` — TikTok Pixel

The code tracks page views, section views, scroll depth (25/50/75/90%), CTA clicks, outbound/social clicks, CV clicks, WhatsApp clicks, testimonial-proof clicks, lead-form starts, and `generate_lead` submissions.

UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) are persisted as first-touch and last-touch attribution and included in tracked events and the WhatsApp lead message.

The lead form is live: submitting it opens a pre-filled WhatsApp conversation to +20 155 671 1030 with the visitor's name, email, requested service, attribution data, and page URL.

Add the IDs through the deployment environment rather than hard-coding them in source code. The `.env.example` file shows the expected variable names.
