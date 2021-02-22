export function capitalizedString(text: string) {
  return text.trim().replace(/^\w/, (c) => c.toUpperCase());
}
