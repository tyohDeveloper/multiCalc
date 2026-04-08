export function cascadeResolve(
  base: Record<string, string>,
  variant?: Record<string, string>,
): Record<string, string> {
  if (!variant) return { ...base };
  return { ...base, ...variant };
}
