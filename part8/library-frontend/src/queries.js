import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const GET_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
      $title: String!,
      $published: Int!,
      $author: String!,
      $genres: [String!]!
    ) {
      addBook(title: $title, published: $published, author: $author, genres: $genres) {
        title
        published
        author
        genres
        id
      }
    }
    
`

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`
export const AUTHOR_NAMES = gql`
  query {
    allAuthors {
      name
    }
  }
`