import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
// @ts-ignore
import {nonExhibitedObjects} from "../../data";
// @ts-ignore
import {Button, Col, Icon, Modal, Row} from 'react-materialize';
import './ObjectsGrid.css';
import Object from "./Object";
import Continue from "../common/Continue";
import {Plural, t, Trans} from '@lingui/macro';
import ModalDialog from "../common/Modal";
import {I18n} from "@lingui/react"
import {LEVEL_TWO} from "../../constants";
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
import {shuffleArray} from "../../utils/objectUtils";

interface Props {
    correctItems: ExhibitionObject[],
    setCurrentPage: Dispatch<SetStateAction<string>>
}

const ObjectsGrid = (props: Props) => {

    useEffect(() => {
        const randomNonExhibitedObjects: string[] = shuffleArray(nonExhibitedObjects).slice(0, 3);
        const objectsSet = shuffleArray([...props.correctItems.map(item => item.src), ...randomNonExhibitedObjects]);
        setObjects(() => [...objectsSet]);
        setSelected([]);
    }, [props.correctItems]);

    // Level one state
    const [objects, setObjects] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    const handleClick = (objectName: string) => {
        if (selected.includes(objectName)) {
            setSelected(prevSelection => prevSelection.filter(name => name !== objectName));
        } else {
            if (selected.length === 3) {
                return
            }
            setSelected(prevSelection => [...prevSelection, objectName]);
        }
    };

    const modalOnCloseEnd = () => {
        setSelected(prevState => prevState.filter(object => props.correctItems.some((obj) => obj.src == object)));
    };

    const getModalContent = () => {
        if (selected.length < 3) {
            return <Row>
                <h6><Trans>Bitte wähle drei Objekte aus!</Trans></h6>
            </Row>
        } else {

            const correctObjects = selected.filter(object => props.correctItems.some((obj) => obj.src == object));

            if (correctObjects.length === 3) {
                return <I18n>
                    {({i18n}) => (
                        <Continue
                            text={i18n._(t`Super! Du hast alle Objekte richtig identifiziert!`)}
                            buttonText={i18n._(t`Gehe zu Level ${'2'}`)}
                            handleClick={() => props.setCurrentPage(LEVEL_TWO)}/>
                    )}
                </I18n>
            } else if (correctObjects.length > 0) {
                return <Row>
                    <h6><Plural value={correctObjects.length}
                                one='Leider hast du nur ein Objekt richtig identifiziert. Versuch es noch einmal!'
                                other='Leider hast du nur # Objekte richtig identifiziert. Versuch es noch einmal!'/>
                    </h6>
                </Row>
            } else {
                return <Row>
                    <Trans> Leider sind das nicht die richtigen Objekte. Versuch es noch einmal!</Trans>
                </Row>
            }
        }
    };

    return <div className='level-one-objects-grid'>
        <Trans render="h6">
            Manche Sachen sehen vielleicht auf den ersten Blick langweilig aus, aber haben eine spannende Geschichte zu
            erzählen. </Trans>
        <Trans render="h6">Drei dieser Dinge kannst du im Stadtmuseum Tübingen finden. Kannst du erraten welche?</Trans>
        <Row className='image-grid'>
            {objects.slice(0, objects.length / 2).map(object => <Object key={object}
                                                                        selected={selected.includes(object)}
                                                                        source={object}
                                                                        handleClick={(object) => handleClick(object)}/>)}
        </Row>
        <Row>
            {objects.slice(objects.length / 2, objects.length).map(object => <Object key={object}
                                                                                     selected={selected.includes(object)}
                                                                                     source={object}
                                                                                     handleClick={(object) => handleClick(object)}/>)}
        </Row>
        <Row>

            <ModalDialog options={{onCloseEnd: modalOnCloseEnd}} trigger={<Button><Trans>Senden</Trans> <Icon right>
                send
            </Icon> </Button>} content={getModalContent()}/>
        </Row>
    </div>;
};

export default ObjectsGrid;
