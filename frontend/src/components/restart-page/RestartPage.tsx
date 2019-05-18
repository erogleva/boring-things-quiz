import React, {Dispatch, SetStateAction, useEffect} from 'react';
import { Trans } from '@lingui/macro';
import './RestartPage.css';
import {LEVEL_FOUR, LEVEL_ONE} from "../../constants";
//@ts-ignore
import {  Button  } from 'react-materialize';
import {getRandomObjects, shuffleArray} from "../../utils/arrayUtils";
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
import {exhibitedObjects, nonExhibitedObjects} from "../../data";
//@ts-ignore
import confetti from 'canvas-confetti';


interface Props {
    resetGame: () => void;
    setCurrentPage: Dispatch<SetStateAction<string>>
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
        <Trans render='h5'>
            Du hast nun alle drei Spiele erfolgreich gelöst. Schau doch auch im Museum vorbei! Dort kannst du bereits bekannte und neue spannende Sachen entdecken! <br />
            Ein Geheimtipp: Schickards Rechenmaschine kannst du im Museum auch benutzen! <br/>
            Falls du die Sammlung online weiter erkunden willst, kannst du jedes Spiel nochmal spielen indem du auf das Icon oben klickst. Die Objekte ändern sich jedes Mal. <br />
            Du hast jetzt unser Bonus Spiel freigeschaltet und kannst Objekte „tindern“. <br />
            Wir wünschen dir viel Spaß beim Weiterspielen! <br/>
        </Trans>

        <Button onClick={() => props.setCurrentPage(LEVEL_FOUR)}><Trans>Geheimes Level</Trans></Button>
    </div>
};

export default RestartPage;