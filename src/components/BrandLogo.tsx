import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  onClick?: () => void;
  /** Use on dark backgrounds (footer / hero) */
  light?: boolean;
  className?: string;
};

export default function BrandLogo({
  href = "/",
  onClick,
  light = false,
  className = "",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="medviCare Homepage"
      className={`inline-flex items-center ${className}`}
    >
      <span className="font-display text-[22px] font-semibold tracking-tight md:text-[24px]">
        <span className={light ? "text-white" : "text-ppc-primary"}>medvi</span>
        <span className={light ? "text-ppc-accent-soft" : "text-ppc-accent"}>
          Care
        </span>
      </span>
    </Link>
  );
}
