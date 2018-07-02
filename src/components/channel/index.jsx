import React from 'react'
import { Query} from 'react-apollo'
import gql from 'graphql-tag'
import ChannelPage from './channelPage'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  @media (max-width: 600px) {
    display: none;
  }
`


const GET_CHANNELS = gql`
  query{
    channels{
      name
      id
    }
    clientInfo @client {
      currentChannel
    }
  }
`
// subscription for channel??

export default class extends React.Component {
  render () {
    return (
      <Query query={GET_CHANNELS}>
        {({...result}) => <ChannelPage {...result}/> }
      </Query>
    )
  }
}
