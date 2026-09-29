export type EvidenceType =
  | "quote"
  | "observation"
  | "metric"
  | "screenshot"
  | "log"
  | "constraint";

type EvidenceImage =
  | { imageSrc: string; imageAlt: string }
  | { imageSrc?: never; imageAlt?: never };

// Supplying an image always requires its alternative text, for any evidence type.
export type ProblemEvidence = {
  type: EvidenceType;
  label?: string;
  content: string;
  source?: string;
} & EvidenceImage;

export interface SubProblem {
  id: string;
  title: string;
  description: string;
  evidence?: ProblemEvidence[];
}

export interface ProblemSectionData {
  summary: string;
  keyQuestion?: string;
  problems: SubProblem[];
}
