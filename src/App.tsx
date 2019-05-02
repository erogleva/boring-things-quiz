import React, {useState, useEffect} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import ObjectsGrid from "./components/level-one/objects/ObjectsGrid";
import HelpPage from "./components/HelpPage";
// @ts-ignore
import { Container, Breadcrumb } from 'react-materialize';
import {exhibitedObjects, nonExhibitedObjects} from "./components/level-one/objects/data";
import TextsQuiz from "./components/level-two/TextsQuiz";
import {ExhibitionObject} from "./interfaces/ExhibitionObject";
import { shuffleArray, getRandomObjects } from "./utils/arrayUtils";

const App = () => {

    // Level one state
    const [objects, setObjects] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    // Global state
    const [correctItems, setCorrectItems] = useState<ExhibitionObject[]>([]);
    const [currentPage, setCurrentPage] = useState<string>('level-one');
    const [component, setComponent] = useState<JSX.Element>(<ObjectsGrid objects={objects} selected={selected} setSelected={setSelected} setCurrentPage={setCurrentPage}/>);
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
        switch (currentPage){
            case 'level-one':
                setComponent(<ObjectsGrid selected={selected} setSelected={setSelected} objects={objects} setCurrentPage={setCurrentPage}/>);
                break;
            case 'level-two':
                setComponent(<TextsQuiz correctItems={correctItems}/>)
        }
    });

    return (
        <div className='app'>
            <nav className="row teal">
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a className={currentPage === 'level-one' ? 'active breadcrumb' : 'breadcrumb'}> Level 1 </a>
                        <a className={currentPage === 'level-two' ? 'active breadcrumb' : 'breadcrumb'}> Level 2 </a>
                        <a className={currentPage === 'level-three' ? 'active breadcrumb' : 'breadcrumb'}> Level 3 </a>
                    </div>
                </div>
            </nav>
            <a onClick={() => setShowHelp(true)}>Help</a>
            {!showHelp && <Container>
                {component}
                </Container>}
            {showHelp && <HelpPage setShowHelp={setShowHelp}/>}
        </div>
    );

};

export default App;
