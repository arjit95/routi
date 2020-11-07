export function mergePaths(p1: string, p2: string): string {
  p2 = p2.startsWith('/') ? p2.substring(1) : p2;
  if (p1.length === 1) {
    p1 = '';
  }

  return [p1, p2].join('/');
}
