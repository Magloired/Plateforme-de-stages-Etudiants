export const roles = [
  "SUPER_ADMIN",
  "ADMIN",
  "TEACHER",
  "STUDENT",
  "GUEST",
] as const;

export type Role = (typeof roles)[number];