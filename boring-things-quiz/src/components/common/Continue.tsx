import React from 'react';
// @ts-ignore
import { Row, Button } from 'react-materialize';

interface Props {
    text: string,
    buttonText: string,
    handleClick: () => void
}

const Continue = (props: Props) => {
    return <React.Fragment>
            <h6>{props.text}</h6>
            <Button onClick={props.handleClick}>{props.buttonText}</Button>
    </React.Fragment>
};

export default Continue;