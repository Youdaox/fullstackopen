import { Gender } from "./types";
import { z } from 'zod';


export const patientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const entrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = z.object({
  type: z.literal("HealthCheck"),
  ...entrySchema.shape,
  healthCheckRating: z.number(),
});

const hospitalEntrySchema = z.object({
  type: z.literal("Hospital"),
  ...entrySchema.shape,
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const occupationalHealthcareEntrySchema = z.object({
  type: z.literal("OccupationalHealthcare"),
  ...entrySchema.shape,
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
});

export const entrySchemas = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);

export default patientSchema;