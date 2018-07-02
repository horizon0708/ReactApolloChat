import React from 'react'
import Edited from './edited'
import EditButton from './editButton'
import Avatar from './avatar'
import styled from 'styled-components'
import insertedAt from './InsertedAt'
import InsertedAt from './InsertedAt'
import colors from '../../style/colors'

const ChatContainer = styled.div`
  display: flex;
  width: calc(100% - 4rem);
  border-bottom: 1px solid ${colors.backgroundLight};
  margin-left: 2rem;
  margin-right: 2rem;
  padding: 1.2rem 0rem;
`

const MessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: ${colors.text};
`

const MessageInfo = styled.div`
  display: flex;
  text-align: left;
  margin: 0.25rem 0rem;
  color: ${colors.textLight};
`

const Message = ({
  id,
  user,
  insertedAt,
  message,
  edited,
  isLoggedIn
}) => {
  return (
    <ChatContainer>
      <Avatar avatarUrl={user.avatarUrl} />
      <div style={{width: "100%"}}>
        <MessageInfo>
          <span>
            {user.name}
          </span>
          <InsertedAt insertedAt={insertedAt} />
        </MessageInfo>
        <MessageContainer>
          <MessageContainer>
            <div>
              {message}
            </div>
            <Edited edited={edited} />
          </MessageContainer>
          <EditButton messageId={id} />
        </MessageContainer>
      </div>
    </ChatContainer>
  )
}

export default Message
