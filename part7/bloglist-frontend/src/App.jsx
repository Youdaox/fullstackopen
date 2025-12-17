import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglabe'
import blogService from './services/blogs'
import loginService from './services/login'
import { addNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchdata() {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    fetchdata()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(addNotification('successfully logged in', 3000, true))
      setUsername('')
      setPassword('')
    } catch {
      dispatch(addNotification('wrong credentials', 3000, false))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const LoginFormProps = {
    handleLogin,
    username,
    setUsername,
    password,
    setPassword
  }

  const handleCreateBlog = async (blog) => {
    try {
      await blogService.createBlog(blog)
      createFormRef.current.toggle()
      dispatch(addNotification(`a new blog ${blog.title} added`, 3000, true))
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch {
      dispatch(addNotification('cannot add blog', 3000, false))
    }
  }

  const handleUpdateBlog = async (blog, id) => {
    try {
      await blogService.updateBlog(blog, id)
      dispatch(addNotification(`blog ${blog.title} updated`, 3000, true))
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch {
      dispatch(addNotification('cannot update blog', 3000, false))
    }
  }

  const createFormRef = useRef()
  const createForm = () => (
    <Togglable buttonText="create blog" ref={createFormRef}>
      <CreateForm
        createBlog={handleCreateBlog}
      />
    </Togglable>
  )

  const handleDeleteBlog = async (blog) => {
    const blogToDelete = blog
    await blogService.deleteBlog(blog.id)
    const newBlogs = blogs.filter(b => (b !== blogToDelete))
    setBlogs(newBlogs)
  }

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
            {blogs.sort((a, b) => b.likes - a.likes).map(blog => {
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