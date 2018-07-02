import styled from 'styled-components'
import colors from '../../style/colors'

export const Container = styled.div`
  background-color: ${colors.background};
  width: 100%;
  padding: 1.25rem 2rem 1rem 2rem;
`

export const Input = styled.input`
  background-color: ${colors.backgroundLight};
  margin-bottom: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  display: flex;
  width: 100%;
  color: ${colors.text};
`
export const Flash = styled.div`
  margin-top: 0.25rem;
  color: ${colors.textDisabled};
  font-weight: 400;
  text-align: left;
`