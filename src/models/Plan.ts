export interface Plan {
  id: number;
  slug: string;
  currency: string;
  duration_in_days: number;
  default_forms: Array<number>;
  created_at: string;
  updated_at: string;
}