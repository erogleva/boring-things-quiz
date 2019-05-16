export default class infoButton {
    constructor (c,e,rf, p){
        this.xc = 0;
        this.yc = 0;
        this.w = 0;
        this.h = 0;
        this.e = e;
        this.color = c;
        this.textString = '';
        this.resizeFactor = rf;
        this.p = p;
    }

    update(x,y,w,h,e){
        this.xc = x;
        this.yc = y;
        this.w = w/this.resizeFactor;
        this.h = h/this.resizeFactor;
    }

    show(tBlinkFlag=false){
        this.p.fill(this.color);
        if (!tBlinkFlag){
            this.p.noStroke()
        }
        else{
            this.p.stroke(0)
            this.p.strokeWeight(parseInt(3/this.resizeFactor))
        }
        this.p.rectMode(this.p.CENTER);
        this.p.rect(this.xc, this.yc, this.w,this.h, this.e);
        this.p.noStroke()
        this.showText();
    }

    showText() {
        this.p.fill('black');
        this.p.textFont('Courier');
        let tSize = parseInt(28/this.resizeFactor)
        this.p.textSize(tSize);
        this.p.textAlign(this.p.CENTER, this.p.CENTER)
        this.p.text(this.p.str(this.textString), this.xc, this.yc);
        
    }

    setText(t){
        this.textString = t;
    }
    getText(){
        return this.textString;
    }

    getX(){
        return this.xc - this.w/2;
    }
    getY(){
        return this.yc - this.h/2;
    }
    isPressed(){
        if ((this.p.mouseX <= (this.getX()+this.w)) && (this.p.mouseX >= this.getX()) && (this.p.mouseY <= (this.getY()+this.h)) && (this.p.mouseY>=this.getY())){
            return true;
        } 
        else{
            return false;
        }
    }
}