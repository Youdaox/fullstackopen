import {
  TextField,
} from "@mui/material"


const TextInput = ({ text, value, setValue }) => (
  <div>
    <TextField
      label={text}
      type="tezt"
      value={value}
      onChange={({ target }) => setValue(target.value)}
    ></TextField>
  </div>
);

export default TextInput;
