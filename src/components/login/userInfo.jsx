import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import LogoutButton from './logoutButton'
import styled from 'styled-components'
import colors from '../../style/colors'

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      name
      avatarUrl
    }
  }
`

const Image = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 15px;
`

const Container = styled.div`
  background-color: ${colors.backgroundDarker};
  padding: 1rem 1rem;
`
const InfoContainer = styled.div`display: flex;
  margin-bottom: 1rem;
  color: ${colors.textLight};
`
const Name = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.textLight};
  font-size: 1.5rem;
`

const UserInfo = ({ id }) => {
  return (
    <Container>
      <Query query={GET_USER} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>loading</p>
          if (error) return <InfoContainer>error</InfoContainer>
          return (
            <InfoContainer>
              <Image src={data.user.avatarUrl} alt='avatar' />
              <Name>
                {data.user.name}
              </Name>
            </InfoContainer>
          )
        }}
      </Query>
      <LogoutButton />
    </Container>
  )
}
export default UserInfo
