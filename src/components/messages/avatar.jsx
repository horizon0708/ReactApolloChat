import React from 'react';
import defaultAvatar from '../../style/default-avatar.png';
import styled from 'styled-components';

const Image = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 15px;
`

const Avatar = ({avatarUrl}) => {
  return avatarUrl ? <Image src={avatarUrl} alt="avatar" /> :
  <Image src={defaultAvatar} alt="default_avatar" />
}

export default Avatar