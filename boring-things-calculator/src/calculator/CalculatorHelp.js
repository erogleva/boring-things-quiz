import React from 'react';
import {Trans} from '@lingui/macro';
import {Player} from 'video-react';
import "video-react/dist/video-react.css";

import {Button, Row} from 'react-materialize';

const CalculatorHelp = (props) => {

    return <div style={{padding: '1.5em 0.2em'}}>

        <Player
            playsInline
            src={require('./data/screencast_calculator.mp4')}
        />
        <Row>
            <Button onClick={() => props.setShowHelp(false)}><Trans>Zurück zum Spiel</Trans></Button>
        </Row>
    </div>;
};

export default CalculatorHelp;
