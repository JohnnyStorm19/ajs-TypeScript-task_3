import Buyable from "./Buyable";

export default class Gadget implements Buyable {
    count: number;
  
    constructor(
        readonly id: number,
        readonly name: string,
        readonly model: string,
        readonly price: number,
        count: number = 1,
    ) {
        this.count = count;
        
     }
     getSum(): number {
        return this.price * this.count;
    }
  }