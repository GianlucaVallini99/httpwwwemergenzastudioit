import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, articleJsonLd } from "@/lib/structured-data";
import { articles, getArticleBySlug } from "@/lib/blog-data";
import { Calendar, ArrowLeft } from "lucide-react";

// Generate static paths for all articles
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for each article
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Articolo non trovato" };

  return {
    title: article.seoTitle,
    description: article.description,
    alternates: { canonical: `${SITE_URL}/blog/${article.slug}/` },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: article.title, href: `/blog/${article.slug}` },
  ];

  // Get related articles (exclude current)
  const related = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: article.title, href: `/blog/${article.slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd({
            title: article.title,
            description: article.description,
            url: `${SITE_URL}/blog/${article.slug}`,
            datePublished: article.date,
          })),
        }}
      />

      <Breadcrumb items={breadcrumbs} />

      <article className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna al blog
          </Link>

          {/* Header */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString("it-IT", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold text-primary mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-foreground">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article footer CTA */}
          <div className="mt-16 rounded-2xl bg-muted p-8 text-center">
            <p className="text-foreground font-medium mb-2">
              Hai bisogno di aiuto con lo studio?
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              Emergenza Studio è il centro ripetizioni di Mogliano Veneto, a 50
              metri dal Liceo Berto. Contattaci su WhatsApp per prenotare una
              lezione.
            </p>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section-spacing bg-card">
          <div className="container-custom">
            <h2
              className="text-2xl font-bold text-primary mb-8 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Articoli correlati
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
                >
                  <h3
                    className="text-base font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {a.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
