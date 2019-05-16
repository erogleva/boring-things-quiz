import React, {Dispatch, SetStateAction, useEffect} from 'react';
import { Trans } from '@lingui/macro';
import './RestartPage.css';
import {LEVEL_ONE} from "../../constants";
//@ts-ignore
import {  Button  } from 'react-materialize';
import {getRandomObjects, shuffleArray} from "../../utils/arrayUtils";
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
import {exhibitedObjects, nonExhibitedObjects} from "../../data";
//@ts-ignore
import confetti from 'canvas-confetti';


interface Props {
    setCurrentPage: Dispatch<SetStateAction<string>>,
    setCorrectItems: Dispatch<SetStateAction<ExhibitionObject[]>>,
    setObjects: Dispatch<SetStateAction<string[]>>,
    setSelected: Dispatch<SetStateAction<string[]>>
}

const RestartPage = (props: Props) => {

    const handleClick = () => {
        const randomExhibitedObjects: string[] = getRandomObjects(exhibitedObjects,  [], 3).map(obj => obj.src);
        const randomNonExhibitedObjects: string[] = shuffleArray(nonExhibitedObjects).slice(0, 3);

        let correctItems: ExhibitionObject[] = [];

        for (let objectSrc of randomExhibitedObjects) {
            const object = exhibitedObjects.find(object => object.src === objectSrc);

            if (object) {
                correctItems.push(object);
            }
        }

        props.setCorrectItems(() => ([...correctItems]));
        const objectsSet = shuffleArray([...randomExhibitedObjects, ...randomNonExhibitedObjects]);
        props.setObjects(() => [...objectsSet]);
        props.setSelected([]);
        props.setCurrentPage(LEVEL_ONE)
    };

    const end = Date.now() + (3 * 1000);


    const colors = ['#009688', '#9a2aec', '#f5cf0a'];

    const frame = () =>  {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: {
                x: 0
            },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: {
                x: 1
            },
            colors: colors
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    };

    useEffect(() => {
        frame();
    }, []);

    return <div className='restart-page'>

        <Trans render='h6'>Gibt es im Stadtmuseum Tübingen noch mehr "langweilige Sachen"?</Trans>

        <Button onClick={handleClick}><Trans>Neue Runde</Trans></Button>
    </div>
};

export default RestartPage;