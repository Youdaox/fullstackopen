import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Profile = () => {
  const users = useSelector(state => state.user)
  const id = useParams().id

  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>
        {user.username}
      </h2>
      <h3>
        added blogs
      </h3>
      <ul>
        {user.blogs.map(b => <li key={b.id}>
          <Link to={`/blogs/${b.id}`}>{b.title}</Link>
        </li>)}
      </ul>
    </div>
  )
}

export default Profile