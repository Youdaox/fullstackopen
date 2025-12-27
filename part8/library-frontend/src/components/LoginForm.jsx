import { useState } from 'react'
import { LOGIN } from "../queries"
import { useMutation } from '@apollo/client/react'
import {
  useNavigate
} from 'react-router-dom'

const LoginForm = ({ setMessage, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message)
    }
  })

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault()
    const result = await login({ variables: { username, password}})
  
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm