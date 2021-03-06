import picture from './image';
import numberObj from './numbers';
import button from './button';
import display from './display';
import infoButton from './smallbuttons';
import scoreObj from './score';
import Drops from './rain';

import { i18n } from "./../App";
import { t } from "@lingui/macro"


export default function sketch(p) {

    let imgPosX;
    let imgPosY;
    const numLevelMax = 1000;
    var numLevel = 10;
    var resizeFactor;
    const originalPictureSize = 800;
    var buttonPic;
    var machinePic;
    var buttonSound, correctSound, falseSound;

    var calculator;
    var number;
    var button1, button2, button3, button4, button5, button6;
    var display1, display2, display3, display4, display5, display6;
    var ValueDisplay1, ValueDisplay2, ValueDisplay3, ValueDisplay4, ValueDisplay5, ValueDisplay6;
    var ibutton1, ibutton2, ibutton3, ibutton4;
    var score;
    var confetti;
    const maxScore = 2;

    var context = new AudioContext();
    //let backgroundTint = "#009688"; //Original
    let backgroundTint = "#7fcac3";
    var blinkFlag = false;
    var buttonArray = [];
    var displayArray = [];
    var ValueDisplayArray = [];
    var buttonValues = [];

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    function interateNumbers() {
        if (numLevel === 10){
            number.generateRandomNumbers(numLevel * 10, 1);
        }
        else{
            number.setNumber(0,p.random(numLevel/10,numLevel*10));
            number.setNumber(1,p.random(numLevel/10,numLevel));
        }
        numLevel = numLevel * 10;
        if (numLevel >= numLevelMax) numLevel = numLevelMax;
    }

    function SymbolTimerFunc() {
        if(number.isActive()){
            blinkFlag = !blinkFlag;
        }
        else{
            blinkFlag = false;
        }
    }

    console.log(p);

    p.preload = () => {
        buttonPic = p.loadImage(require('./data/Knopf3.gif'));
        machinePic = p.loadImage(require('./data/Rechenmaschine_neu6.gif'));
        p.soundFormats('mp3');
        buttonSound = p.loadSound(require('./data/sound.mp3'));
        correctSound = p.loadSound(require('./data/CorrectSound.mp3'));
        falseSound =p.loadSound(require('./data/FalseSound.mp3'));
    };

    p.setup = () => {

        const height = window.innerHeight - p.canvas.offsetTop;

        p.createCanvas(window.innerWidth, height);
        imgPosX = window.innerWidth / 2;
        imgPosY = height / 2;

        // Set Timer intervall
        setInterval(SymbolTimerFunc, 500);

        // Calculate the reset factor based on the original size of the calculator
        resizeFactor = originalPictureSize/Math.min(window.innerWidth,height);

        // Resize the pictures to fit to screen
        buttonPic.resize(60/resizeFactor,60/resizeFactor);
        machinePic.resize(originalPictureSize/resizeFactor,originalPictureSize/resizeFactor);

        calculator = new picture(imgPosX,imgPosY, machinePic,resizeFactor,p);

        confetti = new Drops(imgPosX,0,20,20,100,resizeFactor,height+(100/resizeFactor),p);

        // Create number Generator
        number = new numberObj(2, p);
        interateNumbers();

        // Construct button classes. Last variable refers to the index
        // of the connected button (to the left) button 1 is all the way to the left
        button1 = new button(buttonPic, buttonSound, null, 100000, p);
        button2 = new button(buttonPic, buttonSound, 0, 10000, p);
        button3 = new button(buttonPic, buttonSound, 1, 1000, p);
        button4 = new button(buttonPic, buttonSound, 2, 100, p);
        button5 = new button(buttonPic, buttonSound, 3, 10, p);
        button6 = new button(buttonPic, buttonSound, 4, 1, p);

        // Create button array
        buttonArray.push(button1, button2, button3, button4, button5, button6);

        // Construct display classes
        display1 = new display(50, 28, 10,resizeFactor,25, p); // round edge does not work
        display2 = new display(50, 28, 10,resizeFactor,25, p);
        display3 = new display(50, 28, 10,resizeFactor,25, p);
        display4 = new display(50, 28, 10,resizeFactor,25, p);
        display5 = new display(50, 28, 10,resizeFactor,25, p);
        display6 = new display(50, 28, 10,resizeFactor,25, p);

        ValueDisplay1 = new display(64, 20, 10,resizeFactor,13, p);
        ValueDisplay2 = new display(64, 20, 10,resizeFactor,13, p);
        ValueDisplay3 = new display(64, 20, 10,resizeFactor,13, p);
        ValueDisplay4 = new display(64, 20, 10,resizeFactor,13, p);
        ValueDisplay5 = new display(64, 20, 10,resizeFactor,13, p);
        ValueDisplay6 = new display(64, 20, 10,resizeFactor,13, p);

        ValueDisplay1.setColor("#cbe9e7");
        ValueDisplay2.setColor("#cbe9e7");
        ValueDisplay3.setColor("#cbe9e7");
        ValueDisplay4.setColor("#cbe9e7");
        ValueDisplay5.setColor("#cbe9e7");
        ValueDisplay6.setColor("#cbe9e7");

        // Create display array. The index refers to the button with the same index in buttonarray
        displayArray.push(display1, display2, display3, display4, display5, display6);
        ValueDisplayArray.push(ValueDisplay1,ValueDisplay2,ValueDisplay3,ValueDisplay4,ValueDisplay5,ValueDisplay6)

        // number pluss number
        ibutton1 = new infoButton(250, 20,resizeFactor, p);
        // points
        ibutton2 = new infoButton(250, 10,resizeFactor, p);
        // reset button
        ibutton3 = new infoButton(250, 20,resizeFactor, p);
        // done button
        ibutton4 = new infoButton(250, 20,resizeFactor, p);

        score = new scoreObj(5,maxScore);
    };

    p.draw = () => {
        // Draws the Background
        p.background(backgroundTint);

        // Show the Machine
        calculator.show();

        // Show all the buttons
        buttonArray.forEach(function (buttonElement, i) {
            buttonElement.show(calculator.getButtonX(i), calculator.getButtonY());
        });

        // Goes through all the display objects
        displayArray.forEach(function (displayElement, i) {
            displayElement.show(calculator.getButtonX(i), calculator.getButtonY() - (58/resizeFactor), p.str(buttonArray[i].getPosition()));
        });

        buttonValues = [i18n._(t`100000er`),i18n._(t`10000er`),i18n._(t`1000er`),i18n._(t`100er`),i18n._(t`10er`),i18n._(t`1er`)];
        ValueDisplayArray.forEach(function (ValueDisplayElement, i) {
            ValueDisplayElement.show(calculator.getButtonX(i), calculator.getButtonY() + (48/resizeFactor), buttonValues[i]);
        });

        ibutton1.update(imgPosX, calculator.getY() + 0.168 * calculator.getHeight(), 300, 45);
        ibutton1.setText(p.str(number.getNumber(0)) + '+' + p.str(number.getNumber(1)) + ' = '+p.str(score.getSymbol()));
        ibutton1.show();

        ibutton2.update(imgPosX - (0.25) * calculator.getWidth(), calculator.getY() + 0.168 * calculator.getHeight(), 45, 45);
        ibutton2.setText(p.str(score.getPoints()));
        ibutton2.show();

        ibutton3.update(imgPosX - (1 / 5) * calculator.getWidth(), calculator.getY() + (0.83) * calculator.getHeight(), 200, 50);
        if (number.isActive()){
            ibutton3.setText(i18n._(t`Weiter!`));
        }
        else if((CalculateMainNumber() !== 0)){
            ibutton3.setText(i18n._(t`Löschen`));
        }else
        { ibutton3.setText(i18n._(t`Neustart`));}
        ibutton3.show(blinkFlag);

        ibutton4.update(imgPosX + (1 / 5) * calculator.getWidth(), calculator.getY() + (0.83) * calculator.getHeight(), 200, 50);
        ibutton4.setText(i18n._(t`Enter!`));
        ibutton4.show();

        // Test confetti
        if (!confetti.isDown()){
            confetti.show();
            confetti.fall();
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    function RotateConnectedButton(PressedButton) {
        // Checks if we have connected an overflow button
        if (PressedButton.getConnectedIndex() != null) {
            // Gets the connected button
            var ConnectedButton = buttonArray[PressedButton.getConnectedIndex()];
            // Rotate the connected button and check for overflow.
            // Reenters the function again if the connected button overflows
            if (ConnectedButton.rotateRight()) {
                RotateConnectedButton(ConnectedButton);
            }
        }
    }

    function ButtonPressed(PressedButton, ConnectedDisplay) {
        // If the button is pressed
        if (PressedButton.isPressed()) {
            if (PressedButton.rotateRight()) {
                RotateConnectedButton(PressedButton);
            }
            ConnectedDisplay.loadColor();
            score.setResetSymbol();
        }
    }

    function resetButtons() {
        buttonArray.forEach(function (buttonElement, i) {
            buttonElement.reset();
        });
        playSound(buttonSound);
    }

    function playSound(tSound){
        tSound.setVolume(0.4);
        tSound.play();
    }

    function CalculateMainNumber() {
        let value = 0;
        buttonArray.forEach(function (buttonElement, i) {
            value = value + buttonElement.getValue();
        });
        return value;
    }

    function handleClick(event) {
        if (context) {
            context.resume();
            // Goes through all the button objects
            buttonArray.forEach(function (buttonElement, i) {
                // Calls the Button pressed function for each object with the connected display
                ButtonPressed(buttonElement, displayArray[i]);
            });

            // Check if reset button is pressed
            if (ibutton3 && ibutton3.isPressed()) {

                if (CalculateMainNumber() !== 0){
                    // Go further to next numbers/level
                    if (number.isActive()){
                        // "Confirm with reset"
                        interateNumbers();
                        number.deactivate();
                        blinkFlag = false;
                    }
                    resetButtons();
                    score.setResetSymbol();
                }else{
                    //Reset button pressed when no numbers are given on the button, reset program
                    numLevel = 10;
                    interateNumbers();
                    score.resetPoints();
                    buttonSound.setVolume(0.4);
                    buttonSound.play();

                }
            }
            // Check if "done" button is pressed
            if ((ibutton4 && ibutton4.isPressed()) && (!number.isActive())) {
                if (number.checkNumber(CalculateMainNumber())) {
                    // Number is calculated correctly
                    number.activate();
                    score.setSymbol(CalculateMainNumber());
                    score.addPoint();
                    playSound(correctSound);

                    if (score.getPoints()>=3){
                        confetti.reset();
                    }
                }
                else {
                    // False answer
                    //score.setFalseSymbol();
                    playSound(falseSound);
                }
            }

            if (calculator && p.mouseY > calculator.getButtonY() && event.target.tagName.toLowerCase() === 'canvas') {
                return false
            }
        }

    }

    // touch event
    p.touchStarted = (event) => {
        if(iOS) {
            handleClick(event)
        }

    };

    p.mouseClicked = (event) => {
        if(!iOS) {
            handleClick(event)
        }
    }
}
