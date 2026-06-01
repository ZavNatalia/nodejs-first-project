const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res)=>{
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); //  html
    res.render('add-product', {pageTitle: 'Add Product'});
});

router.post('/add-product', (req, res, next)=> {
    products.push({title: req.body.title, price: req.body.price});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;