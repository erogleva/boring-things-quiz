import React, {useEffect, useState} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import ObjectsGrid from "./components/level-one/ObjectsGrid";
import HelpPage from "./components/HelpPage";
// @ts-ignore
import {Breadcrumb, Container} from 'react-materialize';
import {exhibitedObjects, nonExhibitedObjects} from "./data";
import TextsQuiz from "./components/level-two/TextsQuiz";
import {ExhibitionObject} from "./interfaces/ExhibitionObject";
import {getRandomObjects, shuffleArray} from "./utils/arrayUtils";
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

export type LanguageString = 'en' | 'de'
export const i18n = setupI18n();


const App = () => {

    // Level one state
    const [objects, setObjects] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    // Global state
    const [language, setLanguage] = useState<LanguageString>('de');
    const [correctItems, setCorrectItems] = useState<ExhibitionObject[]>([]);
    const [currentPage, setCurrentPage] = useState<string>(LANDING_PAGE);
    const [component, setComponent] = useState<JSX.Element>(<LandingPage setCurrentPage={setCurrentPage}
                                                                         setLanguage={setLanguage}/>);
    const [showHelp, setShowHelp] = useState<boolean>(false);
    const [levelThreeUnlocked, setLevelThreeUnlocked] = useState<boolean>(false);

    const resetGame = () => {
        const randomExhibitedObjects: string[] = getRandomObjects(exhibitedObjects, [], 3).map(obj => obj.src);
        const randomNonExhibitedObjects: string[] = shuffleArray(nonExhibitedObjects).slice(0, 3);

        let correctItems: ExhibitionObject[] = [];

        for (let objectSrc of randomExhibitedObjects) {
            const object = exhibitedObjects.find(object => object.src === objectSrc);

            if (object) {
                correctItems.push(object);
            }
        }

        setCorrectItems(() => ([...correctItems]));
        const objectsSet = shuffleArray([...randomExhibitedObjects, ...randomNonExhibitedObjects]);
        setObjects(() => [...objectsSet]);
        setSelected([]);
    };

    useEffect(() => {

        const calculator = exhibitedObjects.find(obj => obj.id === '06413b');

        const randomExhibitedObjects: string[] = getRandomObjects(exhibitedObjects, calculator ? [calculator] : [], 2).map(obj => obj.src);
        const randomNonExhibitedObjects: string[] = shuffleArray(nonExhibitedObjects).slice(0, 3);

        let correctItems: ExhibitionObject[] = [];

        for (let objectSrc of randomExhibitedObjects) {
            const object = exhibitedObjects.find(object => object.src === objectSrc);

            if (object) {
                correctItems.push(object);
            }
        }

        setCorrectItems((prevState: ExhibitionObject[]) => ([...prevState, ...correctItems]));
        const objectsSet = shuffleArray([...randomExhibitedObjects, ...randomNonExhibitedObjects]);
        setObjects(prevState => [...prevState, ...objectsSet])
    }, []);

    useEffect(() => {

        switch (currentPage) {
            case LEVEL_ONE:
                setComponent(<ObjectsGrid selected={selected} setSelected={setSelected} objects={objects}
                                          setCurrentPage={setCurrentPage}/>);
                break;
            case LEVEL_TWO:
                setComponent(<TextsQuiz correctItems={correctItems} setCurrentPage={setCurrentPage}
                                        language={language} setLevelThreeUnlocked={setLevelThreeUnlocked}/>);
                break;
            case LEVEL_THREE:
                setComponent(<TinderObjects correctItems={correctItems} resetGame={resetGame}
                                            setCurrentPage={setCurrentPage} language={language}/>);
                break;
            case LANDING_PAGE:
                setComponent(<LandingPage setCurrentPage={setCurrentPage} setLanguage={setLanguage}/>);
                break;
            case RESTART_PAGE:
                setComponent(<RestartPage resetGame={resetGame} setCurrentPage={setCurrentPage}/>)

        }
    }, [currentPage, selected, objects, correctItems, showHelp]);

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
