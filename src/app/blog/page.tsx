import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { articles } from "@/lib/blog-data";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Consigli di Studio - Emergenza Studio Mogliano Veneto",
  description:
    "Articoli, guide e consigli per studiare meglio, prepararsi agli esami e scegliere il giusto supporto scolastico. Dal team di Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

const breadcrumbs = [{ label: "Blog", href: "/blog" }];

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Blog – Consigli di Studio e Risorse per Studenti
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-12">
            Benvenuto nel blog di Emergenza Studio: uno spazio dove condividiamo consigli pratici, strategie di studio e risorse utili per studenti delle medie, superiori e università.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-4xl">📚</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(article.date).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <h2
                    className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
