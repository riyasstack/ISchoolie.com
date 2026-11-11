/** Shared local register behavior. Data adapters must supply stable keys for live records. */
export type RegisterRow = { key: string; cells: string[] };
export type RegisterQuery = {
  query: string;
  status: string;
  sortColumn: number;
  descending: boolean;
  page: number;
  pageSize?: number;
};
export function registerRows(rows: string[][]): RegisterRow[] {
  return rows.map((cells, index) => ({
    key: "row-" + index,
    cells: [...cells],
  }));
}
export function registerStatusColumn(columns: string[]): number {
  return columns.findIndex((c) =>
    /\b(status|state|decision|readiness|visibility|access)\b/i.test(c),
  );
}
export function compareRegisterCells(left: string, right: string): number {
  const a = left.normalize("NFKC").toLocaleLowerCase("en"),
    b = right.normalize("NFKC").toLocaleLowerCase("en");
  if (
    /^[+-]?\d+(\.\d+)?$/.test(a) &&
    /^[+-]?\d+(\.\d+)?$/.test(b) &&
    Number.isFinite(Number(a)) &&
    Number.isFinite(Number(b))
  )
    return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
  const x = a.match(/\d+|\D+/g) ?? [],
    y = b.match(/\d+|\D+/g) ?? [];
  for (let i = 0; i < Math.min(x.length, y.length); i++) {
    let p = x[i],
      q = y[i];
    if (/^\d+$/.test(p) && /^\d+$/.test(q)) {
      p = p.replace(/^0+(?=\d)/, "");
      q = q.replace(/^0+(?=\d)/, "");
      if (p.length !== q.length) return p.length - q.length;
    }
    if (p !== q) return p < q ? -1 : 1;
  }
  return x.length - y.length;
}
export function registerView(
  columns: string[],
  entries: RegisterRow[],
  options: RegisterQuery,
) {
  const statusColumn = registerStatusColumn(columns),
    statuses =
      statusColumn < 0
        ? []
        : [
            ...new Set(
              entries.map((r) => r.cells[statusColumn]).filter(Boolean),
            ),
          ];
  const query = options.query.normalize("NFKC").trim().toLocaleLowerCase("en");
  const sortColumn = Math.max(
    0,
    Math.min(columns.length - 1, options.sortColumn),
  );
  const order = new Map(entries.map((entry, index) => [entry.key, index]));
  const matches = entries
    .filter(
      (r) =>
        r.cells
          .join(" ")
          .normalize("NFKC")
          .toLocaleLowerCase("en")
          .includes(query) &&
        (options.status === "All" ||
          (statusColumn >= 0 && r.cells[statusColumn] === options.status)),
    )
    .sort((a, b) => {
      const compared = compareRegisterCells(
        a.cells[sortColumn] ?? "",
        b.cells[sortColumn] ?? "",
      );
      return (
        (options.descending ? -1 : 1) * compared ||
        (order.get(a.key) ?? 0) - (order.get(b.key) ?? 0)
      );
    });
  const pageSize = Math.max(1, Math.min(50, Math.floor(options.pageSize ?? 6))),
    pages = Math.max(1, Math.ceil(matches.length / pageSize)),
    page = Math.max(0, Math.min(pages - 1, Math.floor(options.page) || 0));
  return {
    statusColumn,
    statuses,
    matches,
    page,
    pages,
    pageSize,
    visible: matches.slice(page * pageSize, (page + 1) * pageSize),
  };
}
export function selectedRegisterRows(
  entries: RegisterRow[],
  keys: string[],
): RegisterRow[] {
  const wanted = new Set(keys);
  return entries.filter((row) => wanted.has(row.key));
}
export function csvCell(value: string): string {
  const clean = value.replaceAll("\u0000", "");
  const safe = /^[\s\u0001-\u001f]*[=+@-]/u.test(clean) ? "'" + clean : clean;
  return '"' + safe.replaceAll('"', '""') + '"';
}
export function exampleRegisterCsv(
  columns: string[],
  rows: RegisterRow[],
): string {
  return (
    "\uFEFF" +
    [
      ["Data classification", ...columns],
      ...rows.map((r) => ["EXAMPLE ONLY", ...r.cells]),
    ]
      .map((row) => row.map(csvCell).join(","))
      .join("\r\n")
  );
}
