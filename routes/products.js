const productRoute = require('express').Router();
const Products = require('../db').Products;
const Vendors = require('../db').Vendors;

productRoute.get('/', async (req, res) => {
    const products = await Products.findAll({
        include:Vendors
    })
    if (products.length == 0) {
        res.send({ message: 'No product registered', success: false })
    } else {
        res.send({ data: products, success: true })
    }
});

productRoute.post('/', async (req, res) => {
    try {
        name = req.body.name;
        price = req.body.price;
        if (name != '' && name != null && price != '' && price != null) {
            const result = await Products.create({
                productName: name,
                price: price,
                vendorId: req.body.vendorId
            })
        res.status(200);
        res.send({
            success: true,
            newLength: await Products.findAll().length
        })
    } else {
        res.status(200);
        res.send({
            success: false,
            message: "This field can't be empty."
        })
    }
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
});

productRoute.delete('/', async (req, res) => {
    const record = await Products.destroy({
        where: {
            id: parseInt(req.body.id)
        }
    })
    if (record == 0) {
        res.send({
            success: false,
            message: "error while deleting product"
        })
    } else {
        res.send({
            success: true,
            message: "product deleted successfully"
        })
    }
});

module.exports = productRoute;