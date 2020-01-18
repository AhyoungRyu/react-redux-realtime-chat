import { createSelector } from 'reselect';
import identity from 'lodash/fp/identity';
import get from 'lodash/fp/get';

/**
 * @param {Object} state - The redux state
 * @returns {Object} user
 */
const getUserState = createSelector(
  get('user'),
  identity,
);

/**
 * @param {Object} state - The redux state
 * @returns {Object} user.currentUser
 */
export const getCurrentUser = createSelector(
  getUserState,
  get('currentUser'),
);

/**
 * @param {Object} state - The redux state
 * @returns {String} user.currentUser.id
 */
export const getCurrentUserId = createSelector(
  getCurrentUser,
  get('id'),
);
