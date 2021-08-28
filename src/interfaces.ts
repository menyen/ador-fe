import { Clinic } from './models/Clinic';
import { Patient } from './models/Patient';
import { User } from './models/User';
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
  id:
    | 'name'
    | 'email'
    | 'tax_id'
    | 'phone'
    | 'birthdate'
    | 'gender'
    | 'physician_id';
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

export interface PatientTableData extends Patient {
  details?: JSX.Element;
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
    | 'status'
    | 'details';
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

export interface ClinicTableData extends Clinic {
  details?: JSX.Element;
}

export interface UserTableColumn {
  id:
    | 'id'
    | 'name'
    | 'tax_id'
    | 'email'
    | 'address_zipcode'
    | 'address_street'
    | 'address_city'
    | 'address_state'
    | 'crm'
    | 'phone'
    | 'role'
    | 'details';
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

export interface UserTableData extends User {
  details?: JSX.Element;
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

export enum ManagerPanelType {
  UsersTable,
  UserForm,
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

export interface UserPayload {
  name: string;
  tax_id: string;
  email: string;
  password: string;
  address_zipcode: string;
  address_street: string;
  address_city: string;
  address_state: string;
  crm: string;
  phone: string;
  role: string;
}

export interface PatientPayload {
  name: string;
  tax_id: string;
  email: string;
  phone: string;
  birthdate: Date;
  gender: string;
  physician_id: number;
}
