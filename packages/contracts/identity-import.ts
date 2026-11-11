/** Bounded input parser. Server-side credential validation remains authoritative. */
export function identityImportRows(input: string): unknown[] {
  if (input.length > 128000)
    throw new Error("Keep the credential import below 128,000 characters");
  const source = input.replace(/^\uFEFF/, "").trim();
  if (source.startsWith("[")) {
    const rows: unknown = JSON.parse(source);
    if (!Array.isArray(rows) || !rows.length || rows.length > 200)
      throw new Error("Import requires 1–200 rows");
    return rows;
  }
  const matrix: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  let closed = false;
  function pushRow() {
    row.push(cell);
    if (row.some((value) => value.trim())) matrix.push(row);
    row = [];
    cell = "";
    closed = false;
  }
  for (let index = 0; index < source.length; index++) {
    const character = source[index];
    if (closed && ![",", "\r", "\n", " ", "\t"].includes(character))
      throw new Error("Unexpected text after quoted CSV field");
    if (closed && [" ", "\t"].includes(character)) continue;
    if (character === '"') {
      if (quoted && source[index + 1] === '"') {
        cell += '"';
        index++;
      } else if (quoted) {
        quoted = false;
        closed = true;
      } else if (cell || closed)
        throw new Error("Quote must begin a complete CSV field");
      else quoted = true;
    } else if (character === "," && !quoted) {
      row.push(cell);
      cell = "";
      closed = false;
    } else if ((character === "\r" || character === "\n") && !quoted) {
      if (character === "\r" && source[index + 1] === "\n") index++;
      pushRow();
    } else cell += character;
  }
  if (quoted) throw new Error("Unclosed CSV field");
  if (cell || row.length) pushRow();
  const [headers = [], ...rows] = matrix;
  const columns: Record<string, string> = {
    kind: "kind",
    displayname: "displayName",
    contactemail: "contactEmail",
    identifier: "identifier",
    stafftype: "staffType",
    hiringyear: "hiringYear",
  };
  const normalized = headers.map((value) => value.trim().toLowerCase());
  if (
    new Set(normalized).size !== normalized.length ||
    normalized.some((value) => !Object.hasOwn(columns, value)) ||
    !["kind", "displayname", "contactemail"].every((value) =>
      normalized.includes(value),
    )
  )
    throw new Error(
      "Use unique kind, displayName, contactEmail, identifier, staffType and hiringYear headers; password columns are forbidden",
    );
  if (!rows.length || rows.length > 200)
    throw new Error("Import requires 1–200 rows");
  return rows.map((cells, index) => {
    if (cells.length !== headers.length)
      throw new Error(`CSV row ${index + 2} has a different column count`);
    const result: Record<string, string | number> = {};
    cells.forEach((value, column) => {
      const key = columns[normalized[column]];
      const text = value.trim();
      if (!text && ["identifier", "staffType", "hiringYear"].includes(key))
        return;
      if (key === "hiringYear") {
        if (!/^\d{4}$/.test(text))
          throw new Error(`Invalid hiring year in row ${index + 2}`);
        result[key] = Number(text);
      } else result[key] = text;
    });
    return result;
  });
}
