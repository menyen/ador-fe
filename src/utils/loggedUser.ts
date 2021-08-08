import { DefaultPathByRole } from '../interfaces';

export function isValidRole(
  value: string
): value is keyof typeof DefaultPathByRole {
  return value in DefaultPathByRole;
}
