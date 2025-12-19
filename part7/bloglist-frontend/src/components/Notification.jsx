import { useSelector } from "react-redux";
import {
  Alert,
} from "@mui/material"

const Notification = () => {
  const message = useSelector((state) => state.notification);
  console.log(message);
  if (message === "") {
    return null;
  }

  return (
    <Alert severity={message.type ? "success" : "error"}>{message.message}</Alert>
  );
};
export default Notification;
