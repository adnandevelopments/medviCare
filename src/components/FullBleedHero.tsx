import Image from "next/image";
import type { ReactNode } from "react";

/** Full-bleed photo hero with readable gradient overlays (theme-aware). */
export default function FullBleedHero({
  image,
  children,
  priority = true,
  className = "",
  underHeader = false,
  compact = false,
  imageAlt = "",
}: {
  image?: string;
  children: ReactNode;
  priority?: boolean;
  className?: string;
  /** Pull under the transparent header, like the homepage hero */
  underHeader?: boolean;
  /** Short banner for care-path / catalog pages */
  compact?: boolean;
  imageAlt?: string;
}) {
  const heightClass = compact
    ? underHeader
      ? "-mt-[72px] min-h-[240px] pb-8 pt-24 md:min-h-[280px] md:pb-10"
      : "min-h-[200px] py-10 md:min-h-[240px] md:py-12"
    : underHeader
      ? "-mt-[72px] min-h-[68vh] pb-16 pt-28 md:min-h-[74vh] md:pb-20"
      : "min-h-[58vh] py-20 md:min-h-[64vh] md:py-24";

  return (
    <section
      className={`relative flex items-center overflow-clip text-white ${heightClass} ${className}`}
    >
      <div className="absolute inset-0 bg-ppc-dark">
        {image ? (
          <>
            <Image
              src={image}
              alt={imageAlt || ""}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={priority}
            />
            {underHeader || compact ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/25" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10" />
              </>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ppc-dark via-ppc-primary to-ppc-accent/80" />
        )}
      </div>
      <div className="site-inner relative">{children}</div>
    </section>
  );
}
