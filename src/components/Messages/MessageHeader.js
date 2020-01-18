import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as chatRoomSelectors from '../../dux/chatRoom/selectors';
import UserInviteModal from '../Modals/UserInvite';

const InviteUserIconBtn = styled(Icon)`
  margin-left: 0.5em !important;
  cursor: pointer;
`;
const MessageHeader = ({ currentChatRoom }) => {
  const [inviteUserModalOpened, setInviteUserModalOpened] = useState(false);
  return (
    <Fragment>
      <Segment clearing>
        <Header
          fluid="true"
          as="h2"
          floated="left"
          style={{ marginBottom: 0 }}
        >
          <span>{currentChatRoom.name}</span>
          <Header.Subheader>
            {currentChatRoom.members.length} Users
            <InviteUserIconBtn
              name="user plus"
              color="grey"
              onClick={() => setInviteUserModalOpened(true)}
            />
          </Header.Subheader>
        </Header>
      </Segment>
      <UserInviteModal
        modalOpened={inviteUserModalOpened}
        onCloseModal={() => setInviteUserModalOpened(false)}
      />
    </Fragment>
  )
}

MessageHeader.propTypes = {
  currentChatRoom: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string),
  })
}
MessageHeader.defaultProps = {
  currentChatRoom: {
    id: '',
    name: '',
    members: [],
  },
}

export default connect(state => ({
  currentChatRoom: chatRoomSelectors.getCurrentChatRoom(state),
}))(MessageHeader);

