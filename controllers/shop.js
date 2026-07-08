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
    Cart.getCart((cart) => {
       Product.fetchAll((products) => {
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
       })
    });
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect(`/cart`);

}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
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

