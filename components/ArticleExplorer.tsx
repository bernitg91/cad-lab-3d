"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { categories } from "@/lib/categories";
import { matchesReadingGoal, normalizeSearch, readingGoals } from "@/lib/article-navigation";
import type { ArticleMeta } from "@/types/article";

export function ArticleExplorer({ articles }: { articles: ArticleMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");
  const [goal, setGoal] = useState("todos");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = category === "todas" || article.categorySlug === category;
      const searchable = normalizeSearch(`${article.title} ${article.description} ${article.category}`);
      return matchesCategory && matchesReadingGoal(article, goal) && searchable.includes(normalizeSearch(query));
    });
  }, [articles, category, query, goal]);
  const availableCategories = categories.filter((item) => articles.some((article) => article.categorySlug === item.slug));

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <fieldset className="mb-6"><legend className="mb-3 text-base font-bold text-slate-800">¿Para qué quieres leer?</legend><div className="flex flex-wrap gap-2">{[{ id: "todos", label: "Todos los objetivos" }, ...readingGoals].map(item => <button key={item.id} type="button" aria-pressed={goal === item.id} onClick={() => setGoal(item.id)} className={`rounded-md border px-4 py-3 text-sm font-semibold ${goal === item.id ? "border-blue-700 bg-blue-700 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-blue-700"}`}>{item.label}</button>)}</div></fieldset>
      <div className="grid gap-3 border-y border-slate-300 bg-white py-5 md:grid-cols-[1fr_260px]">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Buscar artículos
          <input
            value={query}
            type="search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej. Blender, resina, metal, vender..."
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
            {availableCategories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-600" aria-live="polite">
        {filteredArticles.length} {filteredArticles.length === 1 ? "artículo" : "artículos"}
      </p>
      <div className="mt-8 grid gap-x-8 md:grid-cols-2">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      {filteredArticles.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
          <p>No hay artículos que coincidan con estos filtros.</p>
          <button type="button" className="mt-4 rounded-md border border-blue-700 px-4 py-3 font-semibold text-blue-700" onClick={() => { setQuery(""); setCategory("todas"); setGoal("todos"); }}>Limpiar búsqueda y filtros</button>
        </div>
      ) : null}
    </section>
  );
}
