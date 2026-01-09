import express from "express";

import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;

import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});