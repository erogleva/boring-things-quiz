import React, {Dispatch, SetStateAction, useEffect} from 'react';
import { Trans } from '@lingui/macro';
import './RestartPage.css';
import {LEVEL_ONE} from "../../constants";
//@ts-ignore
import {  Button  } from 'react-materialize';
import {getRandomObjects, shuffleArray} from "../../utils/arrayUtils";
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
import {exhibitedObjects, nonExhibitedObjects} from "../../data";
//@ts-ignore
import confetti from 'canvas-confetti';


interface Props {
    resetGame: () => void;
}

const RestartPage = (props: Props) => {

    const end = Date.now() + (3 * 1000);


    const colors = ['#009688', '#9a2aec', '#f5cf0a'];

    const frame = () =>  {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: {
                x: 0
            },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: {
                x: 1
            },
            colors: colors
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    };

    useEffect(() => {
        frame();
    }, []);

    const renderTitle = "h5";

    return <div className='restart-page'>

        <Trans render='h3'>Glückwunsch!</Trans>
        <Trans render={renderTitle}> Du hast die Rechenmaschine erfolgreich benutzt und hast nun das Ende des Spiels erreicht!</Trans>
        <Trans render={renderTitle}>Drei von vierzig Objekten hast du bereits kennengelernt. Falls du die Sammlung weiter erkunden willst, kannst du das Spiel nochmal spielen. Die Objekte ändern sich mit jedem Mal. </Trans>
        <Trans render={renderTitle}>Schau auch im Museum vorbei! Dort kannst du die Objekte von nahem betrachten und noch mehr Spannendes entdecken!</Trans>
        <Trans render={renderTitle}>Ein Geheimtipp: Schickards Rechenmaschine kannst du im Museum auch benutzen! Vielleicht schaffst du es ja etwas zu multiplizieren?</Trans>
        <Trans render={renderTitle}>Wir wünschen dir viel Spaß beim weiterspielen und hoffen dich bald im Museum zu sehen!</Trans>

        <Button onClick={props.resetGame}><Trans>Neue Runde</Trans></Button>
    </div>
};

export default RestartPage;