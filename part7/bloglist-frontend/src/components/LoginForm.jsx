import { useState } from "react";
import TextInput from "./TextInput";
import { addNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import {
  Button,
} from "@mui/material"

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login(username, password));
      dispatch(addNotification("successfully logged in", 3000, true));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(addNotification(error.message, 3000, false));
    }
  };

  return (
    <div>
      <h2> log in to application</h2>
      <form onSubmit={handleLogin}>
        <TextInput text="username" value={username} setValue={setUsername} />
        <TextInput text="password" value={password} setValue={setPassword} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
