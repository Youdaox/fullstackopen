import { useState } from "react"
import { EDIT_BORN, AUTHOR_NAMES, GET_AUTHORS } from '../queries'
import { useMutation, useQuery } from "@apollo/client/react"

const BirthYearForm = () => {
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [editBorn] = useMutation(EDIT_BORN)

  const result = useQuery(AUTHOR_NAMES)

  if (result.loading) {
    return (<p> loading...</p>)
  }

  const authorNames = result.data.allAuthors
  
  const submit = (event) => {
    event.preventDefault()
    
    editBorn({ variables: { name: selectedAuthor, setBornTo: Number(born) } })

    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={selectedAuthor}
            onChange={({ target }) => setSelectedAuthor(target.value)}
          >
            {authorNames.map(n => <option key={n.name} value={n.name}>{n.name}</option>)}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm