const cartRoute = require('express').Router();
const Products = require('../db').Products;
const Users = require('../db').Users;
const Vendors = require('../db').Vendors;
const CartItems = require('../db').CartItems

cartRoute.get('/:id', async (req, res) => {
    const cartItems = await CartItems.findAll({
        include: [
            {
                model: Products,
                include: [Vendors]
            },
            Users
        ],
        where: {
            userId: parseInt(req.params.id)
        }
    })
    if (cartItems.length == 0) {
        res.send({ message: 'No items in cart', success: false })
    } else {
        res.send({ data: cartItems, success: true })
    }
});

cartRoute.post('/', async (req, res) => {
    var prev = await CartItems.findOne({
        where: {
            productId: req.body.productId,
            userId: req.body.userId,
        }
    })
    if (req.body.quantity == '' || req.body.quantity <= 0) {
        res.send({
            success: false,
            message: 'Quantity must be greter than or equalt to 1 to add product to cart'
        })
    } else if (req.body.quantity > 5) {
        res.send({
            success: false,
            message: "Quantity can't be greater than 5"
        })
    } else if (!(Number.isInteger(parseFloat(req.body.quantity)))) {
        res.send({
            success: false,
            message: "Quantity value must be natural number only"
        })
    }
    else if (prev == null) {
        try {
            const result = await CartItems.create({
                quantity: req.body.quantity,
                totalPrice: req.body.totalPrice,
                userId: req.body.userId,
                productId: req.body.productId,
                productName: req.body.productName
            })
            res.send({ success: true, data: result })
        } catch (err) {
            res.send({ success: false, message: "If you are new user, please logout and login again using your credentials to use this application." })
        }
    } else {
        const newResult = CartItems.update(
            {
                quantity: req.body.quantity,
                totalPrice: req.body.totalPrice
            }, {
                where: {
                    productId: req.body.productId,
                    userId: req.body.userId
                }
            })
        res.send({ success: true, data: newResult, message: 'Cart is Updated' })
    }
})

cartRoute.delete('/', async (req, res) => {
    const record = await CartItems.destroy({
        where: {
            id: req.body.id
        }
    })
    if (record == 0) {
        res.send({
            success: false,
            message: "error while deleting"
        })
    } else {
        res.send({
            success: true,
            message: "deleted successfully"
        })
    }
})

module.exports = cartRoute;