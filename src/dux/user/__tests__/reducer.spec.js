import set from 'lodash/fp/set';

import userReducers, { initialState } from '../reducer';
import * as actionTypes from '../actionTypes';
import { user1 } from '../../../__mocks__/mock_data';

describe('User Reducers', () => {
  it('should return an initial state', () => {
    expect(userReducers(null, {})).toEqual(null);
  });
  it('should handle SET_USER', () => {
    expect(userReducers(
      initialState,
      { 
        type: actionTypes.SET_USER,
        payload: { currentUser: user1 },
      },
    )).toEqual(set('currentUser', user1, initialState))
  });
  it('should handle CLEAR_USERS', () => {
    expect(userReducers(
      initialState,
      { 
        type: actionTypes.CLEAR_USERS,
      },
    )).toEqual(set('currentUser', null, initialState))
  });
})
