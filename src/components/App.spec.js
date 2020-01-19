import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { render, fireEvent, getByTestId, getByText } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import App from './App';
import { mockState } from '../__mocks__/mock_data';

import { Messages } from './Messages';
import { SidePanel } from './SidePanel';
/**
* Mock firebase config setup \w jest
*/
jest.mock('../firebase', () => ({
  initializeApp: jest.fn(),
  database: () => ({
    ref: jest.fn(),
  })
}));
const mockStore = configureStore([]);
describe('App', () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore(mockState);
    component = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  it('successfully renders inner components', () => {
    expect(component.find(Messages).exists()).toEqual(true);
    expect(component.find(SidePanel).exists()).toEqual(true);
  });
  it('should be able to handle opening a modal from App component', () => {
    const { container } = render(
      <Provider store={mockStore(mockState)}>
        <App />
      </Provider>
    );
    const modalOpenTriggerBtn = getByTestId(container, 'new-chatroom');
    fireEvent.click(modalOpenTriggerBtn);
    const chatRoomCreationModal = getByText(document.body, 'Create New Chat Room');
    expect(chatRoomCreationModal.textContent).toBe('Create New Chat Room');
  });
});