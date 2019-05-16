export default class scoreObj {
    constructor(counterStartValue,maxScore){
        this.points = 0;
        this.maxScore = maxScore;
        this.resetSymbol = "?"
        this.symbol = this.resetSymbol;
    }

    addPoint(){
        this.points++;
    }
    removePoint(){
        this.points--;
        if(this.points<0) this.points = 0;
    }
    resetPoints(){
        this.points = 0;
    }
    getPoints(){
        return this.points;
    }
    isMaxScore(){
        if (this.points >=this.maxScore){
            return true
        }
        else return false;
    }
    setSymbol(x){
        this.symbol = x.toString();
    }
    setFalseSymbol(){
        this.symbol = "X";
    }
    setResetSymbol(){
        this.symbol = this.resetSymbol;
    }
    getSymbol(){
        return this.symbol;
    }
}