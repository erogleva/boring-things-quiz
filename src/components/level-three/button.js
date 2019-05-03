export default class button {
    constructor (d,img,sound,connectedIndex,base, p){
        
        this.d = d;
        this.r = p.random(255);
        this.g = p.random(255);
        this.b = p.random(255);
        this.angle =0;
        this.img = img;
        this.sound = sound;
        this.connectedIndex = connectedIndex;
        this.base = base;
        this.p = p;
    }
    show(x,y) {
        this.x = x;
        this.y = y;
        // Saves the previous context
        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.rotate(this.p.PI / 180 * this.angle);
        this.p.imageMode(this.p.CENTER);
        this.p.image(this.img, 0, 0);
        // Restores the previous context
        this.p.pop();

    }
    rotateRight(){
        this.angle = this.angle + 36;
        if (this.angle >=360) {
            this.angle=0;
            return true;
        }
        else{
            return false;
        }
    }
    getPosition(){
        return this.angle/36
    }

    color(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    randColor(){
        this.color(this.p.random(255),this.p.random(255),this.p.random(255));
    }

    isPressed() {
	    if (this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y) < (this.d/2)) {
            this.playSound()
            return true;
        }
        else {
            return false;
        }
    }

    playSound(){
        this.sound.setVolume(0.4);
        this.sound.play();
    }
    
    reset(){
        this.angle=0;
    }
    getConnectedIndex(){
        return this.connectedIndex;
    }
    getValue(){
        return this.getPosition()*this.base;
    }

}