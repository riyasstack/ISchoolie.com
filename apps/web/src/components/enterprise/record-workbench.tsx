"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  ArrowDownUp,
  Download,
  ChevronRight,
} from "lucide-react";
import { Button, Badge, Empty, Modal } from "../ui";
import {
  registerRows,
  registerView,
  selectedRegisterRows,
  exampleRegisterCsv,
} from "../../../../../packages/contracts/register-state";
import type { ScreenSpec } from "../../../../../packages/contracts/frontend";
export function RecordWorkbench({ spec }: { spec: ScreenSpec }) {
  const detailTrigger = useRef<HTMLButtonElement | null>(null);
  const [query, setQuery] = useState(""),
    [filter, setFilter] = useState("All"),
    [reverse, setReverse] = useState(false),
    [page, setPage] = useState(0),
    [selected, setSelected] = useState<string[]>([]),
    [detail, setDetail] = useState<string[] | null>(null);
  const [sortColumn, setSortColumn] = useState(0),
    [exportScope, setExportScope] = useState("matching");
  const columns = spec.columns,
    entries = registerRows(spec.rows);
  const view = registerView(columns, entries, {
      query,
      status: filter,
      sortColumn,
      descending: reverse,
      page,
    }),
    matches = view.matches,
    visible = view.visible;
  const selectedEntries = selectedRegisterRows(entries, selected);
  function exportExample() {
    const rows = exportScope === "selected" ? selectedEntries : matches;
    if (!rows.length) return;
    const url = URL.createObjectURL(
      new Blob([exampleRegisterCsv(columns, rows)], {
        type: "text/csv;charset=utf-8",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "ischoolie-" + spec.id + "-EXAMPLE-" + exportScope + ".csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="panel record-workbench">
      <div className="row between">
        <div>
          <h2>
            {spec.kind === "directory"
              ? "Discover by expertise"
              : spec.kind === "admissions"
                ? "Application review queue"
                : spec.kind === "audit"
                  ? "Activity and evidence"
                  : spec.kind === "report"
                    ? "Scope and measures"
                    : "Your working register"}
          </h2>
          <p className="metadata">
            {matches.length} fictional entries ·{" "}
            {spec.family === "ADM"
              ? "Synthetic training context"
              : "Example context"}
          </p>
        </div>
        <label>
          Export scope
          <select
            value={exportScope}
            onChange={(e) => setExportScope(e.target.value)}
          >
            <option value="matching">Matching rows ({matches.length})</option>
            <option value="selected">
              Selected rows across filters ({selectedEntries.length})
            </option>
          </select>
        </label>
        <Button
          className="secondary"
          disabled={
            !(exportScope === "selected"
              ? selectedEntries.length
              : matches.length)
          }
          onClick={exportExample}
        >
          <Download size={16} />
          Example CSV
        </Button>
      </div>
      <div className="filter-row">
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label={`Search ${spec.name}`}
            placeholder="Search this register"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
          />
        </label>
        {view.statusColumn >= 0 && (
          <label>
            Status filter
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(0);
              }}
            >
              {["All", ...view.statuses].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
        )}
        <label>
          Sort field
          <select
            value={sortColumn}
            onChange={(e) => {
              setSortColumn(Number(e.target.value));
              setPage(0);
            }}
          >
            {columns.map((c, i) => (
              <option key={c} value={i}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <Button
          className="secondary"
          aria-pressed={reverse}
          onClick={() => setReverse(!reverse)}
        >
          <ArrowDownUp size={16} />
          {reverse ? "Descending" : "Ascending"}
        </Button>
      </div>
      {selected.length > 0 && (
        <div className="selection-bar">
          <strong>
            {selectedEntries.length} selected locally;{" "}
            {
              selectedEntries.filter((r) =>
                matches.some((m) => m.key === r.key),
              ).length
            }{" "}
            match current filters
          </strong>
          <Button className="secondary small" onClick={() => setSelected([])}>
            Clear selection
          </Button>
          <span>Official bulk actions unavailable</span>
        </div>
      )}
      <div className="responsive-register">
        <table>
          <caption className="sr-only">
            {spec.name}, example records only
          </caption>
          <thead>
            <tr>
              <th>Select</th>
              {columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((entry) => {
              const row = entry.cells;
              return (
                <tr key={entry.key}>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select ${row[0]}`}
                      checked={selected.includes(entry.key)}
                      onChange={() =>
                        setSelected(
                          selected.includes(entry.key)
                            ? selected.filter((x) => x !== entry.key)
                            : [...selected, entry.key],
                        )
                      }
                    />
                  </td>
                  {row.map((cell, i) => (
                    <td key={columns[i]} data-label={columns[i]}>
                      {i === view.statusColumn ? (
                        <Badge
                          tone={
                            /unavailable|unverified|unpublished|not|pending|awaiting/i.test(
                              cell,
                            )
                              ? "amber"
                              : "neutral"
                          }
                        >
                          {cell}
                        </Badge>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                  <td>
                    <Button
                      className="icon-button"
                      aria-label={`Inspect ${row[0]}`}
                      onClick={(event) => {
                        detailTrigger.current = event.currentTarget;
                        setDetail(row);
                      }}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!matches.length && (
        <Empty title="No entries match">
          Adjust the query or reset the status filter.
        </Empty>
      )}
      <div className="table-footer">
        <span>{matches.length} matching entries · Example data</span>
        <div className="row">
          <Button
            className="secondary small"
            disabled={view.page === 0}
            onClick={() => setPage(view.page - 1)}
          >
            Previous
          </Button>
          <span>
            Page {view.page + 1} of {view.pages}
          </span>
          <Button
            className="secondary small"
            disabled={view.page + 1 >= view.pages}
            onClick={() => setPage(view.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      <Modal
        open={!!detail}
        returnFocusTo={() => detailTrigger.current}
        onOpenChange={(v) => {
          if (!v) setDetail(null);
        }}
        title={detail?.[0] ?? "Example record"}
        description="Fictional detail; no private evidence or live record is loaded."
      >
        <dl className="review-values">
          {columns.map((c, i) => (
            <div key={c}>
              <dt>{c}</dt>
              <dd>{detail?.[i]}</dd>
            </div>
          ))}
        </dl>
        <div className="related-actions">
          {spec.links.map((id) => (
            <Link key={id} href={`/preview/${id}`}>
              Continue to {id}
              <ArrowUpRight size={15} />
            </Link>
          ))}
        </div>
      </Modal>
    </section>
  );
}
