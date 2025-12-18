import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'

import { Link } from 'react-router-dom'

const Blog = ({ blog, ownBlog }) => {

  const dispatch = useDispatch()

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div>
      <div className="blog">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>
    </div>
  )}

export default Blog