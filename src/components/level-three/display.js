export default class display {
    constructor (w,h,e,rf,p){
        
        this.w = parseInt(w/rf);
        this.h = parseInt(h/rf);
        this.e = parseInt(e/rf);
        this.resizeFactor = rf
        this.r = p.random(255);
        this.g = p.random(255);
        this.b = p.random(255);
        this.p = p;
    }
    show(x,y,t) {
        this.x = x;
        this.y = y;
        this.p.rectMode(this.p.CENTER);
        this.p.noStroke();
        this.p.fill(this.r, this.g, this.b);
        this.p.rect(this.x, this.y, this.w, this.h, this.e);
        this.text(t);
    }

    color(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    text(t) {
        let tSize = parseInt(25/this.resizeFactor);
        this.p.fill('black');
        this.p.textFont('Verdana');
        this.p.textSize(tSize);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text(this.p.str(t), this.x, this.y);
    }

}
