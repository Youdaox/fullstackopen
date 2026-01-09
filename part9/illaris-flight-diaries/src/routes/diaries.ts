import express from 'express';
import { Response } from 'express';
import diaryService from '../services/diaryService';
import { NonSensitiveDiaryEntry } from '../types';
const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  const entries = diaryService.getNonSensitiveEntries();
  res.send(entries);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;