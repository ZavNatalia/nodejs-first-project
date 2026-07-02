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

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        res.render('shop/product-detail', {
            product: product,
            productTitle: product.title,
            pageTitle: 'Product',
            path: '/products/', // mark as active in the menu
        })
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

exports.postCart = (req, res) => {
    const productId = req.body.productId;
    console.log(productId);
    res.redirect(`/cart`);

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

