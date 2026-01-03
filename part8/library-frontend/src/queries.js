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
      author {
        name
        born
        bookCount
        id
      }
      genres
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
        author {
          name
          born
          bookCount
          id
        }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allAuthors {
      name
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        born
        id
        name
        bookCount
      }
      genres
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
`