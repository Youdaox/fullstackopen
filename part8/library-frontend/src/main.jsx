import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { SetContextLink } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({ uri: 'http://localhost:4001' })

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4001' })
)

const authLink = new SetContextLink((preContext) => {
  const token = localStorage.getItem('user-token')
  return {
    headers: {
      ...preContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (  
      definition.kind === 'OperationDefinition' && 
      definition.operation === 'subscription'
      )
  },  
  wsLink,  
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router>
          <App />
      </Router>
    </ApolloProvider>
  </StrictMode>
)
