import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import colors from '../../style/colors'

const Channel = styled.div`
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 1.1rem;
  color: ${colors.textDark};
  background-color: ${props => props.currentChannel === props.id ? colors.backgroundLight : colors.backgroundDark};
  text-align: left;
  &:hover{
    color: ${colors.textLight}
  }
` 

const UPDATE_CHANNEL = gql`
  mutation($id: ID!) {
    updateChannel(id: $id) @client
  }
`

const ChannelItem = ({ name, id, currentChannel }) =>
  <Mutation mutation={UPDATE_CHANNEL}>
    {(update, _) => {
      return <Channel
      id={id}
      currentChannel={currentChannel} 
      onClick={e => update({ variables: { id } })}># {name}
      </Channel>
    }}
  </Mutation>

export default ChannelItem
