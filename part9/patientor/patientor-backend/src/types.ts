import { patientSchema } from './utils';
import { z } from 'zod';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export type Diagnosis = {
    code: string,
    name: string,
    latin?: string
  };

export interface Patient extends newPatient {
  id: string,
  entries: Entry[],
};

export type newPatient = z.infer<typeof patientSchema>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;