import { GET_BOOKS, GET_USER } from "../queries"
import { useQuery } from "@apollo/client/react"

const Recommendations = () => {
  const resultUser = useQuery(GET_USER)

  const genre = resultUser.data?.me.favoriteGenre || null

  const result = useQuery(GET_BOOKS, 
    { variables: { genre: genre },
    skip: !genre
  })

  if (resultUser.loading || result.loading) {
    return <p>Loading...</p>;
  }

  let books = result.data.allBooks
  console.log(books)
  if (!books) {
    return (<p> currently no books</p>)
  }

  return (
    <div>
      <h2>recommendations</h2>
      {genre && <p>books in your favourite genre {genre} </p>}
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

export default Recommendations
