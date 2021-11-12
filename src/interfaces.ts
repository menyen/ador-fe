import { Clinic } from './models/Clinic';
import { Patient } from './models/Patient';
import { PatientForm } from './models/PatientForm';
import { User } from './models/User';
import { LoggedPatient, UserAuth } from './models/UserAuth';
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
  shouldHideCheckboxes?: boolean;
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
    | 'physician_id'
    | 'details';
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

export interface SimpleReportTableColumn {
  id: 'id' | 'date' | 'result' | 'details';
  label: string;
  minWidth?: number;
}

export interface SimpleReportTableData {
  date: string;
  result: string;
  details?: JSX.Element;
}

export interface NoResultReportTableData {
  date: string;
  details?: JSX.Element;
}

export interface HADReportTableColumn {
  id: 'id' | 'date' | 'result_ansiety' | 'result_depression' | 'details';
  label: string;
  minWidth?: number;
}

export interface SPADIReportTableColumn {
  id:
    | 'id'
    | 'date'
    | 'result_disability'
    | 'result_pain'
    | 'result_total'
    | 'details';
  label: string;
  minWidth?: number;
}

export interface HADReportTableData {
  date: string;
  result_ansiety: string;
  result_depression: string;
  details?: JSX.Element;
}

export interface SPADIReportTableData {
  date: string;
  result_disability: string;
  result_pain: string;
  result_total: string;
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
  PatientsTable,
  PatientForm,
  ReceptionistsTable,
  ReportsTable,
}

export enum ReceptionistPanelType {
  PatientsTable,
  PatientForm,
  ReportsTable,
}

export enum ManagerPanelType {
  UsersTable,
  UserForm,
  PatientsTable,
  PatientForm,
  ReportsTable,
}

export enum PatientReportPanelType {
  Summary,
  EPC,
  DN4,
  OSWESTRY,
  HAD,
  BPI,
  SF36,
  FIBROMIALGIA,
  IAD,
  SBST,
  PSEQ,
  WOMAC,
  SPADI,
}

export type AllPanelTypes =
  | AdminPanelType
  | PhysicianPanelType
  | ManagerPanelType
  | ReceptionistPanelType;

export interface PatientCommonPanelProps {
  setCurrentPanel: (panel: PatientPanel) => void;
}

export interface QuestionaireListProps extends PatientCommonPanelProps {
  patientInfo: LoggedPatient;
}

export interface PatientFormProps extends PatientCommonPanelProps {
  patientAuth: UserAuth;
}

export interface BodyMapBPIProps {
  markBodyPartsForBPI?: (bodyMapNumber: number[]) => void;
  disabledBodyMapClick: boolean;
  preSelectedValues?: number[];
}

export interface BodyMapFibromialgiaProps {
  markBodyParts?: (bodyMapNumber: number[]) => void;
  disabledBodyMapClick: boolean;
  preSelectedValues?: boolean[];
}

export enum PatientPanel {
  INITIAL,
  EPC,
  DN4,
  OSWESTRY,
  HAD,
  SF36,
  BPI,
  FIBROMIALGIA,
  IAD,
  SBST,
  PSEQ,
  WOMAC,
  SPADI,
}

export const RolesEnum = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  PHYSICIAN: 'physician',
  RECEPTIONIST: 'receptionist',
  PATIENT: 'patient',
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
  email?: string;
  password?: string;
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
  email?: string;
  phone: string;
  birthdate: string;
  gender: string;
  physician_id: number;
}

export const QUESTIONAIRE_LIST = [
  { value: 'BPI', label: 'Breve Inventário de Dor (BPI)' },
  { value: 'HAD', label: 'HAD' },
  { value: 'SF36', label: 'Qualidade de vida - SF36' },
  { value: 'DN4', label: 'Dor Neuropática (DN4)' },
  { value: 'EPC', label: 'Escala de pensamento catastrófico' },
  { value: 'FIBROMIALGIA', label: 'Fibromialgia' },
  { value: 'OSWESTRY', label: 'Questionário de Oswestry' },
  { value: 'IAD', label: 'Inventário de Atitudes frente à Dor (IAD - Breve)' },
  { value: 'SBST', label: 'Start Back Screening Tool (SBST)' },
  { value: 'PSEQ', label: 'Autoeficácia da dor (PSEQ)' },
  {
    value: 'WOMAC',
    label: 'Qualidade de vida específico para osteoartrose WOMAC',
  },
  { value: 'SPADI', label: 'Índice de dor e incapacidade no ombro (SPADI)' },
];

export interface RouterParams {
  clinic_slug?: string;
}

export interface ReportPageProps {
  data: PatientForm[];
  goToSummary: () => void;
  hideBreadcrumb: boolean;
}
