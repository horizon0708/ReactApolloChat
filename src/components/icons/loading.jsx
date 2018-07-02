import React from 'react'
import styled from 'styled-components'
import colors from '../../style/colors'
import { HashLoader } from 'react-spinners'

const Container = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: ${colors.textLight};
  background-color: transparent;
  margin-top: 3rem;
`

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`

const Spinner = ({ message }) => {
  return (
    <Container>
      <FlexCenter>
        <div>
          <HashLoader size={80} color={'#ffffff'} loading />
        </div>
      </FlexCenter>
      <div>Loading</div>
      <div>
        {message || ''}
      </div>
    </Container>
  )
}

export default Spinner
