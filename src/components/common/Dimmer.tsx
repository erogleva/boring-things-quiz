import React from 'react';

interface Props {
    visible: boolean
}

const Dimmer = (props: Props) => {
    return <div className={`dimmer ${props.visible ? 'active' : ''}`}/>
};

export default Dimmer;