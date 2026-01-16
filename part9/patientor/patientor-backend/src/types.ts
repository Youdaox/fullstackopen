import { patientSchema } from './utils';
import { z } from 'zod';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

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