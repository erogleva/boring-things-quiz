class Drop {
	
	constructor (x, y, w, h,ymax,p) {
		this.p = p;
		this.x = x;
        this.yInit = y;
        // Start Outside window so it does not fall on startup 
		this.w = w;
        this.h = h;
        this.ymax = ymax;
        this.y = ymax;
		this.yspeed = this.p.random(2, 7);
	}

	fall () {
        if (this.y < this.ymax){
            this.y = this.y + this.yspeed;
        }
	}
	show () {
		this.p.noStroke();
		this.p.fill(this.p.random (0, 255), this.p.random (0, 255), this.p.random (0, 255), 100);
		this.p.ellipse(this.x, this.y, this.w, this.h);
    }
    reset(){
        this.y = this.yInit
    }
    isDown(){
        return (this.y >= this.ymax)
    }
}

export default class Drops{
	constructor(x,y,w,h,n,rf,ymax,p){
        this.drops=[]
        let xl = 400/rf;

		for (let i = 0; i < n; i++) {
  			this.drops.push(new Drop(p.random(x-xl, x+xl),y-(p.random(0,100/rf)),w/rf,h/rf,ymax,p))
		}
	}

	show(){
		for (let i = 0; i < this.drops.length; i++) {
  		this.drops[i].show();
  		}
	}

	fall(){
		for (let i = 0; i < this.drops.length; i++) {
  			this.drops[i].fall();
  		}
    }
    reset(){
        this.drops.forEach(function (dropElement, i) {
            dropElement.reset();
        });
    }
    isDown(){
        let retVal = true;
        this.drops.forEach(function (dropElement, i) {
            if (!dropElement.isDown()){
                retVal = false;
            }
        });
        return retVal;
    }   
}