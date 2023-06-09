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
            if(currentItem instanceof Gadget) {
                //перезаписываем исходный массив
                this._items = this._items.map(obj => {
                    //находим нужную позицию и важно, чтобы она была инстансом Gadget
                    if(obj instanceof Gadget && obj.id === currentItem.id) {
                        //создаем новый инстанс класса Gadget, чтобы избежать мутабельности
                        let newItem = new Gadget(obj.id, obj.name, obj.model, obj.price);
                        //по умолчанию свойство count = 1, и к нему прибавляем имеющееся количество
                        newItem.count += obj.count;
                        return newItem;
                    }
                    return obj;
                })
            } else {
                this._items.push(item); 
            }
            return;
        }
        //если добавляемого товара в корзине нет, то нужно понимать является ли он исчисляемым? т.е инстансом Gadget
        const isGadget = item instanceof Gadget;
        if(isGadget) {
            //создаем новый инстанс, чтобы не мутировать исходный
            this._items.push(new Gadget(item.id, item.name, item.model, item.price, item.count));
        } else {
            //здесь нет смысла создавать, т.к. инстансы кроме Gadget не изменяются
            this._items.push(item);
        }
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