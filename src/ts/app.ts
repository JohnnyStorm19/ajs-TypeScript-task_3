import Gadget from "./domain/Gadget";
import Book from "./domain/Book";
import MusicAlbum from "./domain/MusicAlbum";
import Cart from "./services/Cart";

const cart = new Cart;

cart.add(new Gadget(1, 'iphone', '12', 64000));
cart.add(new Gadget(1, 'iphone', '12', 64000));
cart.add(new Gadget(1, 'iphone', '12', 64000));
cart.add(new Gadget(1, 'iphone', '12', 64000));
cart.add(new Gadget(2, 'honor', 'MateBook D 15', 56000));
cart.add(new Book(3, 'Why do we sleep', 'Matthew Walker', 800, 450));
cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));
cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));

console.log('Все товары в корзине: ', cart.items);

cart.deleteItemFromCart(1);
cart.deleteItemFromCart(4);

console.log('Удалили из корзины 1 айфон и 1 альбом, теперь в корзине: ', cart.items);
console.log('Общая стоимость: ', cart.getOverallPrice());
console.log('общая стоимость со скидкой 20%: ', cart.getPriceWithDiscount(20));