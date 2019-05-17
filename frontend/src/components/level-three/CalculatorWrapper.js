import React, { Component } from 'react';
import sketch from './sketch';
import { Trans } from '@lingui/macro';
import ModalDialog from "../common/Modal";
import CalculatorHelp from "./CalculatorHelp";
import './CalculatorWrapper.css';


class CalculatorWrapper extends Component {

    componentDidMount() {
        this.canvas = new window.p5(sketch, 'calculator-container');
        this.canvas.props = {setCurrentPage: this.props.setCurrentPage};
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillUnmount() {
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    render() {
        const renderTitle = 'h6'
        return <div className='calculator-wrapper'>
            <ModalDialog open={this.props.modalOpen} content={<CalculatorHelp isHelpPage={false}/>}/>
            <Trans render={renderTitle}>Benutze Schickards Rechenmaschine um die Lösung zu finden!</Trans>
                <Trans render={renderTitle}>Gebe die Zahlen von Rechts nach Links ein, indem du auf die Scheiben unter den bunten Feldern klickst. </Trans>
                <Trans render={renderTitle}>Die Felder stehen für Einser, Zehner, Hunderter usw. </Trans>
                <Trans render={renderTitle}>Die Rechenmaschine addiert automatisch, das Ergebnis siehst du in den bunten Feldern.</Trans>
            <div
            id="calculator-container"
            style={{ width: "100%", textAlign: "center" }}
        />
        </div>
    }
}

export default CalculatorWrapper;