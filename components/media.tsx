import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

export function MediaPlaceholder({ label = "Project image", index }: { label?: string; index?: string }) {
  return <div className="media-placeholder">
    <div className="placeholder-frame" aria-hidden="true">
      <span className="placeholder-mark">{index || "+"}</span>
      <span className="placeholder-rule" />
    </div>
    <div className="placeholder-caption">
      <span>{label}</span>
      <span>IMAGE PLACEHOLDER</span>
    </div>
  </div>;
}

export function ProjectMedia({ image, label, index, priority = false, showCaption = true }: { image: ProjectImage; label: string; index?: string; priority?: boolean; showCaption?: boolean }) {
  return <figure className="min-w-0">
    <div className="project-media" data-project-media>{image.src.trim() ? <Image src={image.src} alt={image.alt || label} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 1200px" className="object-cover" priority={priority} /> : <MediaPlaceholder label={label} index={index} />}</div>{showCaption && image.caption && <figcaption className="mt-3 text-sm text-text-secondary">{image.caption}</figcaption>}</figure>;
}
