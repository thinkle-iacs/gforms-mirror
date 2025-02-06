export function encodeRow(row) {
  return row.replace("|", "\\|");
}

export function hasRowIdentifier(s) {
  return s.includes("|");
}

export function getRowIdentifier(id, row) {
  return `${id}|${encodeRow(row)}`;
}

export function decodeRowAndId(s): [string, string] {
  s.replace("|", "\u0001");
  const [id, row] = s.split("|");
  return [id, row.replace("\u0001", "|")];
}
