const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

const getCartListFromFile = cb => {
    const p = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        'cart.json'
    );
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Cart {
    constructor({title, price, quantity}) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }

    addToCart(product) {
        getCartListFromFile(cartList => {
            cartList.push(this);
            fs.writeFile(p, JSON.stringify(cartList), (err) => {
                if (err) {
                    console.error(err);
                }
            })
        });
    }

    static fetchAll(cb) {
        getCartListFromFile(cb);
    }
}