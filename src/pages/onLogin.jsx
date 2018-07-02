import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import styled from 'styled-components'
import colors from '../style/colors';
import Loading from '../components/icons/loading';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  font-size: 1.5rem;
  background-color: ${colors.background};
  display: flex;
  text-align: center;
`

const ASSIGN_USER = gql`
  mutation($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) @client
  }
`

export default graphql(ASSIGN_USER)(
  class extends React.Component {
    componentDidMount () {
      const { data: { userLogin }, mutate, history } = this.props
      if (userLogin) {
        localStorage.removeItem('auth_token')
        localStorage.setItem('auth_token', userLogin.token)
        mutate({
          variables: {
            id: userLogin.id,
            name: userLogin.name
          }
        })
        history.push('/')
      } else {
        // push to error
        history.push('/')
      }
    }

    render () {
      return <Container><Loading /></Container>
    }
  }
)
