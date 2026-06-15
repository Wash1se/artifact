export type MediaModules = Record<string, string>;

export function sortMediaEntries(modules: MediaModules) {
  return Object.entries(modules).sort(([first], [second]) =>
    first.localeCompare(second, undefined, { numeric: true }),
  );
}

export function mediaNameFromPath(path: string) {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(/\.[^.]+$/, "").replaceAll(/[_-]/g, " ");
}
