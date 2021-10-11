interface BPIBodyPainItem {
  area: number;
  pain_level: number;
}

interface BPITreatment {
  name: string;
  started_at: string;
  frequency: string;
}

export interface PatientBasicResult {
  score: number;
  text: string;
}

export interface PatientHADResult {
  ansiedade: PatientBasicResult;
  depressao: PatientBasicResult;
}

export interface PatientBPIResult {
  booleans: string[];
  body_pain: BPIBodyPainItem[];
  grades: number[];
  treatments: BPITreatment[];
  slider: string[];
  percentages: string[];
}

export interface PatientForm {
  answers: number[];
  created_at: string;
  deleted_at: string;
  id: number;
  patient_id: number;
  results: PatientBasicResult | PatientHADResult | PatientBPIResult;
  status: string;
  type: string;
  updated_at: string;
}
