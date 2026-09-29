import Link from "next/link";

export function Arrow({ back = false }: { back?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={back ? "rotate-180 shrink-0" : "shrink-0"}>
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function SiteHeader() {
  return (
    <>
      <a className="skip-link button-secondary" href="#main-content">본문으로 건너뛰기</a>
      <header className="site-header">
        <div className="page-container flex min-h-20 items-center justify-between gap-4">
          <Link href="/#top" className="brand-link" aria-label="Sangho — 홈">
            <span className="font-semibold tracking-[0.12em]">SANGHO LEE</span>
            <span aria-hidden="true" className="hidden text-text-secondary sm:inline">/</span>
            <span className="brand-subtitle">CJ ENM APPLICATION</span>
          </Link>
          <nav aria-label="주 메뉴" className="flex items-center gap-4 sm:gap-8">
            <Link className="nav-link" href="/#projects">Projects</Link>
            <Link className="nav-link" href="/#about">About</Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return <footer className="border-t border-border py-8">
    <div className="page-container flex flex-wrap items-center justify-between gap-4 text-sm text-text-secondary">
      <p>Designed and built by Sangho Lee.</p><span className="font-mono text-xs">© {new Date().getFullYear()}</span>
    </div>
  </footer>;
}
