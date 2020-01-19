import get from 'lodash/fp/get';

import * as chatRoomSelectors from '../selectors';
import { mockState } from '../../__tests__/mock_data';

describe('ChatRoom Selectors', () => {
  it('should handle getChatRoom', () => {
    expect(chatRoomSelectors.getChatRoomState(mockState))
      .toEqual(get('chatRoom', mockState));
  });
  it('should handle getCurrentUser', () => {
    expect(chatRoomSelectors.getCurrentChatRoom(mockState))
      .toEqual(get('chatRoom.currentChatRoom', mockState));
  });
  it('should handle getCurrentUserId', () => {
    expect(userSelectors.getCurrentChatRoomId(mockState))
      .toEqual(get('chatRoom.currentChatRoom.id', mockState));
  });
})
