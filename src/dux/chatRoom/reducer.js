import { handleActions } from 'redux-actions';
import set from 'lodash/fp/set';

import {
  SET_CURRENT_CHAT_ROOM,
  UPDATE_CHAT_ROOM_MEMBERS,
 } from './actionTypes';

const initialState = {
  chatRooms: [],
  currentChatRoom: {},
};

export default handleActions({
  [SET_CURRENT_CHAT_ROOM]: (state, { payload }) => set('currentChatRoom', payload, state),
  [UPDATE_CHAT_ROOM_MEMBERS]: (state, { payload }) => set('currentChatRoom.members', payload, state),
}, initialState);
