/**
 * Role → permission map. Roles always come from the API — never decode
 * tokens on the client to derive permissions.
 */
export const PERMISSIONS = {
  admin: ['users.read', 'users.write', 'settings.read', 'settings.write'],
  user: ['settings.read'],
} as const;

export type Role = keyof typeof PERMISSIONS;
export type Permission = (typeof PERMISSIONS)[Role][number];

export function hasPermission(role: string, permission: Permission): boolean {
  const permissions: readonly string[] = PERMISSIONS[role as Role] ?? [];
  return permissions.includes(permission);
}
