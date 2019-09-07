import React from 'react';
import {Trans} from '@lingui/macro';
import {Player} from 'video-react';
import "video-react/dist/video-react.css";

import {Button, Row} from 'react-materialize';

const CalculatorHelp = (props) => {

    return <div className='calculator-help-page'>

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
