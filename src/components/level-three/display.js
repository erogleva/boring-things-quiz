export default class display {
    constructor (w,h,e,p){
        
        this.w = w;
        this.h = h;
        this.e = e;
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
        this.p.fill('black');
        this.p.textFont('Verdana');
        this.p.textSize(25);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text(this.p.str(t), this.x, this.y);
    }

}
