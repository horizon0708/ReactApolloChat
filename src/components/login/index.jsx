import React from 'react'
import { Query, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import LogIn from './login'
import UserInfo from './userInfo'

const GET_CURENT_USER = gql`
  query {
    clientInfo @client {
      currentUser {
        id
        name
      }
    }
  }
`

const VALIDATE_USER_TOKEN = gql`
query($token: String!){
  userToken(token: $token){
    id
    name
  }
} 
`

const ASSIGN_USER = gql`
  mutation($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) @client
  }
`

class Index extends React.Component {
  state = {
    checked: false,
    token: null 
  }

  componentDidMount(){
    const token = localStorage.getItem("auth_token");
    if(token){
      this.setState({token, checked: true})
    } else {
      this.setState({checked: true});
    }
  }

  renderUser(){
    return <Query query={GET_CURENT_USER}>
    {({ error, loading, data }) => {
      if (error) return <p />
      if (loading) return <p />
      const {currentUser } = data.clientInfo;
      return currentUser.id ? <UserInfo {...currentUser} /> : <LogIn />
    }}
  </Query>
  }

  render () {
    const { checked, token } = this.state;
    const { mutate } = this.props;
    if(checked && token){
      return  <Query query={VALIDATE_USER_TOKEN} variables={{token }}>
        {
          ({error, loading, data}) => {
            if (error) return <p />
            if (loading) return <p />
            const { id, name } = data.userToken;
            mutate({ variables: { id, name}});
            return this.renderUser();
          }
        }
      </Query>
    } else if(checked && !token) {
      return this.renderUser();
    } else {
      return <p> loading ... </p>
    }
  }
}

export default graphql(ASSIGN_USER)(Index)
