import gql from 'graphql-tag'

export default {
  defaults: {
    clientInfo: {
      __typename: 'ClientInfo',
      currentChannel: 2,
      isLoggedIn: false,
      editId: null,
      currentUser: {
        __typename: 'CurrentUser',
        id: null,
        name: null
      }
    }
  },
  resolvers: {
    Query: {
      checkToken: (_, variable, { cache }) => {
        // get client info forn ow
        const query = gql`
          query{
            clientInfo @client {
              currentUser {
                id
                name
              }
            }
          } 
        `
        const previousState = cache.readQuery({ query });
        // if there is current usre, we just return that.
        if(previousState.clientInfo.currentUser.id !== null){
          return previousState;
        }
        const token = localStorage.getItem("auth_token");
        if(!token) {
          return previousState;
        }

        const tokenQuery = gql`
          query{
            userToken(token: "${token}"){
              id
              name
            }
          } 
        `
        // if the token is valid, we could use that to log the user in
        const queryResult = cache.readQuery({ tokenQuery })
        console.log(queryResult)
        if(queryResult.userToken && queryResult.userToken.id){
          const data = {
            ...previousState.clientInfo,
            currentUser: {
              __typename: "CurrentUser",
              id: queryResult.userToken.id,
              name: queryResult.userToken.name
            }
          }
          cache.writeQuery({ query, data });
          return cache.readQuery({ query });
        }
        return previousState;
      }
    },
    Mutation: {
      updateEditId: (_, variable, { cache }) => {
        const query = gql`
          query getEditId {
            clientInfo @client {
              editId
            }
          }
        `
        // https://itnext.io/managing-local-state-with-apollo-client-3be522258645
        // do I need to read the query? how can previous state have all fields when the query only queries for one field?
        const previousState = cache.readQuery({ query })
        const data = {
          clientInfo: {
            ...previousState.clientInfo,
            editId: variable.editId
          }
        }
        cache.writeQuery({
          query,
          data
        })
        return null
      },
      updateChannel: (_, { id }, {cache }) => {
        const query = gql`
          query updateChannel {
            clientInfo @client {
              currentChannel 
            }
          }
        `
        const previousState = cache.readQuery({ query })
        const data = {
          clientInfo: {
            ...previousState.clientInfo,
            currentChannel: id
          }
        }
        cache.writeQuery({
          query,
          data
        })
        return null
      },
      updateUser: (_, variable, {cache }) => {
        const query = gql`
          query {
            clientInfo @client {
              currentUser {
                id
                name
              }
            }
          }
        `
        const previousState = cache.readQuery({ query })
        console.log(variable)
        const data = {
          clientInfo: {
            ...previousState.clientInfo,
            currentUser: {
              __typename: "CurrentUser",
              id: variable.id,
              name: variable.name
            }
          }
        }
        cache.writeQuery({
          query,
          data
        })
        return null
      },
      logOut: (_, variable, {cache }) => {
        const query = gql`
          query {
            clientInfo @client {
              currentUser {
                id
                name
              }
            }
          }
        `
        const previousState = cache.readQuery({ query })
        const data = {
          clientInfo: {
            ...previousState.clientInfo,
            currentUser: {
              __typename: "CurrentUser",
              id: null,
              name: null,
            }
          }
        }
        cache.writeQuery({
          query,
          data
        })
        return null
      }
    }
  }
}

// resolver should reset editId to null on channelChange
