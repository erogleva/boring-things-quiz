import React from 'react';
// @ts-ignore
import { Row, Button, Container } from 'react-materialize';
import { Trans } from '@lingui/macro';
import './HelpPage.css';
import "video-react/dist/video-react.css";
//@ts-ignore
import { Player } from 'video-react';

interface Props  {
    setShowHelp (shouldShowHelp: boolean): void,
    currentPage: string
}

const HelpPage = (props: Props) => {

    const getText = () => {
        switch (props.currentPage){
            case 'level-one':
                return <Trans>Klicke auf ein Bild um es auszuwählen. Um ein bereits ausgewähltes Bild zu entfernen musst du ein zweites Mal auf das Bild drücken.</Trans>;
            case 'level-two':
                return <Trans>Jeder Text passt zu einem Bild. Zieh den Text zu dem passendem Bild.</Trans>;
            case 'level-three':
                return <React.Fragment><Trans>Klicke auf die Zifferblätter um die Ausgangszahl einzustellen. Denk dran, von Rechts nach Links zu arbeiten! </Trans> <br/>
                    <Trans>Gebe nun die zweite Zahl ein. Die Rechenmaschine zählt automatisch mit. </Trans> <br />
                    <Trans> Wenn du fertig bist drücke auf Done! Ist das Ergebnis richtig bekommst du einen Punkt. </Trans> <br/>
                    <Trans>Um neu anzufangen drücke auf Reset </Trans><br/>
                    <Trans> Wir wünschen dir viel Spass! </Trans>

                    <Player
                        playsInline
                        src={require('../assets/videos/screencast_calculator.mp4')}
                    />
                </React.Fragment>
        }
    };

    return <Container className='help-page-help-container'>
        <Trans render="h5">Brauchst du Hilfe?</Trans>
        {getText()}
      <Row>
          <Button onClick={() => props.setShowHelp(false)}><Trans>Zurück zum Spiel</Trans></Button>
      </Row>
    </Container>;
};

export default HelpPage;