import Link from "next/link";

export default function NotFound() {
  return (
    <section className="site-section">
      <div className="site-inner max-w-xl">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
          404
        </p>
        <h1 className="font-display text-[36px] text-ppc-primary md:text-[48px]">
          This page isn’t here
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-ppc-primary/80">
          The link may be old or typed incorrectly. Head back home or browse
          care paths.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full bg-ppc-accent px-6 py-3 text-[14px] font-medium text-white hover:bg-ppc-dark"
          >
            Home
          </Link>
          <Link
            href="/treatments"
            className="inline-flex rounded-full border border-ppc-border px-6 py-3 text-[14px] font-medium text-ppc-primary hover:border-ppc-accent"
          >
            Browse treatments
          </Link>
        </div>
      </div>
    </section>
  );
}
