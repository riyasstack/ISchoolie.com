"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { Badge, Empty } from "../ui";
import {
  screenSpecs,
  type ScreenSpec,
} from "../../../../../packages/contracts/frontend";
export function SearchWorkbench({ spec }: { spec: ScreenSpec }) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All");
  const records =
    spec.kind === "help"
      ? spec.sections.map(([title, description], i) => ({
          id: `article-${i}`,
          title,
          description,
          category: "Help article",
          href: "/discover/contact",
        }))
      : screenSpecs
          .filter(
            (s) =>
              [
                "profile",
                "directory",
                "catalog",
                "communities",
                "course",
                "help",
              ].includes(s.kind) && !["ADM", "INS", "PAR"].includes(s.family),
          )
          .map((s) => ({
            id: s.id,
            title: s.name,
            description: s.summary,
            category:
              s.family === "PUB" ? "Public discovery" : "Learning & network",
            href: s.route,
          }));
  const matches = records.filter(
    (r) =>
      (category === "All" || r.category === category) &&
      `${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="panel">
      <div className="filter-row">
        <label className="search-field">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search example content"
            placeholder={
              spec.kind === "help"
                ? "Search a help topic"
                : "Search people, learning, and communities"
            }
          />
        </label>
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {["All", ...new Set(records.map((r) => r.category))].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="help-results">
        {matches.map((r) => (
          <article key={r.id}>
            <Badge>{r.category}</Badge>
            <h2>{r.title}</h2>
            <p>{r.description}</p>
            <Link className="text-link" href={r.href}>
              {spec.kind === "help" ? "Ask a follow-up" : "Explore the example"}
              <ArrowUpRight size={16} />
            </Link>
          </article>
        ))}
      </div>
      {!matches.length && (
        <Empty title="No matches yet">
          Try a broader subject or reset the category filter.
        </Empty>
      )}
    </section>
  );
}
