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
    req.user.createProduct({title, imageUrl, price, description})
        .then((result) => {
            console.log('Created Product');
            res.redirect('/');
        }).catch(err => {
        console.log("Error: ", err);
    });
};

exports.postEditProduct = (req, res) => {
    Product.findByPk(req.body.productId).then((product) => {
        product.title = req.body.title;
        product.imageUrl = req.body.imageUrl;
        product.price = req.body.price;
        product.description = req.body.description;
        return product.save();
    })
        .then(result => {
            console.log('Updated Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log("Error: ", err);
        })
}

exports.getProducts = (req, res) => {
    req.user.getProducts()
        .then((products) => {
                res.render('admin/products', {
                    prods: products,
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
    req.user.getProducts({where: {id: prodId}}).then((products) => {
        const product = products[0];
        if (!product) {
            console.log('Product not found');
            return res.redirect('/'); // show error
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        })
    }).catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).then((product) => {
        return product.destroy();
    })
        .then(result => {
            console.log('Destroyed Product');
            res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        });

}