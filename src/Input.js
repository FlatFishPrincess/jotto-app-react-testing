import React from 'react';
import PropTypes from 'prop-types';

/**
 * Functional react component for Input.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */

const Input = ({ secretWord }) => {
    const [ currentGuess, setCurrentGuess ] = React.useState('');
    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder="enter guess"
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
                    submit
                </button>
            </form>
        </div>
    );
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired,
}

export default Input;
