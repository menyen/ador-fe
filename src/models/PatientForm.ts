interface BPIBodyPainItem {
  area: number;
  pain_level: number;
}

interface BPITreatment {
  name: string;
  started_at: string;
  frequency: string;
}

export interface FibromialgiaDiagnosis {
  criteria: string;
  ess_score: number;
  idg_score: number;
}

export interface PatientBasicResult {
  score: number;
  text: string;
}

export interface PatientIADResult {
  text: string[];
}

export interface PatientSBSTResult {
  psychosocial_points: number;
  result: string;
  total_points: number;
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

export interface PatientSF36Result {
  raw_scale: PatientBasicResult[];
}

export interface PatientFibromialgiaResult {
  body_pain: BPIBodyPainItem[];
  booleans: string[];
  diagnosis: FibromialgiaDiagnosis;
  ess: number[];
  idg: string[];
}

export interface PatientWOMACResult {
  function_index: number;
  pain_index: number;
  stiffness_index: number;
  total_index: number;
  total_percentage: string;
  total_ratio: number;
}

export interface PatientForm {
  answers: number[];
  created_at: string;
  deleted_at: string;
  id: number;
  patient_id: number;
  results:
    | PatientBasicResult
    | PatientHADResult
    | PatientBPIResult
    | PatientSF36Result
    | PatientFibromialgiaResult
    | PatientIADResult
    | PatientSBSTResult
    | PatientWOMACResult;
  status: string;
  type: string;
  updated_at: string;
}
