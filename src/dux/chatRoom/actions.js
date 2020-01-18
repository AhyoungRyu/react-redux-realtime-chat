import * as actionTypes from './actionTypes';

/* ChatRoom Actions */
export const setCurrentChatRoom = (activeChatRoom) => (
  {
    type: actionTypes.SET_CURRENT_CHAT_ROOM,
    payload: activeChatRoom,
  }
);

export const updateChatRoomMembers = (updatedMembers) => (
  {
    type: actionTypes.UPDATE_CHAT_ROOM_MEMBERS,
    payload: updatedMembers,
  }
);
