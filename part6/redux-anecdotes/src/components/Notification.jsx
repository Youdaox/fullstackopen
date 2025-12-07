import { useContext } from "react"
import NotificationContext from "../notificationContext"

const Notification = () => {
  const { message } = useContext(NotificationContext)

  const style = {
    display: message === '' ? 'none' : '',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return <div style={style}>{message}</div>
}

export default Notification
