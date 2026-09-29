# Portfolio editing guide

## Routes and ownership

- `/`: `app/page.tsx` composes the landing sections in `components/landing.tsx`.
- `/projects/[slug]`: shared page with `generateStaticParams`, `generateMetadata`,
  and `notFound`. All three known project pages are built as static HTML.
- `components/case-study.tsx`: shared hero, six numbered sections and navigation.
- `components/media.tsx`: 16:9 image / themed placeholder.
- `components/site-shell.tsx`: sticky header, footer and arrow.
- `components/route-scroll.tsx`: the only Client Component; resets page navigation
  to the top while preserving hash navigation. Everything else is server-rendered.
- `app/globals.css`: existing Tailwind v4 tokens plus portfolio layout classes.

## Project content

Edit `data/projects.ts`. `Project` and `ProjectSections` define the complete schema.
The array order controls cards and Previous/Next navigation. Each project has its
own fresh sections object. Keep slug stable to preserve incoming links.

Replace `sections: emptySections()` for a project with an explicit object, or start
with the factory and override a section:

```ts
sections: {
  ...emptySections(),
  problem: {
    summary: "핵심 문제를 1~2문장으로 입력합니다.",
    keyQuestion: "", // Optional: blank/omitted means no box.
    problems: [{
      id: "unique-problem-id",
      title: "세부 문제 제목",
      description: "문제 설명",
      evidence: [{ type: "constraint", content: "확인된 기술적 제약" }],
    }],
  },
  approach: { body: "", decisions: [{ title: "", body: "" }] },
  howItWorks: { body: "", diagram: { src: "", alt: "" }, steps: [] },
  challenges: { body: "", items: [{ challenge: "", solution: "" }] },
  results: { body: "", metrics: [{ label: "", value: "", context: "" }], learning: "" },
  next: { limitations: "", steps: "" },
}
```

Blank text shows `Content will be added.`. Each populated field replaces its own
placeholder. Empty arrays show layout slots: three decisions, three steps, one
challenge/solution pair, and three metrics. Populated arrays render exactly the
supplied items, so no unused slots remain. Metrics never manufacture zero values.

Add type (개인 프로젝트 / 팀 프로젝트), period, role and stack under `metadata`. No dates, roles, metrics, interviews
or service outcomes have been invented. Unity Problem uses the supplied initial content. Agent Town and Calmato Problem
remain empty pending confirmed content; no quote or metric has been invented.

## Images

Place an actual image in `public/projects/`, then set that project's `image`:

```ts
image: {
  src: "/projects/your-actual-file.webp",
  alt: "이미지에서 전달하는 내용을 설명하는 대체 텍스트",
  caption: "", // Optional
}
```

The same image is used on the card and hero. `howItWorks.diagram` uses the same shape. Empty `src` renders a designed placeholder
without making a network request. Nonempty paths must point to real files. Images
are cropped to 16:9 with `object-cover`. For remote images, explicitly configure
Next.js `images.remotePatterns` for the chosen domain first. No remote domain or
fake image path is configured now.

## Actual links and SEO

`config/site.ts` contains `links.github`, `links.resume`, and `links.contact`.
They are empty by default and omitted from the footer until supplied. A contact
URL may use an actual `mailto:` value. No contact information is guessed.
Root SEO uses this config; project SEO uses each title and summary. No nonexistent
Open Graph image is referenced.

## Validation

Run `npm run lint` and `npm run build`. This environment denied Turbopack's
internal process port even on its permission retry; `npm run build -- --webpack`
completed a production build with TypeScript and all four pages prerendered.
Google fonts require network access during the build, as in the existing setup.
No dependencies or build script defaults were changed.

Browser checks use 375px, 768px and 1280px: grid columns, horizontal overflow,
16:9 media, single h1, stacked mobile comparisons, 44px links, keyboard focus,
anchor offsets, previous/next links, route scroll position and console errors.

## Problem section

Types are in `data/problem.ts`; rendering is in `components/problem-section.tsx`.
Edit each project's `sections.problem` in `data/projects.ts`.

- `summary`: Core Problem. Blank values show a neutral content placeholder.
- `keyQuestion`: optional; blank/whitespace values render nothing.
- `problems`: each item has a stable unique `id`, `title`, `description`, and an
  optional `evidence` array. An empty array renders no fabricated problem cards.
- Evidence types: `quote`, `observation`, `metric`, `screenshot`, `log`, `constraint`.
  Each displays its type label, optional custom `label`, `content`, and `source`.
  Only quote uses quotation marks, a tinted background and vertical accent line.
  Logs preserve whitespace and wrap long lines; metric content is supplied text.
- `imageSrc` requires `imageAlt` in TypeScript. Use a nonempty descriptive alt.
  Image evidence is shown in full with `object-contain`, without cropping.
- Empty evidence (including whitespace-only content) is hidden. A valid image
  can stand alone, but a quote always requires actual text. Labels/sources alone
  do not create evidence. Evidence images without a nonempty alt are not rendered.
- Two cards form two desktop columns. Odd final cards span the row (three cards
  use a 2+1 layout); mobile is always one column.

Migration: the old Problem bodies, quotes and evidence were empty in all three
projects. They were replaced by `summary: "", problems: []`. The supplied Unity
content was then added. All unrelated project fields and sections were retained.
