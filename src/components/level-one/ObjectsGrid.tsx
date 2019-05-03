import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
// @ts-ignore
import {exhibitedObjects} from "../../data";
// @ts-ignore
import {Button, Col, Icon, Row} from 'react-materialize';
import './ObjectsGrid.css';
import Object from "./Object";
import Continue from "../common/Continue";

interface Props {
    objects: string[],
    selected: string[],
    setSelected: Dispatch<SetStateAction<string[]>>,
    setCurrentPage: Dispatch<SetStateAction<string>>
}

const ObjectsGrid = (props: Props) => {

    const [canContinue, setCanContinue] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        if (submitted) {
            if (props.selected.every(object => exhibitedObjects.some((obj) => obj.src == object))) {
                setCanContinue(true);
            } else {
                setCanContinue(false);
            }
        }
    }, [submitted]);

    const handleClick = (objectName: string) => {
        setSubmitted(false);
        if (props.selected.includes(objectName)) {
            props.setSelected(prevSelection => prevSelection.filter(name => name !== objectName));
        } else {
            if (props.selected.length === 3) {
                return
            }
            props.setSelected(prevSelection => [...prevSelection, objectName]);
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return <div className='level-one-objects-grid'>
        <h6>Some objects may seem boring but actually have an exciting story to tell! </h6>
        <h6>Three of these objects are part of the exhibition in the museum - can you guess which?</h6>
        <Row className='image-grid'>
            {props.objects.slice(0, props.objects.length / 2).map(object => <Object key={object}
                selected={props.selected.includes(object)} source={object}
                handleClick={(object) => handleClick(object)}/>)}
        </Row>
        <Row>
            {props.objects.slice(props.objects.length / 2, props.objects.length).map(object => <Object key={object}
                selected={props.selected.includes(object)} source={object}
                handleClick={(object) => handleClick(object)}/>)}
        </Row>
        <Row>
            <Button type="submit" onClick={handleSubmit}>
                Submit
                <Icon right>
                    send
                </Icon>
            </Button>
        </Row>
        {submitted && props.selected.length < 3 && <Row>
            <h6>Please select three objects!</h6>
        </Row>}
        {submitted && props.selected.length === 3 && canContinue &&
        <Continue text='Congratulations! You identified the three objects correctly!'
                  handleClick={() => props.setCurrentPage('level-two')}/>}
        {submitted && props.selected.length === 3 && !canContinue && <Row>
            <h6>Unfortunately these are not the correct objects. Try again!</h6>
        </Row>}
    </div>;
};

export default ObjectsGrid;