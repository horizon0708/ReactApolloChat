import React from 'react'
import gql from 'graphql-tag'
import { graphql} from 'react-apollo'
import styled from 'styled-components'
import colors from '../../style/colors';

const LOG_OUT = gql`
  mutation {
    logOut @client
  }
`

const LogoutButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.text};
  border: none;
  font-size: 1.2rem;
  padding: 0.5rem 0rem;
  width: 100%;
  border-radius: 0.25rem;
`

const LogOut = ({ mutate }) => {
  const signOut = e => {
    localStorage.removeItem("auth_token");
    mutate();
  } 

  return <LogoutButton onClick={signOut}>
    Log out
  </LogoutButton>
}

export default graphql(LOG_OUT)(LogOut);
