const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
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
    allBooks(author: String, genre: String): [Book!]
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
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books

      if (args.author) {
        const author = await Author.find({ name: args.author})
        books = await Book.find({ author: author })
      } 
      if (args.genre) {
        books = await Book.find({ genres: args.genre })
        console.log(books)
      }
      if (args.author && args.genre) {
        const author = await Author.find({ name: args.author})
        books = await Book.find({ author: author, genres: args.genre })
      }
      return books
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
      let authorExists = await Author.findOne({ name: authorName })
      if (!authorExists){
        if (args.author.length < 4) {
          throw new GraphQLError('author name too short',{
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author
            }
          })
        }
        const newAuthor = new Author({
          name: args.author,
        })
        const author = await newAuthor.save()
        authorExists = author
      }
    

      if (args.title.length < 5) {
        throw new GraphQLError('book title too short',{
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          }
        })
      }

      const book = new Book({ ...args, author: authorExists})
      await book.save()
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
    
      const updatedAuthor = await Author.findByIdAndUpdate(author._id, { born: args.setBornTo }, { new: true })
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