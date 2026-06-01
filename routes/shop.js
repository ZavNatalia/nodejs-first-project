const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res)=>{
    // res.sendFile(path.join(rootDir,'views', 'shop.html')); //html
    const products = adminData.products;
    res.render('shop', {prods: products, docTitle: 'Shop'});

});

module.exports = router;
