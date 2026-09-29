import type { ReactNode } from "react";
import Link from "next/link";
import { projects, type Project, type TextBlock } from "@/data/projects";
import { ProjectMedia } from "./media";
import { Arrow } from "./site-shell";
import { ProblemSection } from "./problem-section";

function Content({ text }: { text?: string }) {
  return <p className={`whitespace-pre-line ${text?.trim() ? "text-text-secondary" : "empty-content"}`}>{text?.trim() || "Content will be added."}</p>;
}

export function CaseStudySection({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-heading`} className="case-section anchor-section">
    <div>
      <p className="mb-4 font-mono text-xs text-accent-readable">{number} /</p>
      <h2 id={`${id}-heading`} className="text-2xl leading-snug tracking-tight">{title}</h2>
    </div>
    <div className="min-w-0 space-y-8">{children}</div>
  </section>;
}

export function DecisionCard({ title, body, index }: TextBlock & { index: number }) {
  return <div className="surface p-6">
    <div className="accent-line mb-6" aria-hidden="true" />
    <h3 className="mb-4 text-lg">{title || `Decision 0${index + 1}`}</h3>
    <Content text={body} />
  </div>;
}

export function ChallengeSolutionRow({ challenge, solution }: { challenge: string; solution: string }) {
  return <div className="challenge-flow paired-grid surface grid gap-0 md:grid-cols-2">
    <div className="p-6">
      <h3 className="eyebrow mb-4 text-text-secondary">Challenge</h3>
      <Content text={challenge} />
    </div>
    <div className="challenge-solution border-t border-border p-6 md:border-t-0 md:border-l">
      <h3 className="eyebrow mb-4 flex items-center gap-2"><span className="rotate-90 md:rotate-0" aria-hidden="true"><Arrow /></span>Solution</h3>
      <Content text={solution} />
    </div>
  </div>;
}

export function MetricCard({ label, value, context, index }: { label: string; value: string; context: string; index: number }) {
  return <div className="surface p-6">
    <h3 className="mb-5 text-sm text-text-secondary">{label || `Metric 0${index + 1}`}</h3>{value.trim() ? <p className="text-3xl font-semibold text-accent-readable">{value}</p> : <Content />}{context && <p className="mt-3 text-sm text-text-secondary">{context}</p>}</div>;
}

export function ProjectHero({ project }: { project: Project }) {
  const metadata = [
    { label: "Type", value: project.metadata.type },
    { label: "Period", value: project.metadata.period },
    { label: "Role", value: project.metadata.role },
    { label: "Stack", value: project.metadata.stack.join(" · ") },
  ];
  return <div className="project-hero enter-page">
    <Link href="/#projects" className="nav-link mb-12 inline-flex gap-2 text-sm text-text-secondary">
      <Arrow back />Back to Projects</Link>
    <p className="eyebrow">{project.category}</p>
    <h1 className="project-title mt-5 max-w-4xl">{project.title}</h1>
    <p className="mt-6 max-w-3xl text-lg text-text-secondary">{project.summary}</p>
    <ul className="mt-6 flex list-none flex-wrap gap-2 p-0" aria-label="프로젝트 키워드">{project.keywords.map((keyword) => <li className="tag" key={keyword}>{keyword}</li>)}</ul>
    <dl className="my-10 grid gap-6 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-4">{metadata.map((item) => <div key={item.label}>
      <dt className="mb-2 font-mono text-xs uppercase tracking-widest text-text-secondary">{item.label}</dt>
      <dd className="m-0 text-sm">{item.value || <span className="empty-content">Content will be added.</span>}</dd>
    </div>)}</dl>
    <ProjectMedia image={project.image} label={project.title} index={`0${projects.findIndex((item) => item.slug === project.slug) + 1}`} priority />
  </div>;
}

export function ProjectNavigation({ project }: { project: Project }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  return <nav aria-label="프로젝트 탐색" className="border-t border-border py-12">
    <div className="grid gap-6 sm:grid-cols-2">{previous && <Link className="project-nav-link surface p-6" scroll={false} href={`/projects/${previous.slug}`}>
      <span className="mb-3 flex items-center gap-2 font-mono text-xs text-text-secondary">
        <Arrow back />Previous</span>
      <span className="text-lg font-semibold">{previous.title}</span>
    </Link>}{next && <Link className="project-nav-link surface p-6 sm:col-start-2" scroll={false} href={`/projects/${next.slug}`}>
      <span className="mb-3 flex items-center justify-between font-mono text-xs text-text-secondary">Next<Arrow />
      </span>
      <span className="text-lg font-semibold">{next.title}</span>
    </Link>}</div>
    <Link className="nav-link mt-8 inline-flex gap-2 text-sm text-text-secondary" href="/">
      <Arrow back />홈으로 돌아가기</Link>
  </nav>;
}

export function CaseStudy({ project }: { project: Project }) {
  const { problem, approach, howItWorks, challenges, results, next } = project.sections;
  const decisions = approach.decisions.length ? approach.decisions : Array.from({ length: 3 }, () => ({ title: "", body: "" }));
  const steps = howItWorks.steps.length ? howItWorks.steps : Array.from({ length: 3 }, () => ({ title: "", body: "" }));
  const issues = challenges.items.length ? challenges.items : [{ challenge: "", solution: "" }];
  const metrics = results.metrics.length ? results.metrics : Array.from({ length: 3 }, () => ({ label: "", value: "", context: "" }));
  return (
    <main id="main-content" tabIndex={-1} className={`${project.theme} page-container`}>
      <ProjectHero project={project} />
      <CaseStudySection id="problem" number="01" title="Problem">
        <ProblemSection data={problem} />
      </CaseStudySection>
      <CaseStudySection id="approach" number="02" title="Approach / Key Decision">
        <Content text={approach.body} />
        <div className="grid gap-4 lg:grid-cols-3">{decisions.map((decision, index) => <DecisionCard {...decision} index={index} key={index} />)}</div>
      </CaseStudySection>
      <CaseStudySection id="how-it-works" number="03" title="How It Works">
        <Content text={howItWorks.body} />
        <ProjectMedia image={howItWorks.diagram} label="Architecture / Flow" />
        <ol className="step-grid grid list-none gap-6 p-0 md:grid-cols-3">{steps.map((step, index) => <li key={index} className="border-t border-border-strong pt-5">
          <span className="font-mono text-xs text-accent-readable">0{index + 1}</span>
          <h3 className="my-3 font-semibold">{step.title || `Step 0${index + 1}`}</h3>
          <Content text={step.body} />
        </li>)}</ol>
      </CaseStudySection>
      <CaseStudySection id="challenges" number="04" title="Challenge & Solution">
        <Content text={challenges.body} />
        {issues.map((issue, index) => <ChallengeSolutionRow {...issue} key={index} />)}
      </CaseStudySection>
      <CaseStudySection id="results" number="05" title="Result & Learning">
        <div className="grid gap-4 lg:grid-cols-3">{metrics.map((metric, index) => <MetricCard {...metric} index={index} key={index} />)}</div>
        <div>
          <h3 className="mb-4 text-lg">Result</h3>
          <Content text={results.body} />
        </div>
        <div>
          <h3 className="mb-4 text-lg">Learning</h3>
          <Content text={results.learning} />
        </div>
      </CaseStudySection>
      <CaseStudySection id="next-steps" number="06" title="Limitations / Next Step">
        <div className="paired-grid grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg">Limitations</h3>
            <Content text={next.limitations} />
          </div>
          <div>
            <h3 className="mb-4 text-lg">Next Step</h3>
            <Content text={next.steps} />
          </div>
        </div>
      </CaseStudySection>
      <ProjectNavigation project={project} />
    </main>
  );
}
