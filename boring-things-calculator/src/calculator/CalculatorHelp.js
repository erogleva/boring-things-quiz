import React from 'react';
import {Trans} from '@lingui/macro';
// import "video-react/dist/video-react.css";


import {Button, Row} from 'react-materialize';

const CalculatorHelp = (props) => {

    return <div className='calculator-help-page'>

        <video id="calculator-video" controls="true" width="100%" height="100%" playsinline preload="metadata" poster={require('./data/Rechenmaschine_VideoPreview.png')}>
            <source src={require('./data/screencast_calculator.mp4')} type="video/mp4" />
            <p>This browser does not support the video element.</p>
        </video>

        <Row>
            <Button onClick={() => props.setShowHelp(false)}><Trans>Zurück zum Spiel</Trans></Button>
        </Row>
    </div>;
};

export default CalculatorHelp;
