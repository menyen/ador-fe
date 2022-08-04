export interface Clinic {
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
  subscription: {
    active_until: string | null;
    clinic_id: number;
    created_at: string | null;
    id: number;
    included_forms: Array<number>;
    paypal_subscription_id: string;
    plan: {
      created_at: Date | null;
      currency: string;
      default_forms: Array<number>;
      durantion_in_days: number;
      id: number;
      price: number;
      slug: string;
      total_users: number;
      updated_at: Date | null;
    }
  } | null
}
