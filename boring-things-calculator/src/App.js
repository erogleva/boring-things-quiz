import React, {useState} from 'react';
import './App.css';
import CalculatorWrapper from "./calculator/CalculatorWrapper";
import {I18nProvider} from '@lingui/react';
import { setupI18n } from '@lingui/core';
import catalog_en from "./locales/en/messages";
import catalog_de from "./locales/de/messages";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import CalculatorHelp from "./calculator/CalculatorHelp";

export const i18n = setupI18n();

function App() {

    const [showHelp, setShowHelp] = useState(false);
    const [language, setLanguage] = useState('de');

    return (
        <I18nProvider i18n={i18n} language={language} catalogs={{'en': catalog_en, 'de': catalog_de}}>
            <div className="App">
                {!showHelp && <CalculatorWrapper setShowHelp={setShowHelp} setLanguage={setLanguage} language={language}/>}
                {showHelp && <CalculatorHelp setShowHelp={setShowHelp}/>}
            </div>
        </I18nProvider>
    );
}

export default App;
