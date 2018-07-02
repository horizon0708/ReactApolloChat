import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { GET_CLIENT_INFO } from '../../apollo/sharedGql'
import CreateMessage from './createMessage'
import EditMessage from './editMessage'

const ADD_MESSAGE = gql`
  mutation($message: String!, $channelId: ID!, $userId: ID!) {
    createMessage(message: $message, channelId: $channelId, userId: $userId) {
      id
    }
  }
`

const GET_MESSAGE = gql`
  query($id: ID!, $channelId: ID!) {
    message(id: $id) {
      message
    }
  }
`

export default class extends React.Component {
  render () {
    let input
    return (
      <Query query={GET_CLIENT_INFO}>
        {({
          data: { clientInfo: { editId, currentChannel, currentUser } }
        }) => {
          return editId
            ? <Query query={GET_MESSAGE} variables={{ id: editId }}>
              {({ loading, error, data }) => {
                if (loading) return <p>loading</p>
                if (error) return <p>error!</p>
                return (
                  <EditMessage
                    messageId={editId}
                    message={data.message.message}
                    />
                )
              }}
            </Query>
            : <CreateMessage
              channelId={currentChannel}
              userId={currentUser.id}
              />
        }}
      </Query>
    )
  }
}
