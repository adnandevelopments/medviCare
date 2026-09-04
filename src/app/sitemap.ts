import type { MetadataRoute } from "next";
import { blogPosts, products, treatments } from "@/lib/content";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medvicare.care";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/contact",
    "/treatments",
    "/medications",
    "/hairloss",
    "/skincare",
    "/longevity",
    "/sexual-health",
    "/mental-health",
    "/zonnic",
    "/body-optimization",
    "/how-it-works",
    "/blog",
    "/lifestyle",
    "/faqs",
    "/terms",
    "/privacy",
    "/acne-cream",
    "/anti-aging-cream",
    "/hyperpigmentation-cream",
  ];

  const treatmentUrls = treatments.map((t) => t.href);
  const productUrls = products.map((p) => p.href);
  const blogUrls = blogPosts.map((p) => `/blog/${p.slug}`);

  const paths = [...new Set([...staticPaths, ...treatmentUrls, ...productUrls, ...blogUrls])];

  return paths.map((path) => ({
    url: `${site}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
