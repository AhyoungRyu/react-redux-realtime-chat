import * as actionTypes from './actionTypes';

export const setCurrentChatRoom = (activedChatRoom) => (
  {
    type: actionTypes.SET_CURRENT_CHAT_ROOM,
    payload: activedChatRoom,
  }
);
export const updateChatRoomMembers = (updatedMembers) => (
  {
    type: actionTypes.UPDATE_CHAT_ROOM_MEMBERS,
    payload: updatedMembers,
  }
);
