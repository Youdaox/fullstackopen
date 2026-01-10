import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatients();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const patient = toNewPatient(req.body);
    const newPatient = patientService.addPatient(patient);

    res.json(newPatient);
  } catch (error) {
    let errorMessage = 'unexpected error';
    if (error instanceof Error) {
      errorMessage = errorMessage + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

export default router;