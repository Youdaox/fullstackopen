import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  console.log(message)
  if (message === '') {
    return null
  }

  return (
    <div className={message.type ? 'success': 'error'}>
      {message.message}
    </div>
  )
}
export default Notification