import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { EntryFormValues } from "../../types";

const AddEntryForm = ({ onSubmit, onCancel }: {onSubmit: (object: EntryFormValues) => void, onCancel: () => void}) => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");   
    const [healthCheckRating, setHealthCheckRating] = useState<number>();
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>();


    const addEntry = (event: React.SyntheticEvent) => {
      event.preventDefault();
      onSubmit({
        description,
        date,
        specialist,
        type: "HealthCheck",
        healthCheckRating: healthCheckRating!,
        diagnosisCodes
      });
    }

    return (
      <div>
        <h3>Add New HealthCheck Entry</h3>
        <form onSubmit={addEntry}>
          <TextField id="standard-basic"
           label="description" 
           fullWidth
           variant="standard"
           value={description}  
           onChange={({ target }) => setDescription(target.value)}
           />
          <TextField id="standard-basic"
           label="date" 
           fullWidth
           variant="standard"
           value={date}  
           onChange={({ target }) => setDate(target.value)}
           />
          <TextField id="standard-basic"
           label="specialist" 
           fullWidth
           variant="standard"
           value={specialist}  
           onChange={({ target }) => setSpecialist(target.value)}
           />
          <TextField id="standard-basic"
           label="healthCheckRating" 
           fullWidth
           variant="standard"
           value={healthCheckRating}  
           onChange={({ target }) => setHealthCheckRating(Number(target.value))}
           />
          <TextField id="standard-basic"
           label="diagnosisCodes" 
           fullWidth
           variant="standard"
           value={diagnosisCodes}  
           onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
           />
          <Button variant="contained" color="error" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </form>
      </div>
    )
};

export default AddEntryForm;