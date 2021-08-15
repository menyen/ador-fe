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

export interface TableColumn<K extends string = string> {
  id: K;
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

export type TableRow<K extends string = string, T = any> = Record<K, T>;

export interface TableProps<K extends string = string, L extends K = K> {
  columns: TableColumn<L>[];
  rows: TableRow<K>[];
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

export enum AdminPanelType {
  ClinicsTable,
  ClinicForm,
  Settings,
}

export enum PhysicianPanelType {
  PacientsTable,
  ReceptionistsTable,
  ReportsTable,
}

export const RolesEnum = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  PHYSICIAN: 'physician',
} as const;

export interface ClinicPayload {
  name: string;
  tax_id: string;
  address_zipcode: string;
  address_street: string;
  address_city: string;
  address_state: string;
  phone: string;
  user: {
    name: string;
    email: string;
    password: string;
  };
}
