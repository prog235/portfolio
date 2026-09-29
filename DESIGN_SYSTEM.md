# Portfolio design system

Next.js 16.3.6 App Router / Tailwind CSS 4.3.3. Keep the existing
`@tailwindcss/postcss` plugin; no v3 config file or extra dependency is needed.
Tokens live in `app/globals.css`. Base and component layers allow Tailwind
utilities to override defaults.

## Tokens

- Colors: `--background`, `--surface`, `--surface-elevated`, `--foreground`,
  `--text-secondary`, `--text-muted`, `--primary`, `--magenta`, `--blue`,
  `--cyan`, `--warm-pink`, `--border`, `--border-strong`.
- Tailwind examples: `bg-surface`, `text-text-secondary`, `border-border`,
  `rounded-card`, `rounded-button`, `text-hero`, `font-sans`, `font-mono`.
- Layout: `--content-max-width` (1200px), `--reading-max-width` (760px),
  `--section-spacing` (72/120px), `--page-padding` (20/32px),
  `--card-radius` (20px), `--button-radius` (10px).
- `text-hero` supplies a responsive clamp, line height and tracking.
- Inter and JetBrains Mono are self-hosted through next/font, fetched at build
  time. Pretendard is preferred when locally installed; Korean otherwise uses
  system fonts. No external CSS imports are used for fonts.

## Classes

- `page-container`: centered 1200px content plus responsive side gutters.
- `reading-container`: centered 760px reading width; nest inside page-container.
- `section`: responsive vertical padding.
- `eyebrow`: uppercase mono label with readable project accent.
- `gradient-text`: primary gradient for large emphasized words only.
- `surface`: neutral bordered panel.
- `project-card`: panel with fine-pointer hover lift and accent border.
  Wrap its image in `data-project-media` for a clipped 1.02x hover zoom.
  Add padding with Tailwind. Use semantic links/buttons for interaction.
- `tag`: mono pill; linked tags receive a 44px minimum height.
- `button-primary`, `button-secondary`: 44px targets, focus and disabled styles.
- `accent-line`: decorative 2px project gradient; use `aria-hidden="true"`.

## Project themes

Apply `theme-experience` (Unity AI Interactive Narrative), `theme-efficiency`
(Agent Town Distillation), or `theme-brand` (Calmato Web) on a card or detail
page ancestor. Each supplies `--accent-start`, `--accent-end`, `--accent`,
`--accent-soft`, and `--accent-gradient`. The default is experience.
`--accent-readable` / `text-accent-readable` provide lighter colors for small
labels and metrics; raw blue is intended for decoration rather than body text.

```tsx
<section className="theme-efficiency section">
  <div className="page-container">
    <article className="project-card p-6">
      <div className="accent-line" aria-hidden="true" />
      <p className="eyebrow mt-4">AI × Efficiency</p>
      {/* Future project content */}
    </article>
  </div>
</section>
```

## Accessibility

Use foreground/secondary for body text. Muted is reserved for decoration and
inactive controls. Primary buttons darken the specified gradient slightly so
white normal-size labels retain contrast, including hover. All focusable
controls receive a visible outline; motion is disabled under reduced motion.
Inline prose links remain inline; standalone navigation/CTA links should use
button classes or `inline-flex min-h-11 items-center` for a 44px touch target.

Use native `<button disabled>` for disabled actions. `aria-disabled` only styles
links/custom controls: callers must prevent activation and remove an inactive
link's href. CSS alone does not disable interaction. Decorative elements must
use `pointer-events-none` and `aria-hidden`. Background glows are CSS backgrounds,
so they create no interactive or overflowing elements.

The landing page and shared case study templates now use these foundations.
See `PORTFOLIO.md` for content, images, links and route editing.
