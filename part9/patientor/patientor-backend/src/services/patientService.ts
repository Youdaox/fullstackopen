import patients from '../../data/patients';
import { PatientExcludeSsn, Patient, newPatient } from '../types';
import { v1 as uuid } from 'uuid';
const id = uuid();

const getPatients = (): PatientExcludeSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};
const addPatient = (patient: newPatient): Patient => {
  const newPatient = {
    id: id,
    ...patient
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  addPatient
};