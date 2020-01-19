import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { ChatRooms } from '../ChatRooms';
import { UserPanel } from '../UserPanel';
import { SidePanel } from '../index';

import { mockState } from '../../../__mocks__/mock_data';
const mockStore = configureStore([]);

/**
* Mock firebase config setup \w jest
*/
jest.mock('../../../firebase', () => ({
  initializeApp: jest.fn(),
  database: () => ({
    ref: jest.fn(),
  })
}));

describe('SidePanel Component', () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore(mockState);
    component = mount(
      <Provider store={store}>
        <SidePanel />
      </Provider>
    );
  });
  it('successfully renders inner components', () => {
    expect(component.find(ChatRooms).exists()).toEqual(true);
    expect(component.find(UserPanel).exists()).toEqual(true);
  });
});