import React from 'react';
import styled from 'styled-components';
import { parseDate } from '../../utility/dateHelper'
import colors from '../../style/colors'

const Span = styled.span`
  margin-left: 0.5rem;
  color: ${colors.backgroundLight};
  font-size: 0.85rem;
`

const InsertedAt = ({insertedAt}) => {
  return <Span>
    {parseDate(insertedAt)}
  </Span> 
}

export default InsertedAt