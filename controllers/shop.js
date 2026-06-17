const Product = require('../models/product');
const Cart = require("../models/cart");


exports.getIndex = (req, res) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
}

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
}

exports.getCart = (req, res) => {
    Cart.fetchAll((cartList) => {
        res.render('shop/cart', {
            items: cartList,
            pageTitle: 'Your Cart',
            path: '/cart',
        });
    });
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

