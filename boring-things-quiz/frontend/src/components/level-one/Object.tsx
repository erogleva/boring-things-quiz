import React from 'react';
// @ts-ignore
import {Col, Icon} from 'react-materialize';
import './Object.css';

interface Props {
    selected: boolean,
    source: string
    handleClick: (source: string) => void
}

const Object = (props: Props) => {

    const {selected, source, handleClick} = props;

    return <Col s={4} className='level-one-object'>
        <img src={require(`../../assets/img/${source}`)}
             className={selected ? 'selected' : ''}
             alt={props.source} onClick={() => handleClick(source)}/>
        {/*<Icon small>*/}
            {/*check*/}
        {/*</Icon>*/}
    </Col>;
};

export default Object;