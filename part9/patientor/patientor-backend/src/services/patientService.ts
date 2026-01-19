import patients from '../../data/patients';
import { NonSensitivePatient, Patient, newPatient, Entry, EntryWithoutId, Diagnosis } from '../types';
import { v1 as uuid } from 'uuid';
const id = uuid();

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name, 
    dateOfBirth, 
    gender, 
    occupation,
  }));
};
const addPatient = (patient: newPatient): Patient => {
  const newPatient = {
    id: id,
    entries: [],
    ...patient
  };

  patients.push(newPatient);

  return newPatient;
};

const getPatientInfo = (id: string): Patient | null => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    return null;
  }
  return patient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry | null => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    return null;
  }

  const newEntry = {
    id: uuid(),
    diagnosisCodes: parseDiagnosisCodes(entry),
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatientInfo,
  addEntry
};