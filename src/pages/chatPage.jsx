import React from 'react'
import ChatWindow from '../components/messages/window'
import ChatInput from '../components/input'
import ChatChannel from '../components/channel'
import styled from 'styled-components'
import Login from '../components/login'
import colors from '../style/colors'
import Header from '../components/messages/header'

const Layout = styled.div`
display: flex;
height: 100vh;
width: 100vw;
`
const VerticalFlex = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  background-color: ${colors.backgroundDark};
`

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <LeftColumn>
        <ChatChannel />
        <Login />
          </LeftColumn> 
        <VerticalFlex>
          <Header />
          <ChatWindow />
          <ChatInput />
        </VerticalFlex>
      </Layout>
    )
  }
}
