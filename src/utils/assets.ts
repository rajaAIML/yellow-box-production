/** Returns a public asset URL that also works when the app is hosted on GitHub Pages. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
