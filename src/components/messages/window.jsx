import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import MessagePage from './messagePage'
import { subscribe } from 'graphql'
import Header from './header'

const GET_MESSAGES = channelId => gql`
{
  channel(id: ${channelId}){
    id
    name
    messages{
      user{
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

const MESSAGES_SUBSCRIPTION_MORE = gql`
  subscription($channelId: ID!) {
    moreMessage(channelId: $channelId) {
      messages{
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

const GET_CURRENT_CHANNEL = gql`
  query {
    clientInfo @client {
      currentChannel
    }
  }
`



const MessageQuery = ({ channelId }) =>
  <Query query={GET_MESSAGES(channelId)}>
    {({ subscribeToMore, ...result }) =>
      <MessagePage
        {...result}
        subscribeToNewMessages={() =>
          subscribeToMore({
            document: MESSAGES_SUBSCRIPTION,
            variables: { channelId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const newMessage = subscriptionData.data.newMessage

              return Object.assign({}, prev, {
                channel: {
                  __typename: prev.channel.__typename,
                  id: prev.channel.id,
                  name: prev.channel.name,
                  messages: [...prev.channel.messages, newMessage]
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
              const index = prev.channel.messages.findIndex(
                m => m.id === updatedMessage.id
              )
              const head = prev.channel.messages.slice(0, index)
              const tail = prev.channel.messages.slice(index + 1)
              return Object.assign({}, prev, {
                channel: {
                  __typename: prev.channel.__typename,
                  id: prev.channel.id,
                  name: prev.channel.name,
                  messages: [...head, updatedMessage, ...tail]
                }
              })
            }
          })}
          subscribeToUpdate={() =>
            subscribeToMore({
              document: MESSAGES_SUBSCRIPTION_MORE,
              variables: { channelId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const newMessages = subscriptionData.data.moreMessage.messages
                return Object.assign({}, prev, {
                  channel: {
                    __typename: prev.channel.__typename,
                    id: prev.channel.id,
                    name: prev.channel.name,
                    messages: [...newMessages, ...prev.channel.messages]
                  }
                })
              }
            })}
      />}
  </Query>

const Window = () => {
  return (
    <Query query={GET_CURRENT_CHANNEL}>
      {({ data: { clientInfo: { currentChannel } } }) => {
        return ( <MessageQuery channelId={currentChannel} />
        
        ) 
      }}
    </Query>
  )
}

export default Window

        {/* <Header channelId={currentChannel} /> */}