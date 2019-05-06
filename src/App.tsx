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
import CalculatorWrapper from "./components/level-three/CalculatorWrapper";
import {I18nProvider} from '@lingui/react'
import LandingPage from "./components/landing-page/LandingPage";
import catalog_en from "./locales/en/messages";

export type LanguageString = 'en' | 'de'

const App = () => {

    console.log('App');

    // Level one state
    const [objects, setObjects] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    // Global state
    const [language, setLanguage] = useState<LanguageString>('de');
    const [correctItems, setCorrectItems] = useState<ExhibitionObject[]>([]);
    const [currentPage, setCurrentPage] = useState<string>('landing-page');
    const [component, setComponent] = useState<JSX.Element>(<LandingPage setCurrentPage={setCurrentPage} setLanguage={setLanguage}/>);
    const [showHelp, setShowHelp] = useState<boolean>(false);


    useEffect(() => {
        const randomExhibitedObjects: string[] = getRandomObjects(exhibitedObjects).map(obj => obj.src);
        const randomNonExhibitedObjects: string[] = nonExhibitedObjects.slice(0, 3);

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
            case 'level-one':
                setComponent(<ObjectsGrid selected={selected} setSelected={setSelected} objects={objects}
                                          setCurrentPage={setCurrentPage}/>);
                break;
            case 'level-two':
                setComponent(<TextsQuiz correctItems={correctItems} setCurrentPage={setCurrentPage} language={language}/>);
                break;
            case 'level-three':
                setComponent(<CalculatorWrapper/>);
                break;
            default:
                setComponent(<LandingPage setCurrentPage={setCurrentPage} setLanguage={setLanguage}/>)
        }
    }, [currentPage, selected, objects, correctItems]);

    return (
        <I18nProvider language={language} catalogs={{'en': catalog_en}}>
            <div className='app'>
                <nav className="row teal">
                    <div className="nav-wrapper">
                        <div className="col s12">
                            <a className={currentPage === 'level-one' ? 'active breadcrumb' : 'breadcrumb'}> Level
                                1 </a>
                            <a className={currentPage === 'level-two' ? 'active breadcrumb' : 'breadcrumb'}> Level
                                2 </a>
                            <a className={currentPage === 'level-three' ? 'active breadcrumb' : 'breadcrumb'}> Level
                                3 </a>
                        </div>
                    </div>
                </nav>
                <a onClick={() => setShowHelp(true)}>Help</a>
                {!showHelp && component}
                {showHelp && <HelpPage setShowHelp={setShowHelp}/>}
            </div>
        </I18nProvider>
    );

};

export default App;
