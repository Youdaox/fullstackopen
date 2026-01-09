import patients from '../../data/patients';
import { PatientExcludeSsn } from '../types';

const getPatients = (): PatientExcludeSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

export default {
  getPatients
};