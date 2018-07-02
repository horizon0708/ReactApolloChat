import React from 'react'
import ChatWindow from '../components/messages/window'
import ChatInput from '../components/input'
import ChatChannel from '../components/channel'
import styled from 'styled-components'
import Login from '../components/login'
import colors from '../style/colors'
import Header from '../components/messages/header'
import { slide as Menu } from 'react-burger-menu'
import Info from '../components/info/info'
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
  @media (max-width: 600px) {
    display: none;
  }
`

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  handleStateChange (state) {
    this.setState({ menuOpen: state.isOpen })
  }

  closeMenu () {
    this.setState({ menuOpen: false })
  }

  updateMenu = (isOpen)=> {
    this.setState({ menuOpen: isOpen })
  }

  toggleMenu () {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render () {
    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          customBurgerIcon={ false }
        >
          <ChatChannel />
          <div>
            <Info />
          <Login />
          </div>
        </Menu>
        <Layout>
          <LeftColumn>
            <ChatChannel />
            <div>
            <Info/>
            <Login />
            </div>
          </LeftColumn>

          <VerticalFlex>
            <Header updateMenu={this.updateMenu} />
            <ChatWindow />
            <ChatInput />
          </VerticalFlex>
        </Layout>
      </div>
    )
  }
}
