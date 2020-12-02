import React from 'react';
import PropTypes from 'prop-types';
import languageContext from './contexts/languageContext';
import stringModule from './helpers/strings';

/**
 * Functional react component for Input.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */

const Input = ({ secretWord }) => {
    const language = React.useContext(languageContext);
    const [ currentGuess, setCurrentGuess ] = React.useState('');
    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder={stringModule.getStringByLanguage(language, 'guessInputPlaceholder')}
                    value={currentGuess}
                    onChange={e => setCurrentGuess(e.target.value)}
                /> 
                <button
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={e => {
                        e.preventDefault();
                        setCurrentGuess('')
                    }}
                >
                    {stringModule.getStringByLanguage(language, 'submit')}
                </button>
            </form>
        </div>
    );
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired,
}

export default Input;
