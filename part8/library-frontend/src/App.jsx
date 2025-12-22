import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <div>
        <button>
          <Link to='/'>authors</Link>
        </button>
        <button>
          <Link to='/books'>books</Link>
        </button>
        <button>
          <Link to='/create'>add</Link>
        </button>
      </div>

      <Routes>
        <Route path='/' element={<Authors/>} />
        <Route path='/books' element={<Books/>} />
        <Route path='/create' element={<NewBook/>} />
      </Routes>
    </div>
  )
}

export default App
