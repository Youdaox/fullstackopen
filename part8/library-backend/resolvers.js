const { GraphQLError } = require('graphql')
const Author = require('./models/Author')
const User = require('./models/User')
const Book = require('./models/Book')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.find({ name: args.author})
        return await Book.find({ author: author, genres: args.genre })
      }

      if (args.author) {
        const author = await Author.find({ name: args.author})
        return await Book.find({ author: author })
      } 
      if (args.genre) {
        return await Book.find({ genres: args.genre })
      }
      return await Book.find({})
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const count = await Book.find({ author: root._id })
      
      return count.length
    }
  },
  Book: {
    author: async (root) => {
      return Author.findById(root.author)
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const authorName = args.author 
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }
      
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const updatedAuthor = await Author.findByIdAndUpdate(author._id, { born: args.setBornTo }, { new: true })
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      console.log(user)
      await user.save()
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const token = jwt.sign({
        username: args.username,
        id: user._id
       }, process.env.JWT_SECRET)
      
      return { value: token }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers