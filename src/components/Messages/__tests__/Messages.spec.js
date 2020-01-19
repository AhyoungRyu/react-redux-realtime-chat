import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Messages } from '../index';
import { MessageForm } from '../MessageForm';
import { MessageHeader } from '../MessageHeader';

import { mockState } from '../../../__mocks__/mock_data';
const mockStore = configureStore([]);

/**
* Mock firebase config setup \w jest
*/
jest.mock('../../../firebase', () => ({
  initializeApp: jest.fn(),
  database: () => ({
    ref: jest.fn(() => {
      return {
        child: jest.fn(() => {
          return {
            put: jest.fn(() => Promise.resolve(true))
          }
        })
      }
    })
  })
}));

describe('Messages Component', () => {
  let store;
  let component;
  let props = {
    currentChatRoomId: '',
    messages: [],
  };
  beforeEach(() => {
    store = mockStore(mockState);
    component = mount(
      <Provider store={store}>
        <Messages {...props} />
      </Provider>
    );
  });
  it('should renders placeholder components if there is no valid chat room id', () => {
    expect(component.text()).toEqual(
      'Nothing to be loaded. Create a new channel to start a conversationNew ChatRoom'
    );
  });
});