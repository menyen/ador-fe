export interface Patient {
  id: number;
  name: string;
  tax_id: string;
  email: string;
  phone: string;
  birthdate?: string;
  gender: string;
  physician_id: number;
}
