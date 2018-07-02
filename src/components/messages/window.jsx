import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import MessagePage from './messagePage'

const GET_MESSAGES = gql`
  query($channelId: ID!) {
    listMessages(channelId: $channelId) {
      messages {
        user {
          name
          id
          avatarUrl
        }
        id
        message
        edited
        insertedAt
      }
      cursor
    }
  }
`

const GET_MORE = gql`
  query($channelId: ID!, $cursor: String!) {
    listMessages(channelId: $channelId, cursor: $cursor) {
      messages {
        user {
          name
          id
          avatarUrl
        }
        id
        message
        edited
        insertedAt
      }
      cursor
    }
  }
`

const MESSAGES_SUBSCRIPTION = gql`
  subscription($channelId: ID!) {
    newMessage(channelId: $channelId) {
      user {
        name
        id
        avatarUrl
      }
      id
      message
      edited
      insertedAt
    }
  }
`

const MESSAGES_SUBSCRIPTION_UPDATE = gql`
  subscription($channelId: ID!) {
    updateMessage(channelId: $channelId) {
      user {
        name
        id
        avatarUrl
      }
      id
      message
      edited
      insertedAt
    }
  }
`

const GET_CURRENT_CHANNEL = gql`
  query {
    clientInfo @client {
      currentChannel
      currentUser {
        id
      }
    }
  }
`

const MessageQuery = ({ channelId, userId }) =>
  <Query query={GET_MESSAGES} variables={{ channelId }}>
    {({ subscribeToMore, ...result, fetchMore, data }) =>
      <MessagePage
        {...result}
        data={data}
        userId={userId}
        currentChannel={channelId}
        subscribeToNewMessages={() =>
          subscribeToMore({
            document: MESSAGES_SUBSCRIPTION,
            variables: { channelId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const newMessage = subscriptionData.data.newMessage
              return Object.assign({}, prev, {
                listMessages: {
                  __typename: prev.listMessages.__typename,
                  messages: [newMessage, ...prev.listMessages.messages],
                  cursor: prev.listMessages.cursor
                }
              })
            }
          })}
        subscribeToUpdate={() =>
          subscribeToMore({
            document: MESSAGES_SUBSCRIPTION_UPDATE,
            variables: { channelId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const updatedMessage = subscriptionData.data.updateMessage
              const index = prev.listMessages.messages.findIndex(
                m => m.id === updatedMessage.id
              )
              const head = prev.listMessages.messages.slice(0, index)
              const tail = prev.listMessages.messages.slice(index + 1)
              return Object.assign({}, prev, {
                listMessages: {
                  __typename: prev.listMessages.__typename,
                  messages: [...head, updatedMessage, ...tail],
                  cursor: prev.listMessages.cursor
                }
              })
            }
          })}
        onLoadMore={() => {
          if (data.listMessages && data.listMessages.cursor) {
            fetchMore({
              query: GET_MORE,
              variables: {
                channelId,
                cursor: data.listMessages.cursor
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                const newMessages = fetchMoreResult.listMessages.messages
                return {
                  listMessages: {
                    __typename: prev.listMessages.__typename,
                    messages: [...prev.listMessages.messages, ...newMessages],
                    cursor: fetchMoreResult.listMessages.cursor
                  }
                }
              }
            })
          }
        }}
      />}
  </Query>

const Window = () => {
  return (
    <Query query={GET_CURRENT_CHANNEL}>
      {({ data: { clientInfo: { currentChannel, currentUser } } }) => {
        return <MessageQuery channelId={currentChannel} userId={currentUser.id}/>
      }}
    </Query>
  )
}

export default Window
