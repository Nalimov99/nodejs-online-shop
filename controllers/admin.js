const Products = require('../models/product')
const Product = require('../models/product')

exports.getAddProductPage = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body)
    product.save()
    res.redirect('/')
}

exports.getEditProduct = (req, res) => {
    const editMode = (req.query.editing === "true")
    const {id} = req.params
    Product.getProductById(id, product => {
        if(!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    })
}

exports.postEditProduct = (req, res) => {
    const {id} = req.params
    Product.editProductById(id, req.body)

    res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res) => {
    const {id} = req.params
    Product.deleteProductById(id)
    res.redirect('/admin/products')
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            path: '/admin/products',
            pageTitle: 'All Products',
            prods: products
        })
    })
}