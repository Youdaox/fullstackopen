import express, { NextFunction } from 'express';
import patientService from '../services/patientService';
import { Request, Response } from 'express';
import { patientSchema } from '../utils';
import { newPatient, Patient } from '../types';
import { z } from 'zod';

const router = express.Router();

const parseRequest = (req: Request, _res: Response, next: NextFunction) => {
  try {
    patientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};


router.get('/', (_req, res) => {
  const patients = patientService.getPatients();
  res.send(patients);
});

router.post('/', parseRequest, (req: Request<unknown, unknown, newPatient>, res: Response<Patient>) => {
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);
});

router.use(errorMiddleware);

export default router;