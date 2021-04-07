const fs = require('fs')
const path = require('path')

const _path = path.join(process.cwd(), 'data', 'cart.json')

module.exports = class Cart {
    static getCart = (cb) => {
        fs.readFile(_path, (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            return cb(JSON.parse(data))
        })
    }

    static addToCart = (id, productPrice) => {
        fs.readFile(_path, (err, data) => {
            let cart = {products: [], totalPrice: 0}
            if(!err && data.length > 0) {
                cart = JSON.parse(data)
            }
            const existingProductIdx = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIdx]
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.qty = existingProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIdx] = updatedProduct
            }
            else {
                updatedProduct = {id: id, qty: 1}
                cart.products.push(updatedProduct)
            }
            cart.totalPrice = cart.totalPrice + productPrice
            fs.writeFile(_path, JSON.stringify(cart), (err) => {
                if(err) {
                    console.log(err);
                }
            })
        })
    }

    static deleteById = (id, prodPrice) => {
        fs.readFile(_path, (err, data) => {
            if(err) {
                console.log(error);
                return;
            }

            const cart = {...JSON.parse(data)}
            const product = cart.products.find(prod => prod.id === id)
            if(product) {
                const totalPrice = cart.totalPrice - product.qty*prodPrice
                const updatedProducts = cart. products.filter(prod => prod.id !== product.id)
                const updatedCart = {products:[...updatedProducts], totalPrice}
                fs.writeFile(_path, JSON.stringify(updatedCart), (err) => {
                    if(err) {
                        console.log(err);
                    }
                })
            }
        })
    }
}