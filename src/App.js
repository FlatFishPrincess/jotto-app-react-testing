import React, { Component } from 'react';
import hookActions from './actions/hookActions';
import Input from './Input';
import languageContext from './contexts/languageContext';
import LanguagePicker from './LanguagePicker';

/**
 * Reducer to update state
 * @param {state} state - existing state 
 * @param {action} action - contains 'type' and 'payload' properties for the state upate for example: { type: "setSecretWord", payload: "party"}
 * @return {object} = new state
 */
function reducer(state, action) {
  switch(action.type){
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App () {
  const [ state, dispatch ] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en' }
  );

  const setSecretWord = (secretWord) => dispatch({ type: "setSecretWord", payload: secretWord });
  const setLanguage = (language) => dispatch({ type: 'setLanguage', payload: language });

  React.useEffect(
    () => { hookActions.getSecretWord(setSecretWord) },
    []
  )

  if(!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
          <p>Loading secret word</p>
        </div>
      </div>
    );
  }
  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Input secretWord={state.secretWord} />
      </languageContext.Provider>
    </div>
  );

}

export default App;
