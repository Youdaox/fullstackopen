import { GET_BOOKS } from "../queries"
import { useQuery } from "@apollo/client/react"

const Books = () => {
  const result = useQuery(GET_BOOKS)

  if (result.loading) {
    return (<p> loading...</p>)
  }

  const books = result.data.allBooks
  console.log(books)
  if (!books) {
    return (<p> currently no books</p>)
  }

  return (
    <div>
      <h2>books</h2>

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
    </div>
  )
}

export default Books
