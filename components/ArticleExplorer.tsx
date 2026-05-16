"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { categories } from "@/lib/categories";
import type { ArticleMeta } from "@/types/article";

export function ArticleExplorer({ articles }: { articles: ArticleMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = category === "todas" || article.categorySlug === category;
      const searchable = `${article.title} ${article.description} ${article.category}`.toLowerCase();
      return matchesCategory && searchable.includes(query.toLowerCase());
    });
  }, [articles, category, query]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_260px]">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Buscar artículos
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej. filamento, FEM, Creo..."
            className="h-11 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Categoría
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="todas">Todas</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      {filteredArticles.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
          No hay artículos que coincidan con la búsqueda.
        </p>
      ) : null}
    </section>
  );
}
