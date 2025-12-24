const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/Author')
const Book = require('./models/Book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = /* GraphQL */`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.find({}),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = books

      if (args.author) {
        result = result.filter(b => b.author === args.author)
      } 
      if (args.genre) {
        result = result.filter(b => b.genres.includes(args.genre))
      }
      return Book.find({})
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      const authorBooks = books.filter(b => b.author === root.name)
      return 5
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorName = args.author 
      const authorExists = Author.find({ name: authorName })
      if (!authorExists){
        const author = new Author({
          name: args.author,
        })
        await author.save()
      }
      const book = new Book({ ...args, id: uuid() })
      await book.save()
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = {...author, born: args.setBornTo}
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})