export default class numberObj{
    constructor(nArraySize, p){
        this.n = [];
        for (let i = 0; i < nArraySize; i++){
            this.n.push(0);
        }
        
        this.active = false;
        this.p = p;
    }
    generateRandomNumbers(base,offset){
        for (let i = 0; i < this.n.length; i++) { 
            this.n[i] = parseInt(this.p.random(base)+offset);
          }
    }
    // not used
    setNumber(n,value){
        if(n < this.n.length){
            this.n[n] = parseInt(value);
        }
    }
    getNumber(n){
        if(n < this.n.length){
            return this.n[n];
        }
    }
    checkNumber(fvalue){
        const arrSum = arr => arr.reduce((a,b) => a + b, 0);
        if (fvalue===arrSum(this.n)){
            return true;
        }
        else{
            return false;
        }
    }

}