import { Gender } from "./types";
import { z } from 'zod';


export const patientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});


export default patientSchema;