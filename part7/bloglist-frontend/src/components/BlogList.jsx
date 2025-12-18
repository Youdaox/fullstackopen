import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, addLike } from '../reducers/blogReducer'
import { addNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  const handleUpdateBlog = async (blog, id) => {
    try {
      dispatch(addLike(blog, id))
      dispatch(addNotification(`blog ${blog.title} updated`, 3000, true))
    } catch (error) {
      dispatch(addNotification('error updating blog', 3000, false))
    }
  }

  const handleDeleteBlog = async (blog) => {
    dispatch(deleteBlog(blog.id))
  }

  return (
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
  )
}

export default BlogList