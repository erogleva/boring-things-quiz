import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
// @ts-ignore
import {exhibitedObjects} from "./data";
// @ts-ignore
import {Button, Col, Icon, Row} from 'react-materialize';
import './object.css';

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
        <h6> Select the objects you think you will see in the exhibit and click on submit to see if you are right</h6>
        <Row className='image-grid'>
            {props.objects.slice(0, 3).map(object => <Col s={4} key={object}>
                <img src={require(`../../../assets/img/${object}`)} alt={object}
                     className={props.selected.includes(object) ? 'selected' : ''}
                     onClick={() => handleClick(object)}/>
            </Col>)}
        </Row>
        <Row>
            {props.objects.slice(3, 6).map(object => <Col s={4} key={object}>
                <img src={require(`../../../assets/img/${object}`)} className={props.selected.includes(object) ? 'selected' : ''}
                     alt={object} onClick={() => handleClick(object)}/>
            </Col>)}
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
        {submitted && props.selected.length === 3 && canContinue && <React.Fragment>
            <Row>
                <h6>Congratulations! You identified the three objects correctly!</h6>
            </Row>
            <Row>
                <Button onClick={() => props.setCurrentPage('level-two')}>Continue</Button>
            </Row>
        </React.Fragment>}
        {submitted && props.selected.length === 3 && !canContinue && <Row>
            <h6>Unfortunately these are not the correct objects. Try again!</h6>
        </Row>}
    </div>;
};

export default ObjectsGrid;