import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

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
      return <p>redirecting ...</p>
    }
  }
)
