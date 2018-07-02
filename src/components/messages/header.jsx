import React from 'react'
import styled from 'styled-components'
import colors from '../../style/colors'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const Header = styled.div`
  color: ${colors.textLight};
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border-bottom: 2px solid ${colors.backgroundDarker};
  text-align: left;
  background-color: ${colors.background};
`

const GET_CHANNEL_NAME = gql`
  query($id: ID!) {
    channel(id: $id) {
      name
    }
  }
`

// surely this can be done in a better way...
const GET_CURRENT_CHANNEL = gql`
  query {
    clientInfo @client {
      currentChannel
    }
  }
`

const Head = () => {
  return (
    <Header>
      <Query query={GET_CURRENT_CHANNEL}>
        {({ error, loading, data }) => {
          if (error) return null
          if (loading) return null
          const {currentChannel} = data.clientInfo;
          console.log(data)
          return <Query query={GET_CHANNEL_NAME} variables={{ id: currentChannel }}>
              {({ error, loading, data }) => {
                if (error) return <span>Error retriving channel name</span>
                if (loading) return <span>loading channel name</span>
                return (
                  <span>
                    # {data.channel.name}
                  </span>
                )
              }}
            </Query>
          
        }}
      </Query>
    </Header>
  )
}

export default Head
