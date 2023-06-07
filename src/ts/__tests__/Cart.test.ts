import Gadget from "../domain/Gadget";
import Book from "../domain/Book";
import MusicAlbum from "../domain/MusicAlbum";
import Cart from "../services/Cart";

test('Class instances are created', () => {
    expect(new Gadget(1, 'iphone', '12', 64000)).toEqual({
        id: 1, 
        name: 'iphone', 
        model: '12', 
        price: 64000, 
        count: 1
    });
    expect(new Gadget(2, 'honor', 'MateBook D 15', 56000)).toEqual({
        id: 2, 
        name: 'honor', 
        model: 'MateBook D 15', 
        price: 56000, 
        count: 1
    });
    expect(new Book(3, 'Why do we sleep', 'Matthew Walker', 800, 450)).toEqual({
        id: 3, 
        name: 'Why do we sleep', 
        author: 'Matthew Walker', 
        price: 800, 
        pages: 450
    });
    expect(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500)).toEqual({
        id: 4, 
        name: 'Shorten the longing', 
        author: 'Biting Elbows', 
        price: 3500
    });
    expect(new Cart).toEqual({
        _items: []
    });
});
test('Adding items to cart', () => {
    const cart = new Cart;

    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(2, 'honor', 'MateBook D 15', 56000));
    cart.add(new Book(3, 'Why do we sleep', 'Matthew Walker', 800, 450));
    cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));
    cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));

    expect(cart.items).toEqual([
        {
            id: 1, 
            name: 'iphone', 
            model: '12', 
            price: 64000, 
            count: 4
        },
        {
            id: 2, 
            name: 'honor', 
            model: 'MateBook D 15', 
            price: 56000, 
            count: 1
        },
        {
            id: 3, 
            name: 'Why do we sleep', 
            author: 'Matthew Walker', 
            price: 800, 
            pages: 450
        },
        {
            id: 4, 
            name: 'Shorten the longing', 
            author: 'Biting Elbows', 
            price: 3500
        },
        {
            id: 4, 
            name: 'Shorten the longing', 
            author: 'Biting Elbows', 
            price: 3500
        }
    ])
})
test('Getting overall price', () => {
    const cart = new Cart;

    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(2, 'honor', 'MateBook D 15', 56000));
    cart.add(new Gadget(2, 'honor', 'MateBook D 15', 56000));
    cart.add(new Book(3, 'Why do we sleep', 'Matthew Walker', 800, 450));
    cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));
    cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));

    expect(cart.getOverallPrice()).toBe(311800);
});
test('Getting price with discount', () => {
    const cart = new Cart;

    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(2, 'honor', 'MateBook D 15', 56000));
    cart.add(new Book(3, 'Why do we sleep', 'Matthew Walker', 800, 450));
    cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));
    cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));

    expect(cart.getPriceWithDiscount(50)).toBe(127900);
    expect(cart.getPriceWithDiscount(25)).toBe(191850);
});
test('Delete item from cart', () => {
    const cart = new Cart;

    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(2, 'honor', 'MateBook D 15', 56000));
    cart.add(new Book(3, 'Why do we sleep', 'Matthew Walker', 800, 450));
    cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));
    cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));

    cart.deleteItemFromCart(1);
    cart.deleteItemFromCart(2);
    cart.deleteItemFromCart(4);

    expect(cart.items).toEqual([
        {
            id: 1, 
            name: 'iphone', 
            model: '12', 
            price: 64000, 
            count: 2
        },
        {
            id: 3, 
            name: 'Why do we sleep', 
            author: 'Matthew Walker', 
            price: 800, 
            pages: 450
        },
        {
            id: 4, 
            name: 'Shorten the longing', 
            author: 'Biting Elbows', 
            price: 3500
        }

    ])
});
test('Throwing an error when "id" does not exist in cart.items', () => {
    const cart = new Cart;

    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(1, 'iphone', '12', 64000));
    cart.add(new Gadget(2, 'honor', 'MateBook D 15', 56000));
    cart.add(new Book(3, 'Why do we sleep', 'Matthew Walker', 800, 450));
    cart.add(new MusicAlbum(4, 'Shorten the longing', 'Biting Elbows', 3500));

    expect(() => {
        cart.deleteItemFromCart(5);
    }).toThrow('В корзине отсутствует товар по данному id');
});