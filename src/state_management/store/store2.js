import { makeAutoObservable } from 'mobx';

class Store2 {

    qty = 0;

    constructor(){
        makeAutoObservable(this)
    }

    incrementQty(){
        this.qty +=1;
    }

}
export default  Store2;