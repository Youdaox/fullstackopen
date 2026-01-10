import { newPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string'|| text instanceof String;
};
const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing comment');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDOB = (dob: unknown): string => {
  if (!isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing comment');
  }
  return dob;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
      throw new Error('Incorrect or missing comment');
    }
    return ssn;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing comment');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
      throw new Error('Incorrect or missing comment');
    }
    return occupation;
};


const toNewPatient = (object: unknown): newPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const patient: newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDOB(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return patient;
  };
  throw new Error('Incorrect data: some fields are missing');
};


export default toNewPatient;