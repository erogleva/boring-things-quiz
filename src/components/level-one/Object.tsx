import React from 'react';
// @ts-ignore
import {Col} from 'react-materialize';

interface Props {
    selected: boolean,
    source: string
    handleClick: (source: string) => void
}

const Object = (props: Props) => {

    const {selected, source, handleClick} = props;

    return <Col s={4}>
        <img src={require(`../../assets/img/${source}`)}
             className={selected ? 'selected' : ''}
             alt={props.source} onClick={() => handleClick(source)}/>
    </Col>;
};

export default Object;