import React, { Component } from 'react';
import sketch from './sketch';
import { Trans } from '@lingui/macro';
import './CalculatorWrapper.css';
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

    shouldComponentUpdate() {
        return false
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
        return <div className='calculator-wrapper'>

            <Trans render={renderTitle}> Wähle deine Sprache </Trans>
            <Select onChange={this.selectLanguage} value={this.props.language}>
                <option value="de">
                    Deutsch
                </option>
                <option value="en">
                    English
                </option>
            </Select>

            {/*<ModalDialog open={this.props.modalOpen} content={<CalculatorHelp isHelpPage={false}/>}/>*/}
            <Trans render={renderTitle} id='calculatorMainPage'>Benutze Schickards Rechenmaschine um die Lösung zu finden! <br />
                Gebe die Zahlen von Rechts nach Links ein, indem du auf die Scheiben unter den bunten Feldern klickst. <br />
                Die Felder stehen für Einser, Zehner, Hunderter usw. <br />
                Die Rechenmaschine addiert automatisch, das Ergebnis siehst du in den bunten Feldern. </Trans>
            <Trans render={renderTitle}> <button className='button-link' onClick={this.showHelp}> Hier </button> findest du auch eine Videoanleitung für die Rechenmaschine. </Trans>
            <div
            id="calculator-container"
            style={{ width: "100%", textAlign: "center" }}
        />
        </div>
    }
}

export default CalculatorWrapper;
