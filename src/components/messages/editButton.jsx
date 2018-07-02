import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import colors from '../../style/colors'
import styled from 'styled-components'

const UPDATE_EDIT_ID = gql`
  mutation UpdateEditId($id: ID!){
    updateEditId(editId: $id) @client
  }
`

const EditIcon = styled.span`
  color: ${colors.backgroundLight};
  cursor: pointer;
  &:hover{
    color: ${colors.text}
  }
`

const EditButton = ({ messageId }) =>
  <Mutation mutation={UPDATE_EDIT_ID}>
    {(updateId, _) => {
      return <EditIcon onClick={e => updateId({ variables: { id: messageId } })}>
        <i className="fa fa-pencil" aria-hidden="true"></i>
      </EditIcon>
    }}
  </Mutation>

export default EditButton
