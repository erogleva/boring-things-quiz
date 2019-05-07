import React, { Component } from 'react';
import sketch from './sketch';
import { Trans } from '@lingui/macro';

class CalculatorWrapper extends Component {

    componentDidMount() {
        this.canvas = new window.p5(sketch, 'calculator-container')
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
        return <React.Fragment>
            <Trans render="h6">Benutze Schickards Rechenmaschine um die Lösung zu finden!</Trans>
            <div
            id="calculator-container"
            style={{ width: "100%", textAlign: "center" }}
        /></React.Fragment>
    }
}

export default CalculatorWrapper;