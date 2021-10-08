export interface PatientBasicResult {
  score: number;
  text: string;
}

export interface PatientHADResult {
  ansiedade: PatientBasicResult;
  depressao: PatientBasicResult;
}

export interface PatientForm {
  answers: number[];
  created_at: string;
  deleted_at: string;
  id: number;
  patient_id: number;
  results: PatientBasicResult | PatientHADResult;
  status: string;
  type: string;
  updated_at: string;
}
