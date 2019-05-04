import picture from './image';
import numberObj from './numbers';
import button from './button';
import display from './display';
import infoButton from './smallbuttons';


export default function sketch(p) {

    let imgPosX;
    let imgPosY;
    const numLevelMax = 1000;
    var numLevel = 1;
    var points = 0;
    var resizeFactor; 
    const originalPictureSize = 800;
    var buttonPic;
    var machinePic;
    var buttonSound;

    var calculator;
    var number;
    var button1, button2, button3, button4, button5, button6;
    var display1, display2, display3, display4, display5, display6;
    var ibutton1, ibutton2, ibutton3, ibutton4;

    //?? map function to map wheel and number together ? :)

    var buttonArray = [];
    var displayArray = [];

    //object oriented programming, one for every circle :)

    var ranColor = {
        r: 0,
        g: 0,
        b: 0
    };

    function LoadRanCol() {
        ranColor.r = p.random(255);
        ranColor.g = p.random(255);
        ranColor.b = p.random(255);
    }

    function interateNumbers() {
        number.generateRandomNumbers(numLevel * 10, 1);
        numLevel = numLevel * 10;
        if (numLevel >= numLevelMax) numLevel = numLevelMax;
    }

    console.log(p);

    p.preload = () => {
        buttonPic = p.loadImage(require('./data/Knopf3.gif'));
        machinePic = p.loadImage(require('./data/Rechenmaschine_neu6.gif'));
        p.soundFormats('mp3');
        buttonSound = p.loadSound(require('./data/sound.mp3'));
    };

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        imgPosX = p.windowWidth / 2;
        imgPosY = p.windowHeight / 2;
        // pick colors randomly
        LoadRanCol();

        // Calculate the reset factor based on the original size of the calculator
        resizeFactor = originalPictureSize/Math.min(window.innerWidth,window.innerHeight);
        
        // Resize the pictures to fit to screen
        buttonPic.resize(60/resizeFactor,60/resizeFactor);
        machinePic.resize(originalPictureSize/resizeFactor,originalPictureSize/resizeFactor);
        
        calculator = new picture(imgPosX,imgPosY, machinePic,resizeFactor,p);


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
        display1 = new display(50, 28, 10,resizeFactor, p); // round edge does not work
        display2 = new display(50, 28, 10,resizeFactor, p);
        display3 = new display(50, 28, 10,resizeFactor, p);
        display4 = new display(50, 28, 10,resizeFactor, p);
        display5 = new display(50, 28, 10,resizeFactor, p);
        display6 = new display(50, 28, 10,resizeFactor, p);

        // Create display array. The index refers to the button with the same index in buttonarray
        displayArray.push(display1, display2, display3, display4, display5, display6);

        // number pluss number
        ibutton1 = new infoButton(250, 20,resizeFactor, p);
        // points
        ibutton2 = new infoButton(250, 10,resizeFactor, p);
        // reset button
        ibutton3 = new infoButton(250, 20,resizeFactor, p);
        // done button
        ibutton4 = new infoButton(250, 20,resizeFactor, p);
    };

    p.draw = () => {
        // Draws the Background
        p.background(ranColor.r, ranColor.g, ranColor.b);

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

        ibutton1.update(imgPosX, calculator.getY() + 0.168 * calculator.getHeight(), 300, 45);
        ibutton1.setText(p.str(number.getNumber(0)) + '+' + p.str(number.getNumber(1)) + ' =  ? ');
        ibutton1.show();

        ibutton2.update(imgPosX - (0.25) * calculator.getWidth(), calculator.getY() + 0.168 * calculator.getHeight(), 45, 45);
        ibutton2.setText(p.str(points));
        ibutton2.show();

        ibutton3.update(imgPosX - (1 / 5) * calculator.getWidth(), calculator.getY() + (0.83) * calculator.getHeight(), 200, 50);
        ibutton3.setText('Reset');
        ibutton3.show();

        ibutton4.update(imgPosX + (1 / 5) * calculator.getWidth(), calculator.getY() + (0.83) * calculator.getHeight(), 200, 50);
        ibutton4.setText('Done!');
        ibutton4.show();
    };

    p.windowResized = () => {
        console.log('here');
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
            // Loads new random colors
            LoadRanCol();
            if (PressedButton.rotateRight()) {
                RotateConnectedButton(PressedButton);
            }
            ConnectedDisplay.color(p.random(255), p.random(255), p.random(255))
        }
    }

    function resetButtons() {
        buttonArray.forEach(function (buttonElement, i) {
            buttonElement.reset();
        });
        buttonSound.setVolume(0.4);
        buttonSound.play();
    }

    function CalculateMainNumber() {
        let value = 0;
        buttonArray.forEach(function (buttonElement, i) {
            value = value + buttonElement.getValue();
        });
        return value;
    }

    p.keyPressed = () => {
        // If Enter is pressed
        if (p.keyCode === p.ENTER) {
            // Generate new numbers
            //interateNumbers();
            interateNumbers();
        }
    };

    // when user clicks mouse
    p.mouseClicked = () => {
        // Goes through all the button objects
        buttonArray.forEach(function (buttonElement, i) {
            // Calls the Button pressed function for each object with the connected display
            ButtonPressed(buttonElement, displayArray[i]);
        });

        // Check if reset button is pressed
        if ((ibutton3.isPressed()) && (CalculateMainNumber() !== 0)) {
            resetButtons();
        }
        // Check if "done" button is pressed
        if (ibutton4.isPressed()) {
            if (number.checkNumber(CalculateMainNumber())) {
                interateNumbers();
                resetButtons();
                points = points + 1;
            }
            else {
                // False answer
                buttonSound.setVolume(0.4);
                buttonSound.play();
                points = 0;
            }
        }
    }
}
