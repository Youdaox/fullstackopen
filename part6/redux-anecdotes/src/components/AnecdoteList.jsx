import { useSelector, useDispatch } from "react-redux"
import { appendVote } from '../reducers/anecdoteReducer'
import { useContext } from 'react'
import NotificationContext from "../notificationContext"

const Anecdote = ({anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    if (state.filter !== '') {
      return (
        state.anecdotes.filter(a => a.content.includes(state.filter))
      ) 
    }
    return state.anecdotes
  })
  const sortedAnecdotes = [...anecdotes].sort((a,b) => (b.votes - a.votes))

  const { messageDispatch } = useContext(NotificationContext)

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(appendVote(anecdote))
            messageDispatch({ type: 'SET', payload: `you voted ${anecdote.content}` })
            setTimeout(() => {
                messageDispatch({ type: 'REMOVE' })
              }, 5000)
              event.target.anecdote.value = ''
            }
          }
        />
        ))}
    </div>
  )
}

export default AnecdoteList