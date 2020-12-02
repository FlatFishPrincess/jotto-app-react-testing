import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProp } from '../test/testUtils';
import LanguagePicker from './LanguagePicker';

const mockSetLanguage = jest.fn();

const setup = () => {
    return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-language-picker');
    expect(component.exists()).toBe(true);
});

test('does not throw warning with expected props', () => {
    checkProp(LanguagePicker, { setLanguage: mockSetLanguage });
});

test('renders non-zero language icons', () => {
    // NOTE: can test array
    const wrapper = setup();
    const languageIcons = findByTestAttr(wrapper, "language-icon");
    expect(languageIcons.length).toBeGreaterThan(0);

});

test('calls setLanguage prop upon click', () => {
    const wrapper = setup();
    const languageIcons = findByTestAttr(wrapper, "language-icon");
    const firstIcon = languageIcons.first(); // get first node
    firstIcon.simulate("click");

    expect(mockSetLanguage).toHaveBeenCalled()
});

