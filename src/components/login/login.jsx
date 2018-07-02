import React from 'react'
import GithubConfig from '../../apollo/github'
import queryString from "query-string";
import styled from 'styled-components'
import colors from '../../style/colors'

const Container = styled.div`
  background-color: ${colors.backgroundDarker};
  padding: 1rem 1rem;
`
const LoginButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.text};
  border: none;
  font-size: 1.2rem;
  padding: 0.5rem 0rem;
  width: 100%;
  border-radius: 0.25rem;
`


class Login extends React.Component{

  sendToGithub =e => {
    const param = {
      client_id: GithubConfig.clientId,
      redirect_uri: GithubConfig.redirectUri,
      state: GithubConfig.state
    }
    const stringified = queryString.stringify(param);
    window.location.replace(GithubConfig.githubUri + "?" +stringified );
  }

  render(){
    return <Container>
    <LoginButton onClick={this.sendToGithub}>
      Login
      </LoginButton>
    </Container>
  }
}

export default Login