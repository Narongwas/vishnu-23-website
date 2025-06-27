export enum UserRole {
  CAMPER = "camper",
  STAFF = "staff",
  ADMIN = "admin",
}

export const ROLE_HIERARCHY = {
  [UserRole.CAMPER]: 10,
  [UserRole.STAFF]: 20,
  [UserRole.ADMIN]: 100,
} as const;

export function hasMinimumRole(
  userRole: UserRole | undefined,
  requiredRole: UserRole
): boolean {
  if (!userRole) return false;
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function isAdmin(role: UserRole | undefined): boolean {
  return role === UserRole.ADMIN;
}
