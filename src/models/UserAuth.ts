interface LoggedUser {
  address_city: string;
  address_state: string;
  address_street: string;
  address_zipcode: string;
  created_at: Date;
  deleted_at: Date;
  email: string;
  email_verified_at?: Date;
  id: number;
  name: string;
  roles: Array<string>;
  tax_id: string;
  updated_at: Date;
}

export interface LoggedPatient {
  birthdate: Date;
  created_at: Date;
  deleted_at: Date;
  email: string;
  gender: string;
  id: number;
  name: string;
  phone: string;
  physician_id: number;
  tax_id: string;
  updated_at: Date;
}

export interface UserAuth {
  token: string;
  user?: LoggedUser;
  patient?: LoggedPatient;
}
