import React from 'react';
// @ts-ignore
import { Row, Button } from 'react-materialize';

interface Props {
    text: string,
    handleClick: () => void
}

const Continue = (props: Props) => {
    return <React.Fragment>
        <Row>
            <h6>{props.text}</h6>
        </Row>
        <Row>
            <Button onClick={props.handleClick}>Continue</Button>
        </Row>
    </React.Fragment>
};

export default Continue;