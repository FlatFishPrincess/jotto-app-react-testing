import React from 'react';
import App from './App';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';

import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();
/**
 * Setup function for app component
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUserReducer = jest.fn()
    .mockReturnValue([
      { secretWord },
      jest.fn()
    ]);
  React.useReducer = mockUserReducer;

  // use mount, because useEffect not called on 'shallow'
  return mount(<App />);
}

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('get SecretWord calls', () => {
  test('testSecretWord gets called on App mount', () => {
    setup();
    // check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // wrapper.update() does not trigger update for now
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  })
})

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  });
  
  test('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    // returns wether or not any nodes exist in the wrapper
    expect(appComponent.exists()).toBe(true);
  });

  test('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  
  test('does not renders app when secretWord is null', () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(false);
  });

  test('renders spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
});
 