import { patientSchema } from './utils';
import { z } from 'zod';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
};


export type Diagnosis = {
    code: string,
    name: string,
    latin?: string
  };

export interface Patient extends newPatient {
  id: string,
};

export type newPatient = z.infer<typeof patientSchema>;

export type PatientExcludeSsn = Omit<Patient, 'ssn'>;