import React from 'react';
import {Trans} from '@lingui/macro';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";

import { Container, Row, Button } from 'react-materialize';

const CalculatorHelp = (props) => {

    const renderTitle = 'h6';

    return <Container className='help-page-help-container'>
        <Trans render="h5">Brauchst du Hilfe?</Trans>

        <Trans render={renderTitle} id='calculatorHelpPage'>
            Oben siehst du eine Aufgabe, die du ausrechnen sollst. <br/>
            Fange an, indem du die erste Zahl in die Rechenmaschine eingibst. Dazu klickst du die
            Scheiben unter den bunten Nullen. Die farbigen Felder von rechts nach links stehen für Einser, Zehner,
            Hunderter usw. Daher musst du immer von rechts nach links arbeiten.<br />
            Wenn die Aufgabe 23 + 45 ist, gibst du erst die Drei ein, indem du drei mal auf die erste
            Scheibe von rechts klickst, dann gehst du eine Scheibe nach links und klickst zwei mal. <br />
            Nun kannst du die zweite Zahl addieren. Die Maschine macht die Addition automatisch. Man
            braucht kein Pluszeichen.<br/>
            Die zweite Zahl gibst du genau so wie die Erste ein, aber vergiss nicht zu zählen,
            wie oft du geklickt hast! Die Rechenmaschine zählt jeden Klick mit!<br />
            Das Endergebnis wird dir in den farbigen Feldern angezeigt. Drück auf <em>Eingeben!</em> um
            dein Ergebnis zu überprüfen.<br />
            Viel Spaß! </Trans>

        <Player
            playsInline
            src={require('./data/screencast_calculator.mp4')}
        />
        <Row>
            <Button onClick={() => props.setShowHelp(false)}><Trans>Zurück zum Spiel</Trans></Button>
        </Row>
    </Container>;
};

export default CalculatorHelp;
