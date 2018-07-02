import gql from 'graphql-tag';

export const GET_CLIENT_INFO = gql`
{
  clientInfo @client {
    currentChannel
    isLoggedIn
    editId
    currentUser {
      id
      name 
    }
  }
}
`