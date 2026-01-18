import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import patientService from "../services/patients";
import { Diagnosis, Entry, Patient } from "../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const assertNever = (entry: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(entry)}`);
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p>{entry.date}</p>
          <MedicalServicesIcon />
          <p>{entry.description}</p>
          <div>
            <p>diagnosed by: {entry.specialist}</p>
          </div>
        </div>);
    case "OccupationalHealthcare":
      return (
        <div>
          <p>{entry.date}</p>
          <MedicalServicesIcon />
          <p>{entry.description}</p>
          <div>
            <p>diagnosed by: {entry.specialist}</p>
          </div>
        </div>);
    case "HealthCheck":
      return (
        <div>
          <p>{entry.date}</p>
          <MedicalServicesIcon />
          <p>{entry.description}</p>
          <div>
            <p>diagnosed by: {entry.specialist}</p>
          </div>
        </div>);
    default:
      return assertNever(entry);
  }
};

const PatientDetailsPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then(data => setPatient(data));
    }
  }, [id]);

  if (!patient) {
    return <p>loading ...</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>{patient.name}</h2>
        {patient.gender === 'female' ? <FemaleIcon /> : patient.gender === 'male' ? <MaleIcon /> : <TransgenderIcon />}
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <h2>Entries</h2>
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry}/>
      ))}
      
    </div>
  );
};

export default PatientDetailsPage;
