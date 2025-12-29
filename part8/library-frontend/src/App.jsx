import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import BirthYearForm from './components/BirthYearForm'
import Recommendation from './components/Recommendation'
import { useState } from 'react'
import {
  Routes, Route, Link
} from 'react-router-dom'
import { useApolloClient } from '@apollo/client/react'

const App = () => {
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')
  const client = useApolloClient()

  const logout = () => {
    localStorage.clear()
    setToken('')
    client.clearStore()
  }


  return (
    <div>
      {message && (<div> {message} </div>)}
      <div>
        <button>
          <Link to='/'>authors</Link>
        </button>
        <button>
          <Link to='/books'>books</Link>
        </button>
        {token && 
          <>
            <button>
              <Link to='/create'>add</Link>
            </button>
            <button>
              <Link to='/edit'>edit</Link>
            </button>
            <button>
              <Link to='/recommend'>recommend</Link>
            </button>
            <button onClick={logout}>
              logout
            </button>
          </>
        }
        {!token && 
          <button>
            <Link to='/login'>login</Link>
          </button>
        }
      </div>

      <Routes>
        <Route path='/' element={<Authors/>} />
        <Route path='/books' element={<Books/>} />
        <Route path='/create' element={<NewBook setMessage={setMessage} token={token} />} />
        <Route path='/edit' element={<BirthYearForm token={token} />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/recommend' element={<Recommendation />} />
      </Routes>
    </div>
  )
}

export default App
