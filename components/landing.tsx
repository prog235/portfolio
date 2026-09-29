import Link from "next/link";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import { calmatoChannel } from "@/data/calmato";
import { siteConfig } from "@/config/site";
import { Arrow } from "./site-shell";
import { ProjectMedia } from "./media";

export function HeroSection() {
  return <section className="hero-section page-container">
    <div className="enter-page">
      <p className="eyebrow text-text-secondary">AI PRODUCT BUILDER PORTFOLIO</p>
      <h1 className="hero-heading mt-8">문제를 발견하고,<br />
        <span className="gradient-text">해결책을 직접</span> 구현합니다.</h1>
      <p className="mt-8 max-w-2xl text-lg text-foreground sm:text-xl">사용자 몰입, 성능과 비용, 서비스 운영에서 발견한 문제를 AI와 소프트웨어를 활용해 직접 해결해 왔습니다.</p>
      <p className="mt-4 max-w-2xl text-text-secondary">무엇을 만들었는지뿐 아니라, 문제를 해결하며 내린 판단과 그 결과를 담았습니다.</p>
      <Link href="#projects" className="button-primary mt-9">프로젝트 보기 <Arrow />
      </Link>
    </div>
  </section>;
}

const perspectives = [
  { label: "Experience", title: "AI가 만드는 사용자 가치", body: "AI가 실제 사용자 경험과 몰입을 어떻게 변화시킬 수 있는지 고민합니다.", theme: "theme-experience" },
  { label: "Efficiency", title: "성능과 비용의 균형", body: "가장 큰 모델보다 제품 목적에 적합한 성능과 비용의 균형을 찾습니다.", theme: "theme-efficiency" },
  { label: "Product", title: "실제 문제에서 시작", body: "사용자와 운영자의 문제를 발견하고 작동하는 기능과 서비스로 구체화합니다.", theme: "theme-brand" },
];

export function PerspectiveSection() {
  return <section className="page-container section" aria-labelledby="perspective-heading">
    <p className="section-label eyebrow text-text-secondary">HOW I BUILD</p>
    <h2 id="perspective-heading" className="section-heading mt-6">세 가지 관점으로 설계합니다.</h2>
    <p className="mt-5 font-mono text-xs tracking-widest text-text-secondary">PROBLEM → DECISION → BUILD → LEARN</p>
    <div className="mt-12 grid gap-11 md:grid-cols-3 md:gap-10">{perspectives.map((item, index) => <div key={item.label} className={`${item.theme} perspective-item border-l-2 border-accent/40 py-5 pl-5 md:pl-6`}>
      <div className="mb-5 flex items-center justify-between">
        <p className="eyebrow">{item.label}</p>
        <span className="font-mono text-xs text-text-secondary">0{index + 1}</span>
      </div>
      <h3 className="text-xl">{item.title}</h3>
      <p className="mt-3 max-w-sm text-text-secondary">{item.body}</p>
    </div>)}</div>
  </section>;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Link scroll={false} href={`/projects/${project.slug}`} className={`project-card work-card ${project.theme}`} aria-label={`${project.title} — Case Study 보기`}>
    <div className="accent-line rounded-t-card" aria-hidden="true" />
    <ProjectMedia image={project.image} label={project.title} index={`0${index + 1}`} showCaption={false} />
    <div className="flex flex-1 flex-col p-6">
      <p className="eyebrow">{project.category}</p>
      <h3 className="mt-4 text-2xl leading-tight tracking-tight">{project.title}</h3>
      <p className="mt-4 text-sm leading-7 text-text-secondary">{project.summary}</p>
      <ul className="mt-6 flex list-none flex-wrap gap-2 p-0" aria-label="프로젝트 키워드">{project.keywords.map((keyword) => <li key={keyword} className="tag">{keyword}</li>)}</ul>
      <span className="mt-auto flex items-center justify-between border-t border-border pt-5 text-sm font-medium">
        <span className="pt-0">View Case Study</span>
        <span className="text-accent-readable">
          <Arrow />
        </span>
      </span>
    </div>
  </Link>;
}

export function ProjectGrid() {
  return <section id="projects" className="section page-container anchor-section" aria-labelledby="projects-heading">
    <p className="section-label eyebrow text-text-secondary">SELECTED WORK</p>
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <h2 id="projects-heading" className="section-heading mt-6 max-w-3xl">발견하고,<br className="sm:hidden" /> 구현하고, 개선한 경험</h2>
      </div>
      <span className="font-mono text-xs text-text-secondary">03 CASE STUDIES</span>
    </div>
    <p className="mt-5 max-w-2xl text-text-secondary">각 프로젝트는 AI Product Builder에게 필요한 서로 다른 판단과 실행 경험을 담고 있습니다.</p>
    <div className="project-grid mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
  </section>;
}

