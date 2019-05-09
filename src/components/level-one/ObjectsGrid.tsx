import React, {Dispatch, SetStateAction} from 'react';
// @ts-ignore
import {exhibitedObjects} from "../../data";
// @ts-ignore
import {Button, Col, Icon, Modal, Row} from 'react-materialize';
import './ObjectsGrid.css';
import Object from "./Object";
import Continue from "../common/Continue";
import {Plural, t, Trans} from '@lingui/macro';
import ModalDialog from "../common/Modal";
import {I18n} from "@lingui/react"
import { LEVEL_TWO } from "../../constants";

interface Props {
    objects: string[],
    selected: string[],
    setSelected: Dispatch<SetStateAction<string[]>>,
    setCurrentPage: Dispatch<SetStateAction<string>>
}

const ObjectsGrid = (props: Props) => {

    const handleClick = (objectName: string) => {
        if (props.selected.includes(objectName)) {
            props.setSelected(prevSelection => prevSelection.filter(name => name !== objectName));
        } else {
            if (props.selected.length === 3) {
                return
            }
            props.setSelected(prevSelection => [...prevSelection, objectName]);
        }
    };

    const getModalContent = () => {
        if (props.selected.length < 3) {
            return <Row>
                <h6><Trans>Bitte wähle drei Objekte aus!</Trans></h6>
            </Row>
        } else {

            const correctObjects = props.selected.filter(object => exhibitedObjects.some((obj) => obj.src == object));

            if (correctObjects.length === 3) {
                return <I18n>
                    {({i18n}) => (
                        <Continue
                            text={i18n._(t`Super! Du hast alle Objekte richtig identifiziert!'`)}
                            buttonText={i18n._(t`Gehe zu Level 2`)}
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
            {props.objects.slice(0, props.objects.length / 2).map(object => <Object key={object}
                                                                                    selected={props.selected.includes(object)}
                                                                                    source={object}
                                                                                    handleClick={(object) => handleClick(object)}/>)}
        </Row>
        <Row>
            {props.objects.slice(props.objects.length / 2, props.objects.length).map(object => <Object key={object}
                                                                                                       selected={props.selected.includes(object)}
                                                                                                       source={object}
                                                                                                       handleClick={(object) => handleClick(object)}/>)}
        </Row>
        <Row>
            <ModalDialog trigger={<Button>Submit <Icon right>
                send
            </Icon> </Button>} content={getModalContent()}/>
        </Row>
    </div>;
};

export default ObjectsGrid;