import React, { Component } from 'react';
import sketch from './sketch';

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
        return <div
            id="calculator-container"
            style={{ width: "100%", textAlign: "center" }}
        />
    }
}

export default CalculatorWrapper;