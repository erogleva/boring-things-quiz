import React, {Dispatch, SetStateAction} from 'react';
import { Trans } from '@lingui/macro';
import './RestartPage.css';
import {LEVEL_ONE} from "../../constants";
//@ts-ignore
import {  Button  } from 'react-materialize';
import {getRandomObjects, shuffleArray} from "../../utils/arrayUtils";
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
import {exhibitedObjects, nonExhibitedObjects} from "../../data";

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

    return <div className='restart-page'>
        <Trans render='h6'>Gibt es im Stadtmuseum Tübingen noch mehr "langweilige Sachen"?</Trans>

        <Button onClick={handleClick}><Trans>Neue Runde</Trans></Button>
    </div>
};

export default RestartPage;