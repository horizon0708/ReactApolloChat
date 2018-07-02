import React from 'react'
import ChannelItem from './channelItem'
import styled from 'styled-components'
import colors from '../../style/colors'

const Container = styled.div`background-color: ${colors.backgroundDark};`

const Header = styled.div`
  color: ${colors.textLight};
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 2px solid ${colors.backgroundDarker};
  text-align: left;
`
const Channels = styled.div`padding: 1rem;`

export default class extends React.Component {
  render () {
    const { error, loading, data } = this.props
    if (error) return <p>error!</p>
    if (loading) return <p>loading!</p>
    const { channels, clientInfo: { currentChannel } } = data
    
    return (
      <Container>
        <Header>DevChat</Header>
        <Channels>
          {channels.map(channel => {
            return (
              <ChannelItem
                key={channel.id}
                currentChannel={currentChannel}
                {...channel}
              />
            )
          })}
        </Channels>
      </Container>
    )
  }
}
