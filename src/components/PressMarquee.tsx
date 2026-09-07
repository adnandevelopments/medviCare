import Image from "next/image";

const outlets = [
  { name: "The Globe and Mail", src: "/images/press/press-globe-and-mail.png" },
  { name: "The Canadian Business Journal", src: "/images/press/press-canadian-business.png" },
  { name: "Voyage New York", src: "/images/press/press-voyage-ny.png" },
  { name: "Healthcare Technology", src: "/images/press/press-healthcare-tech.png" },
  { name: "Bloomberg", src: "/images/press/press-bloomberg.png" },
  { name: "Global News", src: "/images/press/press-global-news.png" },
  { name: "Yahoo", src: "/images/press/press-yahoo.png" },
];

export default function PressMarquee() {
  const items = [...outlets, ...outlets];

  return (
    <section
      aria-label="Press logos"
      className="overflow-x-auto no-scrollbar bg-background py-6 md:overflow-x-clip md:py-8"
    >
      <div
        className="animate-marquee flex min-w-max items-center gap-5 px-5 md:gap-6"
        style={{ animationDuration: "22s" }}
      >
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="relative h-11 w-[150px] shrink-0 md:h-12 md:w-[175px]"
          >
            <Image
              src={item.src}
              alt={item.name}
              fill
              className="object-contain object-center"
              sizes="250px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
