import Image from "next/image";
import type { EvidenceType, ProblemEvidence, ProblemSectionData, SubProblem } from "@/data/problem";

const evidenceLabels: Record<EvidenceType, string> = {
  quote: "QUOTE",
  observation: "OBSERVATION",
  metric: "METRIC",
  screenshot: "SCREENSHOT",
  log: "LOG",
  constraint: "CONSTRAINT",
};

function hasImage(evidence: ProblemEvidence) {
  return Boolean(evidence.imageSrc?.trim() && evidence.imageAlt?.trim());
}

function hasEvidence(evidence: ProblemEvidence) {
  // A source/label alone is not evidence, and an empty quote is never an attribution.
  return evidence.type === "quote"
    ? Boolean(evidence.content.trim())
    : Boolean(evidence.content.trim() || hasImage(evidence));
}

export function ProblemEvidenceItem({ evidence }: { evidence: ProblemEvidence }) {
  if (!hasEvidence(evidence)) return null;
  const isQuote = evidence.type === "quote";
  return (
    <div className={isQuote ? "min-w-0 border-l-2 border-accent bg-accent-soft p-4" : "min-w-0"}>
      <p className="mb-3 flex items-center gap-2 font-mono text-xs tracking-widest text-accent-readable">
        <span aria-hidden="true" className="h-px w-4 shrink-0 bg-accent-readable" />
        {evidenceLabels[evidence.type]}
      </p>
      {evidence.label?.trim() && <p className="mb-2 text-sm font-medium">{evidence.label}</p>}
      {isQuote ? (
        <blockquote className="m-0 whitespace-pre-line text-sm leading-7 text-foreground">
          “{evidence.content}”
        </blockquote>
      ) : evidence.type === "log" && evidence.content.trim() ? (
        <pre className="m-0 whitespace-pre-wrap break-words p-3 text-xs leading-6 text-text-secondary"><code>{evidence.content}</code></pre>
      ) : evidence.content.trim() ? (
        <p className="whitespace-pre-line text-sm leading-7 text-text-secondary">{evidence.content}</p>
      ) : null}
      {hasImage(evidence) && (
        <div className={`mt-4 overflow-hidden rounded-button border border-border bg-background ${evidence.type === "screenshot" ? "" : "relative aspect-video"}`}>
          {evidence.type === "screenshot" ? (
            // Screenshots have unknown dimensions; let the browser use their intrinsic ratio.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={evidence.imageSrc!}
              alt={evidence.imageAlt!}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          ) : <Image
            src={evidence.imageSrc!}
            alt={evidence.imageAlt!}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-contain"
          />}
        </div>
      )}
      {evidence.source?.trim() && <p className="mt-3 text-xs leading-6 text-text-secondary">출처: {evidence.source}</p>}
    </div>
  );
}

export function SubProblemCard({ problem, index }: { problem: SubProblem; index: number }) {
  const evidence = problem.evidence?.filter(hasEvidence) ?? [];
  return (
    <article className="flex min-w-0 flex-col rounded-card border border-white/[0.06] bg-surface/40 p-5 sm:p-6">
      <span className="mb-4 font-mono text-xs text-text-secondary">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="break-keep text-base font-semibold leading-relaxed">{problem.title.trim() || "Content will be added."}</h3>
      <p className="mt-4 whitespace-pre-line text-text-secondary">{problem.description.trim() || "Content will be added."}</p>
      {evidence.length > 0 && (
        <ul aria-label="문제를 뒷받침하는 근거" className="mt-auto list-none space-y-5 p-0 pt-7">
          {evidence.map((item, evidenceIndex) => (
            <li key={evidenceIndex} className="min-w-0"><ProblemEvidenceItem evidence={item} /></li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function ProblemSection({ data }: { data: ProblemSectionData }) {
  return (
    <>
      <div>
        <p className="eyebrow mb-3 text-text-secondary">CORE PROBLEM</p>
        <p className={data.summary.trim() ? "whitespace-pre-line text-lg leading-relaxed" : "empty-content"}>
          {data.summary.trim() || "Content will be added."}
        </p>
      </div>
      {data.keyQuestion?.trim() && (
        <div className="surface p-5 sm:p-6">
          <h3 className="eyebrow mb-3">KEY QUESTION</h3>
          <p className="whitespace-pre-line text-lg leading-relaxed">{data.keyQuestion}</p>
        </div>
      )}
      {data.problems.length > 0 && (
        <div className="problem-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:[&>article:last-child:nth-child(odd)]:col-span-2">
          {data.problems.map((problem, index) => <SubProblemCard key={problem.id} problem={problem} index={index} />)}
        </div>
      )}
    </>
  );
}
