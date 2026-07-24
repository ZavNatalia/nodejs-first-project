const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({title, imageUrl, description, price});
    product.save().then(() => {
        res.redirect('/');
    }).catch(error => {
        console.log(error);
    });

};

exports.postEditProduct = (req, res) => {
    const updatedProduct = new Product({
        id: req.body.productId,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
    });
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then((rows) => {
                res.render('admin/products', {
                    prods: rows,
                    pageTitle: 'Admin Products',
                    path: '/admin/products',
                });
            }
        ).catch(err => console.log(err));
};

exports.getEditProduct = (req, res) => {
    const editMode = Boolean(req.query.edit);
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        if (!product) {
            console.log('Product not found');
            return res.redirect('/'); // show error
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    })

};

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}