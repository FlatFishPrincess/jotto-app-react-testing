import React from 'react';
import Input from './Input';
import { mount, shallow } from 'enzyme';
import { findByTestAttr, checkProp } from '../test/testUtils';
import languageContext from './contexts/languageContext';

const defaultProps = { secretWord: 'party' }
/**
 * Setup function for app component
 * @returns {ShallowWrapper}
 */
const setup = ({ secretWord, language }) => {
    // const setupProps = {...defaultProps, ...props}
    // return shallow(<Input {...setupProps}/>);
    language = language || 'en';
    secretWord = secretWord || 'party';

    return mount(
        <languageContext.Provider value={language}>
            <Input secretWord={secretWord} />
        </languageContext.Provider>
    )
}

describe('languagePicker test for Input', () => {
    test('correctly renders submit string in english', () => {
        const wrapper = setup({ language: 'en' });
        expect(wrapper.text()).toBe('Submit');
    });
    test('correctly renders emoji submit string in emoji', () => {
        const wrapper = setup({ language: 'emoji' });
        expect(wrapper.text()).toBe('🚀');
    });
})

test('Input renders without error', () => {
    const wrapper = setup({});
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
        wrapper = setup({});
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