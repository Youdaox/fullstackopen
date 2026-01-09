export type Gender = 'male' | 'female' | 'other';


export type Diagnosis = {
    code: string,
    name: string,
    latin?: string
  };

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
};

export type PatientExcludeSsn = Omit<Patient, 'ssn'>;