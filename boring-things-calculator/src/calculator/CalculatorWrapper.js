import React, { Component } from 'react';
import sketch from './sketch';
import { Trans } from '@lingui/macro';
import { Select } from 'react-materialize';


class CalculatorWrapper extends Component {

    constructor(props){
        super(props);

        this.showHelp = this.showHelp.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
    }

    componentDidMount() {
        this.canvas = new window.p5(sketch, 'calculator-container');
    }


    componentWillUnmount() {
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    showHelp() {
        this.props.setShowHelp(true);
    }

    selectLanguage(event) {
        this.props.setLanguage(event.target.value)
    }

    render() {
        const renderTitle = 'h6';
        return <div className='calculator-main-page'>

            <Trans render={renderTitle}> Wähle deine Sprache </Trans>
            <Select onChange={this.selectLanguage} value={this.props.language}>
                <option value="de">
                    Deutsch
                </option>
                <option value="en">
                    English
                </option>
            </Select>
            <Trans render={renderTitle} > Benutze Schickards Rechenmaschine, um die Aufgabe zu lösen! <br />

                Gebe die Zahlen ein, indem du auf die Räder unter den bunten Feldern klickst.
                Die Felder stehen für Einser, Zehner, Hunderter usw.
                Du musst immer von rechts nach links arbeiten – also mit den Einsern beginnen. <br />
                Lautet die Aufgabe z.B. 23 + 45, gibst du zuerst die Drei ein, indem du drei Mal auf das erste
                Ziffernrad von rechts klickst. Dann gehst du ein Ziffernrad nach links und klickst zwei Mal.
                Jetzt brauchst du weder ein Pluszeichen noch auf null zurückzustellen, sondern klickst einfach die 45 auf die gleiche Weise ein.
                Aber vergiss nicht zu zählen, wie oft du geklickt hast! Die Rechenmaschine zählt jeden Klick mit und addiert automatisch. <br />

                Das Endergebnis wird dir in den farbigen Feldern angezeigt. Drück auf <em>Enter!</em> um dein Ergebnis zu überprüfen. <br/>

                Viel Spaß!
            </Trans>

            <Trans render={renderTitle}> <button className='button-link' onClick={this.showHelp}> Hier </button> findest du auch eine Videoanleitung für die Rechenmaschine. </Trans>
            <div
            id="calculator-container"
        />
        </div>
    }
}

export default CalculatorWrapper;
