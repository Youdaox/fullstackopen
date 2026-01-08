import express from "express";
import qs from "qs";
import { getBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.set('query parser',
  (str: string) => qs.parse(str, { /* custom options */ }));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error('invalid args');
    }
    const result = getBmi(Number(height), Number(weight));
    res.send({ 
      height,
      weight,
      result
    });
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.send({
      error: errorMessage
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if ( !target || !daily_exercises ) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if ( isNaN(Number(target)) || !Array.isArray(daily_exercises) || !daily_exercises.every(day => typeof day === 'number') ) {
    return res.status(400).send({ error: "malformatted parameters"});
  }
  const result = calculateExercises(daily_exercises, Number(target));
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});