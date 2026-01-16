import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import patientService from "../services/patients";
import { Patient } from "../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientDetailsPage = () => {
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
    </div>
  );
};

export default PatientDetailsPage;