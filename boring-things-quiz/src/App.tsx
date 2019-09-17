import React, {useEffect, useState} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import ObjectsGrid from "./components/level-one/ObjectsGrid";
import HelpPage from "./components/HelpPage";
// @ts-ignore
import {Breadcrumb, Container} from 'react-materialize';
import TextsQuiz from "./components/level-two/TextsQuiz";
import {ExhibitionObject} from "./interfaces/ExhibitionObject";
import {getRandomObjects, shuffleArray} from "./utils/objectUtils";
import {I18nProvider} from '@lingui/react'
import LandingPage from "./components/landing-page/LandingPage";
import {t, Trans} from '@lingui/macro';
import {setupI18n} from "@lingui/core";
import catalog_en from "./locales/en/messages";
import catalog_de from "./locales/de/messages";
import {LANDING_PAGE, LEVEL_THREE, LEVEL_ONE, LEVEL_TWO, RESTART_PAGE} from "./constants";
import RestartPage from "./components/restart-page/RestartPage";
import TinderObjects from "./components/level-three/TinderObjects";
import Navigation from "./components/navigation/Navigation";
import {getObjects} from './api';

export type LanguageString = 'en' | 'de'
export const i18n = setupI18n();


const App = () => {

    // Global state
    const [exhibitedObjects, setExhibitedObjects] = useState<ExhibitionObject[]>([]);
    const [language, setLanguage] = useState<LanguageString>('de');
    const [correctItems, setCorrectItems] = useState<ExhibitionObject[]>([]);
    const [currentPage, setCurrentPage] = useState<string>(LANDING_PAGE);
    const [component, setComponent] = useState<JSX.Element>(<LandingPage setCurrentPage={setCurrentPage}
                                                                         setLanguage={setLanguage}/>);
    const [showHelp, setShowHelp] = useState<boolean>(false);
    const [levelThreeUnlocked, setLevelThreeUnlocked] = useState<boolean>(false);

    const resetGame = () => {
        const randomExhibitedObjects: ExhibitionObject[] = getRandomObjects(exhibitedObjects);
        setCorrectItems(() => ([...randomExhibitedObjects]));
    };

    useEffect(() => {
        if (exhibitedObjects.length > 0) {
            resetGame()
        }

    }, [exhibitedObjects]);

    useEffect(() => {
        (async function() {
            const objects = await getObjects();
            setExhibitedObjects(objects);
        })();
    }, []);

    useEffect(() => {

        switch (currentPage) {
            case LEVEL_ONE:
                setComponent(<ObjectsGrid correctItems={correctItems}
                                          setCurrentPage={setCurrentPage}/>);
                break;
            case LEVEL_TWO:
                setComponent(<TextsQuiz correctItems={correctItems} setCurrentPage={setCurrentPage}
                                        language={language} setLevelThreeUnlocked={setLevelThreeUnlocked}/>);
                break;
            case LEVEL_THREE:
                setComponent(<TinderObjects exhibitedObjects={exhibitedObjects} resetGame={resetGame}
                                            setCurrentPage={setCurrentPage} language={language}/>);
                break;
            case LANDING_PAGE:
                setComponent(<LandingPage setCurrentPage={setCurrentPage} setLanguage={setLanguage}/>);
                break;
            case RESTART_PAGE:
                setComponent(<RestartPage resetGame={resetGame} setCurrentPage={setCurrentPage}/>)

        }
    }, [currentPage, correctItems, showHelp]);

    useEffect(() => {
        document.title = i18n._(t`Lauter langweilige Sachen?`)
    });

    return (
        <I18nProvider i18n={i18n} language={language} catalogs={{'en': catalog_en, 'de': catalog_de}}>
            <div className={currentPage === LANDING_PAGE ? 'app landing-page' : 'app'}>
                <Navigation currentPage={currentPage} levelThreeUnlocked={levelThreeUnlocked} setCurrentPage={setCurrentPage} setShowHelp={setShowHelp} resetGame={resetGame}/>
                {currentPage !== LANDING_PAGE && currentPage !== RESTART_PAGE && currentPage !== LEVEL_THREE && !showHelp &&
                <a onClick={() => setShowHelp(true)}><Trans>Brauchst du Hilfe?</Trans></a>}
                {!showHelp && component}
                {showHelp && <HelpPage setShowHelp={setShowHelp} currentPage={currentPage}/>}
            </div>
        </I18nProvider>
    );

};

export default App;
