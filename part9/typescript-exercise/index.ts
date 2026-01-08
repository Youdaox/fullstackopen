import express from "express";
import qs from "qs";
import { getBmi } from './bmiCalculator';

const app = express();

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


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});