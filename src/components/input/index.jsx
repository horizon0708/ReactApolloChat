import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { GET_CLIENT_INFO } from '../../apollo/sharedGql'
import CreateMessage from './createMessage'
import EditMessage from './editMessage'


const GET_MESSAGE = gql`
  query($id: ID!) {
    message(id: $id) {
      message
    }
  }
`

export default class extends React.Component {
  render () {
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
