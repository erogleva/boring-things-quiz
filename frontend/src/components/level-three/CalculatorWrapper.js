import React, { Component } from 'react';
import sketch from './sketch';
import { Trans } from '@lingui/macro';
import ModalDialog from "../common/Modal";
import CalculatorHelp from "./CalculatorHelp";


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
        return <React.Fragment>
            <ModalDialog open={this.props.modalOpen} content={<CalculatorHelp isHelpPage={false}/>}/>
            <Trans render="h6">Benutze Schickards Rechenmaschine um die Lösung zu finden!</Trans>
            <div
            id="calculator-container"
            style={{ width: "100%", textAlign: "center" }}
        />
        </React.Fragment>
    }
}

export default CalculatorWrapper;