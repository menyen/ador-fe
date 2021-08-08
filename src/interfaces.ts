interface LoggedUser {
  // address_city?: string;
  // address_state?: string;
  // address_street?: string;
  // address_zipcode?: string;
  // created_at: Date;
  // deleted_at?: Date;
  email: string;
  // email_verified_at?: Date;
  id: number;
  name: string;
  roles: Array<string>;
  // tax_id?: string;
  // updated_at: Date;
}

export interface UserAuth {
  token: string;
  user: LoggedUser;
}

export interface LoginProps {
  setAuth: (setAuth?: UserAuth) => void;
}

export interface PanelCommonProps {
  nextPanel: () => void;
}

export interface PatientTableColumn {
  id: 'name' | 'email' | 'cpf' | 'lastQnaireDate';
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

export interface PatientTableData {
  name: string;
  email: string;
  cpf: number;
  lastQnaireDate: number;
}

export interface ClinicModel {
  id: number;
  name: string;
  owner_id: number;
  tax_id: string;
  address_zipcode: number;
  address_street: string;
  address_city: string;
  address_state: string;
  phone: string;
  status: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  owner: {
    id: number;
    name: string;
    email: string;
    email_verified_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    address_zipcode: string | null;
    address_street: string | null;
    address_city: string | null;
    address_state: string | null;
    tax_id: string | null;
    roles: Array<string>;
    deleted_at: Date | null;
  };
}

export interface ClinicTableColumn {
  id:
    | 'id'
    | 'name'
    | 'tax_id'
    | 'address_zipcode'
    | 'address_street'
    | 'address_city'
    | 'address_state'
    | 'phone'
    | 'owner_id'
    | 'status';
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

export interface ClinicTableData {
  id: number;
  name: string;
  taxId: string;
  addressZipcode: number;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  phone: string;
  ownerId: number;
  status: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export enum LoginPanelType {
  Initial,
  Login,
  ForgotPassword,
  CreatePassword,
}

export const DefaultPathByRole = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  PHYSICIAN: 'physician',
} as const;
