import React from 'react'
import styled from 'styled-components'
import colors from '../../style/colors';

const Container = styled.div`
  background-color: ${colors.backgroundDark};
  border-top: 2px ${colors.backgroundLight} solid;
  color: ${colors.backgroundLight};
  margin: 1rem 1rem;
  padding-top: 1rem;
  font-size: 1rem;
  text-align: center;
`
const Icon = styled.i`
  font-size: 2.2rem;
  margin-bottom: 1rem;
`

const TextBox = styled.div`
  margin-bottom: 1rem;
`

const A = styled.a`
  display: block;
  margin: 0.5rem 0rem;
   text-decoration: none;
   &:link{
     color: ${colors.textDark};
   }
   &:visited {
     color: ${colors.backgroundLight};
   }
   &:hover {
     color: ${colors.text};
   }
`

const Info = () => {
  return <Container>
    <div><Icon className="fa fa-info-circle" aria-hidden="true"></Icon>
</div>
    <TextBox>This is a demo chat app made with React, ApolloJS, Graphql and Elixir</TextBox>
    <A href="#"> FrontEnd Repo </A>
    <A href="#"> BackEnd Repo </A>
  </Container>
}

export default Info