export function CalmatoSection() {
  const channel = calmatoChannel;
  return <section id="calmato" className="section page-container anchor-section theme-brand" aria-labelledby="calmato-heading">
    <p className="section-label eyebrow text-text-secondary">BEYOND DEVELOPMENT</p>
    <h2 id="calmato-heading" className="section-heading mt-6 max-w-3xl">{channel.heading}</h2>
    <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <figure className="min-w-0">
        <div className={`overflow-hidden rounded-card border border-border bg-surface ${channel.image.src.trim() ? "" : "relative aspect-video"}`}>
          {channel.image.src.trim() ? <>
            {/* Channel visuals vary in size, so preserve the source image's intrinsic ratio. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={channel.image.src} alt={channel.image.alt} loading="lazy" decoding="async" className="block h-auto w-full" />
          </> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-accent-soft p-6 text-center">
              <span aria-hidden="true" className="text-4xl font-semibold tracking-tight text-accent-readable sm:text-5xl">Calmato</span>
              <p className="font-mono text-xs tracking-widest text-text-secondary">CHANNEL VISUAL</p>
              <p className="text-xs text-text-secondary">대표 이미지가 들어갈 자리입니다.</p>
            </div>}
        </div>
        {channel.image.caption && <figcaption className="mt-3 text-sm text-text-secondary">{channel.image.caption}</figcaption>}
      </figure>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface">
            {channel.logo.src.trim() ? <Image src={channel.logo.src} alt={channel.logo.alt} fill sizes="64px" className="object-contain p-1" /> : <span className="font-mono text-[10px] tracking-widest text-text-secondary">LOGO</span>}
          </div>
          <div><p className="eyebrow">YOUTUBE CHANNEL</p><h3 className="mt-2 text-3xl tracking-tight">{channel.name}</h3></div>
        </div>
        <p className="mt-5 max-w-md text-text-secondary">{channel.description}</p>
        <dl className="mt-8 border-l-2 border-accent/40 pl-5">
          <dt className="text-xs text-text-secondary">{channel.audienceLabel}</dt>
          <dd className="mt-2 text-4xl font-semibold tracking-tight text-accent-readable">{channel.audience}<span className="ml-2 text-base font-normal">명</span></dd>
        </dl>
        <p className="mt-7 text-xs text-text-secondary">담당 영역</p>
        <p className="mt-2 text-sm">{channel.role}</p>
      </div>
    </div>
    <div className="mt-12 grid min-w-0 gap-8 sm:grid-cols-2">
        {channel.cases.map((item, index) => <article key={item.label} className="min-w-0 border-l border-border-strong pl-5 sm:pl-6">
          <span aria-hidden="true" className="font-mono text-xs text-accent-readable">0{index + 1}</span>
          <p className="mt-4 font-mono text-[10px] tracking-widest text-text-secondary">{item.label}</p>
          <h3 className="mt-3 text-xl leading-relaxed">{item.title}</h3>
          <p className="mt-5 text-sm leading-7 text-text-secondary">{item.observation}</p>
          <div className="mt-6">
            <p className="text-xs font-medium text-accent-readable">다음 콘텐츠에 반영한 변화</p>
            <p className="mt-3 text-sm leading-7">{item.action}</p>
          </div>
        </article>)}
    </div>
    {channel.channelUrl && <div className="mt-10 flex">
      <a href={channel.channelUrl} target="_blank" rel="noopener noreferrer" className="button-primary text-sm">YouTube로 이동하기 <Arrow /></a>
    </div>}
  </section>;
}

export function AboutSection() {
  return <section id="about" className="section page-container anchor-section" aria-labelledby="about-heading">
    <p className="section-label eyebrow text-text-secondary">ABOUT</p>
    <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_2fr] md:gap-12">
      <div className="min-w-0">
        <div className="relative aspect-square w-full max-w-64 overflow-hidden rounded-card border border-border bg-surface">
          {siteConfig.profile.imageSrc.trim() ? <Image src={siteConfig.profile.imageSrc} alt={siteConfig.profile.imageAlt} fill sizes="256px" className="object-cover" /> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-text-secondary">
            <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-16"><circle cx="24" cy="16" r="8" /><path d="M9 42v-4a15 15 0 0 1 30 0v4" /></svg>
            <span className="font-mono text-xs tracking-widest">PROFILE PHOTO</span>
          </div>}
        </div>
        <ul className="mt-5 list-none space-y-1 p-0 text-sm">
          <li><a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 max-w-full items-center gap-3 text-text-secondary hover:text-foreground" aria-label="GitHub 프로필">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.09 1.15a10.78 10.78 0 0 1 5.62 0c2.15-1.45 3.09-1.15 3.09-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.03.76 2.08v3.11c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" /></svg>
            <span className="min-w-0 break-all">{siteConfig.links.github.replace(/^https?:\/\//, "")}</span>
          </a></li>
          <li><div className="flex min-h-11 items-center gap-3 text-text-secondary">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5 shrink-0"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            {siteConfig.profile.email.trim() ? <a href={`mailto:${siteConfig.profile.email}`} className="min-w-0 break-all hover:text-foreground">{siteConfig.profile.email}</a> : <span>이메일 입력 예정</span>}
          </div></li>
        </ul>
      </div>
      <div className="max-w-3xl md:col-start-2">
        <h2 id="about-heading" className="section-heading">기술을 사용자 가치로 연결합니다.</h2>
        <p className="mt-7 text-text-secondary">컴퓨터공학을 전공하며 AI 시스템, 웹 서비스, 인터랙티브 콘텐츠를 직접 구현해 왔습니다. 기술 자체보다 어떤 문제를 해결하고 어떤 경험을 만들 수 있는지를 먼저 고민하며, 아이디어를 실제로 작동하는 형태까지 완성하는 과정을 좋아합니다.</p>
        <p className="mt-5 text-text-secondary">음악 콘텐츠 채널 운영, LLM Agent 시스템 경량화, AI NPC 기반 게임 개발을 통해 문제 정의부터 구현, 안정화, 평가까지 서로 다른 역량을 길러왔습니다.</p>
        <ul className="mt-8 flex list-none flex-wrap gap-2 p-0">{["Problem Framing", "AI Prototyping", "User Experience"].map((keyword) => <li className="tag" key={keyword}>{keyword}</li>)}</ul>
      </div>
    </div>
  </section>;
}
