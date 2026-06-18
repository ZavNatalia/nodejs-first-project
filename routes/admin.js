const express = require('express');
const {getAddProduct, postAddProduct, getProducts, getEditProduct, postDeleteProduct} = require("../controllers/admin");
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getProducts);

// /admin/edit-product => GET
router.get('/edit-product', getEditProduct);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

router.post('/delete-product', postDeleteProduct)


module.exports = router;