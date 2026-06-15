const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    const p = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        'products.json'
    );
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor({title, price}) {
        this.title = title;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.error(err);
                }
            })
        });
    }

    static fetchAll(cb) {
       getProductsFromFile(cb);
    }
}