import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

import noop from 'lodash/fp/noop';

import UserPanel from './UserPanel';
import ChatRooms from './ChatRooms';

const SidePanel = ({ setChatRoomModalOpen }) => (
  <Menu
    size="large"
    inverted
    fixed="left"
    vertical
    style={{ background: '#452007', fontSize: '1.2em'}}
  >
    <UserPanel />
    <ChatRooms setChatRoomModalOpen={setChatRoomModalOpen} />
  </Menu>
);


SidePanel.propTypes = {
  // From parent
  setChatRoomModalOpen: PropTypes.func,
}

SidePanel.defaultProps = {
  // From parent
  setChatRoomModalOpen: noop,
}

export default SidePanel;
