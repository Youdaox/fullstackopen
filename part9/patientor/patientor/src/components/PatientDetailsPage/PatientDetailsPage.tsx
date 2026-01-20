import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import patientService from "../../services/patients";
import { Diagnosis, Entry, EntryFormValues, Patient } from "../../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Alert, Button } from '@mui/material';
import AddEntryForm from './AddEntryForm';
import axios from 'axios';


const assertNever = (entry: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(entry)}`);
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div style={ { border: '1px solid black', padding: '10px', marginBottom: '10px' } }>
          <div style={{ display: 'flex', alignItems: 'center' }}> 
            <p>{entry.date}</p>
            <MedicalServicesIcon />
          </div>
          <p>{entry.description}</p>
          <div>
            <p>diagnosed by: {entry.specialist}</p>
          </div>
        </div>);
    case "OccupationalHealthcare":
      return (
        <div style={ { border: '1px solid black', padding: '10px', marginBottom: '10px' } }>
          <div style={{ display: 'flex', alignItems: 'center' }}> 
            <p>{entry.date}</p>
            <WorkIcon />
            <p>{entry.employerName}</p>
          </div>
          <p>{entry.description}</p> 
          <div>
            <p>diagnosed by: {entry.specialist}</p>
          </div>
        </div>);
    case "HealthCheck":
      return (
        <div style={ { border: '1px solid black', padding: '10px', marginBottom: '10px' } }>
          <div style={{ display: 'flex', alignItems: 'center' }}> 
            <p>{entry.date}</p>
            <HealthAndSafetyIcon />
          </div>
          <p>{entry.description}</p>
          {entry.healthCheckRating === 0 ? <FavoriteIcon color='error' /> :
           entry.healthCheckRating === 1 ? <FavoriteIcon color='primary' /> :
           entry.healthCheckRating === 2 ? <FavoriteIcon color='warning' /> :
           <FavoriteIcon color='success' /> }
          <div>
            <p>diagnosed by: {entry.specialist}</p>
          </div>
        </div>);
    default:
      return assertNever(entry);
  }
};

const PatientDetailsPage = ({diagnoses} : {diagnoses: Diagnosis[]}) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [addEntryForm, setAddEntryForm] = useState<boolean>(false);
  const [entryFormType, setEntryFormType] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then(data => setPatient(data));
    }
  }, [id]);

  if (!patient) {
    return <p>loading ...</p>;
  }

  const addEntry = async (object: EntryFormValues) => {
    try {
      await patientService.createEntry(id!, object).then(() => {
        patientService.getById(id!).then(data => setPatient(data));
        setAddEntryForm(false);
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
      setError(error.response?.data.error[0]?.message);
      setTimeout(() => setError(null), 5000);
      }
    }
  };
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}

      {addEntryForm && <AddEntryForm onSubmit={addEntry} onCancel={() => setAddEntryForm(false)} type={entryFormType} diagnoses={diagnoses}/>}
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
      {!addEntryForm && <>
      <Button variant="contained" color="primary" onClick={() => {setAddEntryForm(true); setEntryFormType("HealthCheck")}}>
        Add New HealthCheck Entry
      </Button>
      <Button variant="contained" color="primary" onClick={() => {setAddEntryForm(true); setEntryFormType("Hospital")}}>
        Add New Hospital Entry
      </Button>
      <Button variant="contained" color="primary" onClick={() => {setAddEntryForm(true); setEntryFormType("OccupationalHealthcare")}}>
        Add New Occupational Healthcare Entry
      </Button>
      </>}
    </div>
  );
};

export default PatientDetailsPage;
