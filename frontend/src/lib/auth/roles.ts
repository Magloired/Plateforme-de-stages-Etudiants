export const roles = [
  "ADMIN",
  "TEACHER",
  "STUDENT",
  "GUEST",
] as const;

export type Role = (typeof roles)[number];