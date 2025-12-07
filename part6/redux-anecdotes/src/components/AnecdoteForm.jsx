import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useContext } from 'react'
import NotificationContext from "../notificationContext"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const { messageDispatch } = useContext(NotificationContext)

  const createNew = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    dispatch(createAnecdote(content))
    messageDispatch({ type: 'SET', payload: `new note ${event.target.anecdote.value} created` })
    setTimeout(() => {
      messageDispatch({ type: 'REMOVE' })
    }, 5000)
    event.target.anecdote.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name='anecdote'/>
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm