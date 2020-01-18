import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useListVals } from 'react-firebase-hooks/database';
import { useDispatch, connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import find from 'lodash/fp/find';
import noop from 'lodash/fp/noop';

import firebase from '../../firebase';
import { setCurrentChatRoom } from '../../dux/chatRoom/actions';
import * as chatRoomSelectors from '../../dux/chatRoom/selectors';
import * as userSelectors from '../../dux/user/selectors';

const StyledMenuItem = styled(Menu.Item)`
  font-size: 0.85em;
`;
const getAuthorizedChatRooms = currentUserId => filter(
  ({ members }) => find(member => member === currentUserId, members)
)

const ChatRooms = ({
  currentChatRoomId,
  currentUserId,
  setChatRoomModalOpen,
 }) => {
  const dispatch = useDispatch();
  const chatRoomsRef = firebase.database().ref('chatRooms');
  const [chatRoomList, loading] = useListVals(chatRoomsRef);
  const authorizedChatRooms = getAuthorizedChatRooms(currentUserId)(chatRoomList);

  useEffect(() => {
    if(!loading && authorizedChatRooms.length && !currentChatRoomId) {
      dispatch(setCurrentChatRoom(authorizedChatRooms[0]));
    }
  }, [loading, authorizedChatRooms, currentChatRoomId]);

  return (
    <Fragment>
      <Menu.Menu>
        <Menu.Item>
          <strong>
            CHAT ROOMS {' '}
          </strong>
          ({ authorizedChatRooms.length }) <Icon name="add" onClick={() => setChatRoomModalOpen(true)} />
        </Menu.Item>
      </Menu.Menu>
      {loading && <Menu.Item>Loading...</Menu.Item>}
      {authorizedChatRooms.length > 0 && (
        map((chatRoom) => (
          <StyledMenuItem
            key={chatRoom.id}
            onClick={() => dispatch(setCurrentChatRoom(chatRoom))}
            name={chatRoom.name}
            style={{ opacity: 0.7 }}
            active={currentChatRoomId === chatRoom.id}
          >
            # {chatRoom.name}
          </StyledMenuItem>
        ), authorizedChatRooms)
      )}
    </Fragment>
  )
}

ChatRooms.propTypes = {
  // From connect
  currentUserId: PropTypes.string,
  currentChatRoomId: PropTypes.string,
  // From parent
  setChatRoomModalOpen: PropTypes.func,
}

ChatRooms.defaultProps = {
  // From connect
  currentUserId: '',
  currentChatRoomId: '',
  // From parent
  setChatRoomModalOpen: noop,
}

export default connect(state => ({
  currentChatRoomId: chatRoomSelectors.getCurrentChatRoomId(state),
  currentUserId: userSelectors.getCurrentUserId(state),
}))(ChatRooms);
