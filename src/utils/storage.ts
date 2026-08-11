/**
 * Pure (de)serialization helpers used by the storage service.
 * App code should use services/storage — never localStorage directly.
 */
export function safeJsonParse<T>(raw: string | null): T | null {
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function safeJsonStringify(value: unknown): string | null {
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}
