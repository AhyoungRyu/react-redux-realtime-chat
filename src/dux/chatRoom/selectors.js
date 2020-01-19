import { createSelector } from 'reselect';
import identity from 'lodash/fp/identity';
import get from 'lodash/fp/get';

/**
 * @param {Object} state - The redux state
 * @returns {Object} chatRoom
 */
export const getChatRoomState = createSelector(
  get('chatRoom'),
  identity,
);

/**
 * @param {Object} state - The redux state
 * @returns {Object} chatRoom.currentChatRoom
 */
export const getCurrentChatRoom = createSelector(
  getChatRoomState,
  get('currentChatRoom'),
);

/**
 * @param {Object} state - The redux state
 * @returns {String} chatRoom.currentChatRoom.id
 */
export const getCurrentChatRoomId = createSelector(
  getCurrentChatRoom,
  get('id'),
);

/**
 * @param {Object} state - The redux state
 * @returns {Array} chatRoom.currentChatRoom.members
 */
export const getCurrentChatRoomMembers = createSelector(
  getCurrentChatRoom,
  get('members'),
);