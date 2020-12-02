import React, { Component } from 'react';
import hookActions from './actions/hookActions';
import Input from './Input';

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
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App () {
  const [ state, dispatch ] = React.useReducer(
    reducer,
    { secretWord: null }
  );

  const setSecretWord = (secretWord) => dispatch({ type: "setSecretWord", payload: secretWord });
  
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
      <Input secretWord={state.secretWord} />
    </div>
  );

}

export default App;
