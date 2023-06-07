import Buyable from "../domain/Buyable";
import Gadget from "../domain/Gadget";

export default class Cart {
    _items: Buyable[] = [];
    add(item: Buyable): void {
        //находим добавляемый товар в корзине
        const index: number = this._items.findIndex(obj => obj.id === item.id);
        //если добавляемый товар уже есть в корзине
        if(index != -1) {
            let currentItem = this._items[index];
            //если добавляемый товар является гаджетом (телефон, ноут и т.д.)
            if(currentItem instanceof Gadget && item.count) {
                currentItem.count = currentItem.count + item.count;
            } else {
                this._items.push(item); 
            }
            return;
        }
        //добавляемого товара в корзине нет.
        this._items.push(item);
    }
    get items(): Buyable[] {
        return [...this._items];
    }
    getOverallPrice(): number {
        let res = this._items.reduce((acc: number, item: Buyable) => {
            if(item instanceof Gadget) {
                acc += item.getSum();
            } else {
                acc += item.price;
            }
            return acc;
        }, 0)
        return res;
    }
    getPriceWithDiscount(discount: number): number {
        const overallPrice = this.getOverallPrice();
        return overallPrice - (discount / 100 * overallPrice);
    }
    deleteItemFromCart(id: number): void {
        const index: number = this._items.findIndex(obj => obj.id === id);
        if(index != -1) {
            let currentItem = this._items[index];
            if(currentItem instanceof Gadget && currentItem.count > 1) {
                currentItem.count -= 1;
            } else if(currentItem instanceof Gadget && currentItem.count < 2) {
                this._items.splice(index, 1);
            } else {
                this._items.splice(index, 1);
            }
            return;
        }
        throw new Error('В корзине отсутствует товар по данному id');
    }
}