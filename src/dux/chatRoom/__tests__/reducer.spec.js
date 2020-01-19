import set from 'lodash/fp/set';

import chatRoomReducers, { initialState } from '../reducer';
import * as actionTypes from '../actionTypes';
import {
  chatRoom1,
  user1,
  user2,
  user3,
 } from '../../__tests__/mock_data';

describe('ChatRoom Reducers', () => {
  it('should return an initial state', () => {
    expect(chatRoomReducers(null, {})).toEqual(null);
  });
  it('should handle SET_CURRENT_CHAT_ROOM', () => {
    expect(chatRoomReducers(
      initialState,
      { 
        type: actionTypes.SET_CURRENT_CHAT_ROOM,
        payload: chatRoom1,
      },
    )).toEqual(set('currentChatRoom', chatRoom1, initialState))
  });
  it('should handle UPDATE_CHAT_ROOM_MEMBERS', () => {
    expect(chatRoomReducers(
      initialState,
      { 
        type: actionTypes.UPDATE_CHAT_ROOM_MEMBERS,
        payload: [user1, user2, user3],
      },
    )).toEqual(set('currentChatRoom.members', [user1, user2, user3], initialState))
  });
})
