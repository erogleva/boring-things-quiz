import React, { Component } from 'react';
import sketch from './sketch';
import { Trans } from '@lingui/macro';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import p5 from 'p5';
import 'p5/lib/addons/p5.dom'
import 'p5/lib/addons/p5.sound'

class CalculatorWrapper extends Component {

    constructor(props){
        super(props);

        this.showHelp = this.showHelp.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
    }

    componentDidMount() {
        this.canvas = new p5(sketch, 'calculator-container');
    }


    componentWillUnmount() {
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    showHelp() {
        this.props.setShowHelp(true);
    }

    selectLanguage(countryCode) {
        if (countryCode === "GB") {
            this.props.setLanguage('en')
        } else {
            this.props.setLanguage('de')
        }
    }

    render() {
        const renderTitle = 'h6';
        return <div className='calculator-main-page'>

            <ReactFlagsSelect
                className="menu-flags"
                defaultCountry={this.props.language === 'en' ? 'GB': 'DE'}
                countries={["GB", "DE"]}
                customLabels={{"GB": "English","DE": "Deutsch"}}
                onSelect={this.selectLanguage}
                showSelectedLabel={true}
            />

            <Trans render='h5' className='calculator-title'>Benutze Schickards Rechenmaschine, um die Aufgabe zu lösen!</Trans>

            <Trans render={renderTitle} >
                Gebe die Zahlen ein, indem du auf die Räder unter den bunten Feldern klickst.
                Die Felder stehen für Einser, Zehner, Hunderter usw.
                Du musst immer von rechts nach links arbeiten – also mit den Einsern beginnen. <br /> <br />
                Lautet die Aufgabe z.B. 23 + 45, gibst du zuerst die Drei ein, indem du drei Mal auf das erste
                Ziffernrad von rechts klickst. Dann gehst du ein Ziffernrad nach links und klickst zwei Mal.
                Jetzt brauchst du weder ein Pluszeichen noch auf null zurückzustellen, sondern klickst einfach die 45 auf die gleiche Weise ein.
                Aber vergiss nicht zu zählen, wie oft du geklickt hast! Die Rechenmaschine zählt jeden Klick mit und addiert automatisch. <br /> <br />

                Das Endergebnis wird dir in den farbigen Feldern angezeigt. Drück auf <em>Enter!</em> um dein Ergebnis zu überprüfen. <br/>

                Viel Spaß!
            </Trans>

            <Trans render='h5' className='video-link'> <button className='button-link' onClick={this.showHelp}> Hier </button> findest du auch eine Videoanleitung für die Rechenmaschine. </Trans>
            <div
            id="calculator-container"
        />
        </div>
    }
}

export default CalculatorWrapper;
