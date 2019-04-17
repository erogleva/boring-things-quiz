import React, {useState, useEffect} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import ObjectsGrid from "./components/level-one/objects/ObjectsGrid";
import HelpPage from "./components/HelpPage";
// @ts-ignore
import { Container, Breadcrumb } from 'react-materialize';
import {exhibitedObjects, nonExhibitedObjects} from "./components/level-one/objects/data";

const App = () => {

    // Level one state
    const [objects, setObjects] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    // Global state
    const [currentPage, setCurrentPage] = useState<string>('level-one');
    const [component, setComponent] = useState<JSX.Element>(<ObjectsGrid objects={objects} selected={selected} setSelected={setSelected}/>);
    const [showHelp, setShowHelp] = useState<boolean>(false);

    // utility function that returns a random number within a given range
    const getRandomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    const shuffleArray = (array: string[]) => {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    };

    // get three random objects from the lists
    const getRandomObjects = (objects: string[]): string[] => {
        const randomObjects: string[] = [];

        while (randomObjects.length < 3) {
            const number = getRandomInt(0, objects.length - 1);
            if (!randomObjects.includes(objects[number])) {
                randomObjects.push(objects[number]);
            }
        }

        return randomObjects
    };

    useEffect(() => {
        const randomExhibitedObjects: string[] = getRandomObjects(exhibitedObjects);
        const randomNonExhibitedObjects: string[] = getRandomObjects(nonExhibitedObjects);

        const objectsSet = shuffleArray([...randomExhibitedObjects, ...randomNonExhibitedObjects]);
        setObjects(prevState => [...prevState, ...objectsSet])
    }, []);

    useEffect(() => {
        switch (currentPage){
            case 'level-one':
                setComponent(<ObjectsGrid selected={selected} setSelected={setSelected} objects={objects}/>);
                break;
        }
    });

    return (
        <div className='app'>
            <nav className="row teal">
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a className={currentPage === 'level-one' ? 'active breadcrumb' : 'breadcrumb'}> Level One </a>
                        <a className={currentPage === 'level-two' ? 'active breadcrumb' : 'breadcrumb'}> Level Two </a>
                        <a className={currentPage === 'level-three' ? 'active breadcrumb' : 'breadcrumb'}> Level Three </a>
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
