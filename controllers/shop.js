const Product = require('../models/product');
const Cart = require("../models/cart");

exports.getIndex = (req, res) => {
    Product.findAll().then((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    }).catch((err) => {
        console.log('Error: ', err);
    });
}

exports.getProducts = (req, res) => {
    Product.findAll().then((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    }).catch((err) => {
        console.log('Error: ', err);
    });
}

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId).then((product) => {
        res.render('shop/product-detail', {
            product: product,
            productTitle: product.title,
            pageTitle: 'Product',
            path: '/products/', // mark as active in the menu
        })
    }).catch((err) => {
        console.log('Error: ', err);
    });
}

exports.getCart = (req, res) => {
    Cart.getCart((cart) => {
        Product.findAll().then((products) => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                items: cart,
                products: cartProducts,
                pageTitle: 'Your Cart',
                path: '/cart',
            });
        }).catch((err) => {
            console.log('Error: ', err);
        });
    });
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).then((product) => {
        Cart.addProduct(prodId, product.price);
        res.redirect(`/cart`);
    }).catch((err) => {
        console.log('Error: ', err);
    });
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).then((product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    }).catch((err) => {
        console.log('Error: ', err);
    });
}

exports.getOrders = (req, res) => {
    // Orders.fetchAll((orders) => {
    res.render('shop/orders', {
        // items: orders,
        pageTitle: 'Your Orders',
        path: '/orders',
    });
    // });
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

