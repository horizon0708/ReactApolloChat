import React from 'react'
import styled from 'styled-components'
import colors from '../../style/colors';

const Container = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: ${colors.textLight};
  background-color: transparent;
  margin-top: 3rem;
`

const ErrorMessage = ({ message }) => {
  return (
    <Container>
      <div style={{fontSize: "5rem", marginBottom: "0.25rem"}}>
        <i className='fa fa-exclamation-triangle' aria-hidden='true' />
      </div>
      <div>{ message ? message : "Oops! An error!"}</div>
      <div>Try again later</div>
    </Container>
  )
}

export default ErrorMessage
