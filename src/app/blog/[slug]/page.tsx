import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { blogPosts, media } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Health note — medviCare" };
  return { title: `${post.title} — medviCare`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        image={media.pageHeroes.blog}
        cta={{ label: "All notes", href: "/blog" }}
      />
      <section className="site-section">
        <article className="site-prose space-y-5 text-[16px] leading-relaxed text-ppc-primary/88">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <Link
            href="/blog"
            className="inline-flex pt-4 text-[14px] font-medium text-ppc-accent"
          >
            ← Back to health notes
          </Link>
        </article>
      </section>
    </>
  );
}
