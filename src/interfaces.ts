import { Clinic } from './models/Clinic';
import { Patient } from './models/Patient';
import { PatientForm } from './models/PatientForm';
import { User } from './models/User';
import { LoggedPatient, UserAuth } from './models/UserAuth';
export interface TableColumn<K extends string = string> {
  id: K;
  label: string;
  minWidth?: number;
  hideForSmallScreen?: boolean;
  format?: (value: string) => string;
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

export interface PatientTableColumn extends TableColumn {
  id:
  | 'name'
  | 'email'
  | 'tax_id'
  | 'phone'
  | 'birthdate'
  | 'gender'
  | 'physician_id'
  | 'details';
}

export interface PatientTableData extends Patient {
  details?: JSX.Element;
}

export interface ClinicTableColumn extends TableColumn {
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
}

export interface ClinicTableData extends Clinic {
  details?: JSX.Element;
}

export interface UserTableColumn extends TableColumn {
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
}

export interface UserTableData extends User {
  details?: JSX.Element;
}

export interface SimpleReportTableColumn extends TableColumn {
  id: 'id' | 'date' | 'result' | 'patient' | 'type' | 'details';
}

export interface SimpleReportTableData {
  date: string;
  result: string;
  patient?: string;
  details?: JSX.Element;
}

export interface NoResultReportTableData {
  date: string;
  patient?: string;
  details?: JSX.Element;
}

export interface HADReportTableColumn extends TableColumn {
  id:
  | 'id'
  | 'date'
  | 'result_anxiety'
  | 'result_depression'
  | 'patient'
  | 'details';
}

export interface SPADIReportTableColumn extends TableColumn {
  id:
  | 'id'
  | 'date'
  | 'result_disability'
  | 'result_pain'
  | 'result_total'
  | 'patient'
  | 'details';
}

export interface AOFASReportTableColumn extends TableColumn {
  id:
  | 'id'
  | 'date'
  | 'result_pain'
  | 'result_function'
  | 'result_alignment'
  | 'result_total'
  | 'patient'
  | 'details';
}

export interface HADReportTableData {
  date: string;
  result_anxiety: string;
  result_depression: string;
  patient?: string;
  details?: JSX.Element;
}

export interface SPADIReportTableData {
  date: string;
  result_disability: string;
  result_pain: string;
  result_total: string;
  patient?: string;
  details?: JSX.Element;
}

export interface AOFASReportTableData {
  date: string;
  result_pain: number;
  result_function: number;
  result_alignment: number;
  result_total: string;
  patient?: string;
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
  AOFAS,
  All,
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
  AOFAS,
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
  { value: 'BPI', label: 'Breve Inventário de Dor' },
  { value: 'HAD', label: 'Ansiedade e Depressão' },
  { value: 'SF36', label: 'Qualidade de Vida' },
  { value: 'DN4', label: 'Dor Neuropática' },
  { value: 'EPC', label: 'Catastrofização' },
  { value: 'FIBROMIALGIA', label: 'Índice de Dor da Fibromialgia' },
  { value: 'OSWESTRY', label: 'Oswestry de Lombalgia' },
  { value: 'IAD', label: 'Inventário de Atitudes frente à Dor' },
  { value: 'SBST', label: 'Start Back Screening Tool - Brasil' },
  { value: 'PSEQ', label: 'Autoeficácia da dor' },
  {
    value: 'WOMAC',
    label: 'Índice WOMAC de Osteoartrose',
  },
  {
    value: 'SPADI',
    label: 'Índice de Dor e Incapacidade no Ombro (SPADI-Brasil)',
  },
  { value: 'AOFAS', label: 'Escala AOFAS para Tornozelo e Retropé' },
];

export interface RouterParams {
  clinic_slug?: string;
}

export interface ReportPageProps {
  data: PatientForm[];
  goToSummary: () => void;
  hideBreadcrumb: boolean;
}

export interface ReportsSearchPayload {
  patient_id: string;
  start_date: string;
  end_date: string;
  type: string;
  result?: string;
  had_depression?: string;
  had_anxiety?: string;
}

export interface InnerReportProps {
  selectedForm: PatientForm;
}
