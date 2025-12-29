import { GET_BOOKS, BOOKS_BY_GENRE } from "../queries"
import { useQuery } from "@apollo/client/react"
import { useState, useEffect } from 'react'

const Books = () => {
  const [filter, setFilter] = useState('')
  const resultAllBooks = useQuery(GET_BOOKS)

  const result = useQuery(BOOKS_BY_GENRE, 
    { variables: { genre: filter },
    skip: !filter
  })
  
  if (result.loading || resultAllBooks.loading) {
    return (<p> loading...</p>)
  }

  let books = resultAllBooks.data.allBooks

  if (!books) {
    return (<p> currently no books</p>)
  }

  const genres = [...new Set(books
    .flatMap(book => book.genres)
    .filter(genre => genre && genre !== "[null]"))]

  if (filter) {
    books = result.data.allBooks
  }
  
  return (
    <div>
      <h2>books</h2>
      {filter && <h4>in genre: {filter} </h4>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(g => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
