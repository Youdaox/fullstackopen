import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from "../notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { messageDispatch } = useContext(NotificationContext)

  const newAnecdoteMutatation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      messageDispatch({ type: 'SET', payload: `${error}` })
      setTimeout(() => {
        messageDispatch({ type: 'REMOVE' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutatation.mutate({ content, votes: 0 })

    messageDispatch({ type: 'SET', payload: `new note ${content} created` })
    setTimeout(() => {
      messageDispatch({ type: 'REMOVE' })
    }, 5000)
  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
