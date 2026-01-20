import { Button, TextField, Input, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { Diagnosis, EntryFormValues } from "../../types";

const AddEntryForm = ({ onSubmit, onCancel, type, diagnoses }: {onSubmit: (object: EntryFormValues) => void, onCancel: () => void, type: string, diagnoses: Diagnosis[]}) => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");   
    const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [employerName, setEmployerName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dischargeDate, setDischargeDate] = useState("");
    const [criteria, setCriteria] = useState("");

    const addEntry = (event: React.SyntheticEvent) => {
      event.preventDefault();
      let newEntry: EntryFormValues;
      switch (type) {
        case "HealthCheck":
          newEntry = {
            description,
            date,
            specialist,
            type,
            healthCheckRating: healthCheckRating!,
            diagnosisCodes
          };
          break;
        case "Hospital":
          newEntry = {
            description,
            date,
            specialist,
            type,
            diagnosisCodes,
            discharge: { date:dischargeDate, criteria }
          };
          break;
        case "OccupationalHealthcare":
          newEntry = {
            description,
            date,
            specialist,
            type,
            diagnosisCodes,
            employerName,
            sickLeave: { startDate, endDate }
          };
          break;
        default:
          throw new Error(`Unhandled entry type: ${type}`);
      }
      onSubmit(newEntry);
    };

    return (
      <div>
        <h3>Add New {type} Entry</h3>
        <form onSubmit={addEntry}>
          <TextField id="standard-basic"
           label="description" 
           fullWidth
           variant="standard"
           value={description}  
           onChange={({ target }) => setDescription(target.value)}
           />
          <Input
           type="date"
           value={date}  
           onChange={({target}) => setDate(target.value)}
           />
          <TextField id="standard-basic"
           label="specialist" 
           fullWidth
           variant="standard"
           value={specialist}  
           onChange={({ target }) => setSpecialist(target.value)}
           />
            {type === "HealthCheck" &&
            <Select
            label="healthCheckRating" 
            variant="standard"
            fullWidth
            value={healthCheckRating}  
            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>}

            {type === "Hospital" && <>
            <Input
            type="date"
            value={dischargeDate}  
            onChange={({target}) => setDischargeDate(target.value)}
            />
            <TextField id="standard-basic"
            label="criteria" 
            fullWidth
            variant="standard"
            value={criteria}  
            onChange={({ target }) => setCriteria(target.value)}
            /></>}

            {type === "OccupationalHealthcare" && <>
            <TextField id="standard-basic"
            label="employerName" 
            fullWidth
            variant="standard"
            value={employerName}  
            onChange={({ target }) => setEmployerName(target.value)}
            />
            <Input
            type="date"
            value={startDate}  
            onChange={({target}) => setStartDate(target.value)}
            />
            <Input
            type="date"
            value={endDate}  
            onChange={({target}) => setEndDate(target.value)}
            />
          </>}
          <Select
           multiple 
           label="diagnosisCodes" 
           fullWidth
           variant="standard"
           value={diagnosisCodes}  
           onChange={({ target }) => setDiagnosisCodes(typeof target.value === 'string' ? target.value.split(',') : target.value)}
           >
            {diagnoses.map(c => (
              <MenuItem key={c.code} value={c.code}>{c.code}</MenuItem>
            ))}
           </Select>
          <Button variant="contained" color="error" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </form>
      </div>
    );
};

export default AddEntryForm;