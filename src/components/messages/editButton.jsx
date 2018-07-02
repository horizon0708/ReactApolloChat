import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const UPDATE_EDIT_ID = gql`
  mutation UpdateEditId($id: ID!){
    updateEditId(editId: $id) @client
  }
`

const EditButton = ({ messageId }) =>
  <Mutation mutation={UPDATE_EDIT_ID}>
    {(updateId, _) => {
      return <button onClick={e => updateId({ variables: { id: messageId } })}>
        Edit!
      </button>
    }}
  </Mutation>

export default EditButton
