import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, initializeBlogs } from '../reducers/blogReducer'
import { addNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'


const BlogDetail = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const id = useParams().id
  const blog = useSelector(state => state.blog.find(b => b.id === id))

  if (!blog) {
    return null
  }

  const handleUpdateBlog = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes +1,
      user: blog.user
    }
    try {
      await dispatch(addLike(updatedBlog, blog.id))
      dispatch(addNotification(`blog ${blog.title} updated`, 3000, true))
    } catch (error) {
      dispatch(addNotification('error updating blog', 3000, false))
    }
  }

  return (
    <div>
      <h2>
        {blog.title}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>{blog.likes} likes
        <button onClick={handleUpdateBlog}> like </button>
      </p>
      <p> added by {blog.author}</p>
      <div>
        <h4>comments</h4>
        <ul>
          {blog.comments.map(c => (
            <li key={c}> {c} </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetail