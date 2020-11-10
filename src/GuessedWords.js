import React from 'react';
import PropTypes from 'prop-types';

const GuessWords = (props) => {
    let contents;
    if(props.guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instruction">
                Try to guess the secret word!
            </span>
        )
    } else {
        const guessWordsRows = props.guessedWords.map((word, i) => (
            <tr data-test="guessed-word" key={i}>
                <td>{word.guessedWord}</td>
                <td>{word.letterMatchCount}</td>
            </tr>
        ));
        contents = (
            <span data-test="guessed-words">
                <h3>Guessed Words</h3>
                <table className="table table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>Guess</th>
                            <th>Matching Letters</th>
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

GuessWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired,
        })
    ).isRequired
};

export default GuessWords;