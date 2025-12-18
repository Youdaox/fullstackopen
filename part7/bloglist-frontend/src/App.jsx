import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglabe'

import { addNotification } from './reducers/notificationReducer'
import { deleteBlog, initializeBlogs, addLike } from './reducers/blogReducer'
import { login, initializeUser, logout } from './reducers/loginReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

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


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login(username, password))
      dispatch(addNotification('successfully logged in', 3000, true))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(addNotification('wrong credentials', 3000, false))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const LoginFormProps = {
    handleLogin,
    username,
    setUsername,
    password,
    setPassword
  }

  const handleUpdateBlog = async (blog, id) => {
    try {
      dispatch(addLike(blog, id))
      dispatch(addNotification(`blog ${blog.title} updated`, 3000, true))
    } catch (error) {
      dispatch(addNotification('error updating blog', 3000, false))
    }
  }

  const createFormRef = useRef()
  const createForm = () => (
    <Togglable buttonText="create blog" ref={createFormRef}>
      <CreateForm createFormRef={createFormRef}/>
    </Togglable>
  )

  const handleDeleteBlog = async (blog) => {
    dispatch(deleteBlog(blog.id))
  }

  const user = useSelector(state => state.login)
  const blogs = useSelector(state => state.blog)

  return (
    <div>
      <Notification />
      {!user && LoginForm(LoginFormProps)}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {createForm()}
          <div className='blogs_list'>
            {[...blogs].sort((a, b) => b.likes - a.likes).map(blog => {
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={handleUpdateBlog}
                  ownBlog={blog.user.username === user.username ? true : false}
                  deleteBlog={handleDeleteBlog}
                />
              )}
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App