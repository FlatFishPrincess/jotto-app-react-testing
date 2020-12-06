import React, { useContext } from 'react';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringModule from './helpers/strings';


/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if 'success' prop is )
 */
const Congrats = () => {
    const [success] = successContext.useSuccess();
    const language = React.useContext(languageContext);
    if (success) {
        return (
            <div data-test="component-congrats" className="alert alert-success">
                <span data-test="congrats-message">
                    {stringModule.getStringByLanguage(language, 'congrats')}
                </span>
            </div>
        );
    }
    return <div data-test="component-congrats" />
}


export default Congrats;