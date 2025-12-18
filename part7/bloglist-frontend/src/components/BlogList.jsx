import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.login)

  return (
    <div className='blogs_list'>
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            ownBlog={blog.user.username === user.username ? true : false}
          />
        )}
      )}
    </div>
  )
}

export default BlogList