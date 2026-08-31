export function trim(value: string): String {
  return value
    .replace(/^\s+/, "")
    .replace(/\s+/, "")
    .replace(/\s{2,}/g, " ");
}
