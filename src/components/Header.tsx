"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import { useCart } from "@/components/CartProvider";
import { meds, treatments } from "@/lib/content";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Treatments", href: "/treatments" },
  { label: "Medications", href: "/medications" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

const supportLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Medications", href: "/medications" },
  { label: "Weight loss", href: "/body-optimization" },
  { label: "Hair loss", href: "/hairloss" },
  { label: "Skincare", href: "/skincare" },
  { label: "Longevity", href: "/longevity" },
  { label: "Sexual health", href: "/sexual-health" },
  { label: "Mental health", href: "/mental-health" },
  { label: "How care works", href: "/how-it-works" },
  { label: "Health notes", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
];

const featured = treatments.slice(0, 3);

type MenuTab = "paths" | "meds" | "support";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tab, setTab] = useState<MenuTab>("paths");
  const { count, setOpen: setCartOpen } = useCart();

  const overHero =
    (pathname === "/" || pathname === "/about" || pathname === "/contact") &&
    !scrolled &&
    !open;

  const closeMenu = () => {
    setVisible(false);
    window.setTimeout(() => {
      setOpen(false);
      setTab("paths");
    }, 280);
  };

  const openMenu = () => {
    setOpen(true);
    requestAnimationFrame(() => setVisible(true));
  };

  const toggleMenu = () => {
    if (open) closeMenu();
    else openMenu();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setVisible(false);
    setOpen(false);
    setTab("paths");
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const iconClass = overHero
    ? "text-white hover:text-ppc-accent-soft"
    : "text-ppc-primary hover:text-ppc-accent";

  return (
    <header className="fixed inset-x-0 top-0 z-[9999]">
      <div
        className={`transition-colors duration-300 ${
          overHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-ppc-border bg-white/95 shadow-[0_8px_24px_-18px_rgba(18,26,56,0.35)] backdrop-blur-md"
        }`}
      >
        <nav className="site-inner relative flex h-[72px] items-center justify-between">
          <BrandLogo onClick={closeMenu} light={overHero} />

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex lg:gap-8">
            {navLinks.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative pb-1 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    overHero
                      ? "text-white hover:text-white"
                      : "text-ppc-primary hover:text-ppc-accent"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-ppc-accent-soft transition-opacity ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className={`relative inline-flex h-11 w-11 items-center justify-center transition-colors ${iconClass}`}
              aria-label={count > 0 ? `Open cart, ${count} items` : "Open cart"}
              onClick={() => {
                if (open) {
                  setVisible(false);
                  setOpen(false);
                  setTab("paths");
                }
                setCartOpen(true);
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M2.5 3.5h1.7c.4 0 .75.26.86.64l.32 1.16M7.2 14.5h10.4c.9 0 1.7-.5 2.1-1.3L22 7.2H6.05M7.2 14.5 5.4 5.3M7.2 14.5l-1.55 1.7c-.32.35-.07.9.4.9H19.2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="8.2" cy="19.4" r="1.55" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.3" cy="19.4" r="1.55" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              {count > 0 ? (
                <span className="absolute top-1 right-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ppc-accent px-1 text-[10px] font-semibold text-white">
                  {count > 9 ? "9+" : count}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center transition-colors ${iconClass}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={toggleMenu}
            >
              {open ? (
                <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M2 4h12M2 8h12M2 12h12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {open ? (
        <>
          <div
            className={`fixed inset-0 z-40 bg-ppc-dark/45 backdrop-blur-[2px] transition-opacity duration-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
            aria-hidden
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-[520px] flex-col border-l border-ppc-border bg-background shadow-[-20px_0_60px_rgba(15,23,42,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-ppc-border px-5 py-4 md:px-7">
              <div>
                <p className="font-display text-[28px] font-semibold tracking-tight text-ppc-primary md:text-[32px]">
                  Explore
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-ppc-accent">
                  Care paths, meds & support
                </p>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ppc-border text-ppc-primary hover:bg-ppc-mint"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="border-b border-ppc-border px-5 py-5 md:px-7">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ppc-primary/70">
                  Featured paths
                </p>
                <ul className="space-y-2">
                  {featured.map((item) => (
                    <li key={`${item.title}-${item.accent}`}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="group flex items-center gap-3 rounded-xl border-2 border-ppc-accent/30 bg-ppc-surface p-2.5 transition-all hover:border-ppc-accent hover:bg-ppc-mint"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-ppc-mint md:h-16 md:w-16">
                          <Image
                            src={item.image}
                            alt={`${item.title} ${item.accent}`}
                            fill
                            className="object-cover object-top"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-[15px] text-ppc-primary md:text-[17px]">
                            {item.title}{" "}
                            <span className="text-ppc-accent">{item.accent}</span>
                          </p>
                          <p className="mt-0.5 text-[12px] text-ppc-primary/75 md:text-[13px]">
                            Clinician-guided · discreet delivery
                          </p>
                        </div>
                        <span className="pr-1 text-ppc-accent opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-5 pt-4 md:px-7">
                <div className="inline-flex w-full rounded-lg bg-ppc-mint p-1">
                  {(
                    [
                      { id: "paths", label: "Care paths" },
                      { id: "meds", label: "Medications" },
                      { id: "support", label: "Support" },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTab(item.id)}
                      className={`flex-1 min-h-11 rounded-full px-2 py-2.5 text-[12px] font-medium transition-all md:text-[13px] ${
                        tab === item.id
                          ? "bg-ppc-accent text-white shadow-sm"
                          : "text-ppc-primary/80 hover:text-ppc-primary"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-3 py-4 md:px-5">
                {tab === "paths" ? (
                  <ul>
                    {treatments.map((item) => (
                      <li key={`${item.title}-${item.accent}`}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="flex items-center justify-between rounded-lg px-3 py-3.5 transition-colors hover:bg-ppc-mint md:px-4"
                        >
                          <span className="text-[16px] font-medium md:text-[18px]">
                            <span className="text-ppc-primary">{item.title}</span>{" "}
                            <span className="text-ppc-accent">{item.accent}</span>
                          </span>
                          <span className="text-ppc-accent">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {tab === "meds" ? (
                  <ul>
                    {meds.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-ppc-mint md:px-4"
                        >
                          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-ppc-border/50">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                              sizes="44px"
                            />
                          </span>
                          <span className="min-w-0 flex-1 text-[16px] font-medium text-ppc-primary md:text-[17px]">
                            {item.name}
                          </span>
                          <span className="text-ppc-accent">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {tab === "support" ? (
                  <ul>
                    {supportLinks.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="flex items-center justify-between rounded-lg px-3 py-3.5 transition-colors hover:bg-ppc-mint md:px-4"
                        >
                          <span className="text-[16px] font-medium text-ppc-primary md:text-[18px]">
                            {item.label}
                          </span>
                          <span className="text-ppc-accent">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </header>
  );
}
