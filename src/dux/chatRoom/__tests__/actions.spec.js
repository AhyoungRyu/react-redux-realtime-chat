import * as chatRoomActions from '../actions';
import * as chatRoomActionTypes from '../actionTypes';
import { chatRoom1, user1, user2  } from '../../../__mocks__/mock_data';

describe('ChatRoom Actions', () => {
  it('should handle setCurrentChatRoom', () => {
    expect(chatRoomActions.setCurrentChatRoom(chatRoom1))
    .toEqual({
      type: chatRoomActionTypes.SET_CURRENT_CHAT_ROOM,
      payload: chatRoom1,
    });
  });
  it('should handle updateChatRoomMembers', () => {
    const updatedMembers = [user1, user2];
    expect(chatRoomActions.updateChatRoomMembers(updatedMembers))
    .toEqual({
      type: chatRoomActionTypes.UPDATE_CHAT_ROOM_MEMBERS,
      payload: updatedMembers,
    });
  });
})
