const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            path: '/',
            pageTitle: 'Shop'
        })
    })
}

exports.getProduct = (req, res) => {
    const prodId = req.params.productId
    Product.getProductById(prodId, product => {
        res.render('shop/product-detail', {
            product,
            pageTitle: product.title,
            path: '/products'
        })
    })
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            path: '/products',
            pageTitle: 'Shop'
        })
    })
}

exports.getCart = (req, res) => {
    Cart.getCart(cart => {
        const cartProducts = []
        Product.fetchAll(products => {
            products.forEach(element => {
                const cartProductsData = cart.products.find(prod => prod.id === element.id)
                if(cartProductsData) {
                    cartProducts.push({productData: element, qty: cartProductsData.qty})
                }
            });

            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'cart',
                products: cartProducts,
                totalPrice: cart.totalPrice
            })   
        })
    })

}

exports.postCart = (req, res) => {
    const {productId} = req.body
    Product.getProductById(productId, product => {
        Cart.addToCart(productId, product.price)
    })
    res.redirect('/cart')
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'checkout'
    })
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your orders'
    })
}

