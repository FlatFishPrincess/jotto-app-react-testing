import React from 'react';
import { shallow, mount } from 'enzyme';

import guessedWordsContext from './guessedWordsContext';

// a functional component that calls useGuessedWords for our tests
const FunctionalComponent = () => {
    guessedWordsContext.useGuessedWords();
    return <div />;
}

test('useGuessedWords throws error when not wrapped in GuessedWordsProvider', () => {
    expect(() => {
        shallow(<FunctionalComponent />);
    }).toThrow('useGuessedWords must be used within a GuessedWordsProvider')
})

test('useGuessedWords does not throw error when not wrapped in GuessedWordsProvider', () => {
    expect(() => {
        mount(
            <guessedWordsContext.GuessedWordsProvider>
                <FunctionalComponent />
            </guessedWordsContext.GuessedWordsProvider>
        );
    }).not.toThrow('useGuessedWords must be used within a.GuessedWordsProvider')
})