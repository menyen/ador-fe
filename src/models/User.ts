export interface User {
  id: number;
  name: string;
  tax_id: string;
  email: string;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
  password: string;
  address_zipcode: string;
  address_street: string;
  address_city: string;
  address_state: string;
  crm: string;
  phone: string;
  roles: string[];
  deleted_at: Date;
}
