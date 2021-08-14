import { RolesEnum } from '../interfaces';

export function isValidRole(value: string): value is keyof typeof RolesEnum {
  return value in RolesEnum;
}
