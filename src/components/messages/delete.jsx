import React from 'react'

const Delete = ({id, show, isLoggedIn, onDelete}) => {
  return show ? <span onClick={onDelete(id)}> delete! </span> : null;
}

export default Delete;