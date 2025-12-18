import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import Homepage from './components/Homepage'
import Profile from './components/Profile'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/loginReducer'
import { getAllUsers } from './reducers/userReducer'


const App = () => {

  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect( () => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
    }
  }, [dispatch])


  const handleLogout = () => {
    dispatch(logout())
  }

  const user = useSelector(state => state.login)

  return (
    <Router>
      <div>
        {!user && (<LoginForm />)}
        {user && (
          <div>
            <div>
              <Link to="/users">Users</Link>
            </div>

            <Notification />

            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>

            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:id' element={<Profile />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App