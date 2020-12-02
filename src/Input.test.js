import React from 'react';
import Input from './Input';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProp } from '../test/testUtils';

const defaultProps = { secretWord: 'party' }
/**
 * Setup function for app component
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<Input {...setupProps}/>);
}

test('Input renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
});


test('does not throw warning with expected error', () => {
    const expectedProps = defaultProps;
    checkProp(Input, expectedProps);
});

// Use .toHaveBeenCalledWith to ensure that a mock function was called with specific arguments.
describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper;
    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
        wrapper = setup();
    })

    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate("change", mockEvent);
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });

    test('state reset upon submit click', () => {
        const submitBtn = findByTestAttr(wrapper, 'submit-button');
        submitBtn.simulate('click', { preventDefault(){} }); 
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
    });
});