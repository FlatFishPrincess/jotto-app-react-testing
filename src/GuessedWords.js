import React from 'react';

import languageContext from './contexts/languageContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import stringsModule from './helpers/strings';

const GuessWords = () => {
    const [guessedWords] = guessedWordsContext.useGuessedWords();
    const language = React.useContext(languageContext) || 'en';
    let contents;
    if(guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instruction">
                {stringsModule.getStringByLanguage(language, 'guessPrompt')}
            </span>
        )
    } else {
        const guessWordsRows = guessedWords.map((word, i) => (
            <tr data-test="guessed-word" key={i}>
                <td>{word.guessedWord}</td>
                <td>{word.letterMatchCount}</td>
            </tr>
        ));
        contents = (
            <span data-test="guessed-words">
                <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
                <table className="table table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
                            <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guessWordsRows}
                    </tbody>
                </table>
            </span>
        )
    }
    return (
        <div data-test="component-guessed-words">
            {contents}
        </div>
    )
};

export default GuessWords;