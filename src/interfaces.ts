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
