import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, addVote } from './requests'
import { useContext } from 'react'
import NotificationContext from "./notificationContext"

const App = () => {
  const queryClient = useQueryClient()

  const { messageDispatch } = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      id: anecdote.id,
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    newVoteMutation.mutate(updatedAnecdote)

    messageDispatch({ type: 'SET', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      messageDispatch({ type: 'REMOVE' })
    }, 5000)
  }

  const newVoteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote))
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not avaliable due to problems in server</div>
  }

  const anecdotes = result.data
  return (
    <div>
      <Notification />

      <h3>Anecdote app</h3>

      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
