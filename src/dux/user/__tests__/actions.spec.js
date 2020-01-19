import * as userActions from '../actions';
import * as userActionTypes from '../actionTypes';
import { user1  } from '../../__tests__/mock_data';

describe('User Actions', () => {
  it('should handle setUser', () => {
    const currentUser = user1;
    expect(userActions.setUser(currentUser))
    .toEqual({
      type: userActionTypes.SET_USER,
      payload: { currentUser },
    });
  });
  it('should handle clearUser', () => {
    expect(userActions.clearUser())
    .toEqual({
      type: userActionTypes.CLEAR_USER,
    });
  });
})
