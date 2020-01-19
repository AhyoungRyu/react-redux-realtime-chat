import get from 'lodash/fp/get';

import * as userSelectors from '../selectors';
import { mockState } from '../../../__mocks__/mock_data';

describe('User Selectors', () => {
  it('should handle getUserState', () => {
    expect(userSelectors.getUserState(mockState))
      .toEqual(get('user', mockState));
  });
  it('should handle getCurrentUser', () => {
    expect(userSelectors.getCurrentUser(mockState))
      .toEqual(get('user.currentUser', mockState));
  });
  it('should handle getCurrentUserId', () => {
    expect(userSelectors.getCurrentUserId(mockState))
      .toEqual(get('user.currentUser.id', mockState));
  });
})
