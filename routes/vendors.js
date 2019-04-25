const vendorRoute = require('express').Router();
const Vendors = require('../db').Vendors;

vendorRoute.get('/', async (req, res) => {
    const vendors = await Vendors.findAll()
    if (vendors.length == 0) {
        res.send({ message: 'No vendor registered', success: false })
    } else {
        res.send({ data: vendors, success: true })
    }
})

vendorRoute.post('/', async (req, res) => {
    try {
        name = req.body.name;
        if (name != '' || name == null) {
            const result = await Vendors.create({
                vendorName: req.body.name,
            })
            res.status(200);
            res.send({
                success: true,
                newLength: await Vendors.findAll().length
            })
        } else {
            res.status(200);
            res.send({
                success: false,
                message: "Vendor name can't be empty."
            })
        }
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
})

vendorRoute.delete('/', async (req, res) => {
    const record = await Vendors.destroy({
        where: {
            id: parseInt(req.body.id)
        }
    })
    if (record == 0) {
        res.send({
            success: false,
            message: "error while deleting vendor"
        })
    } else {
        res.send({
            success: true,
            message: "vendor deleted successfully"
        })
    }
})

vendorRoute.get('/name/:name', async (req, res) => {
    var vendor = req.params.name;
    try {
        const record = await Vendors.findAll({
            where: {
                vendorName: vendor
            }
        })
        if (record == 0) {
            res.send({
                success: false,
                message: "No record found!"
            })
        } else {
            res.send({
                success: true,
                data: record[0].id
            })
        }
    } catch (e) {
        res.send({
            success: false,
            data: e.message
        });
    }
});

vendorRoute.get('/id/:id', async (req, res) => {
    var id = parseInt(req.params.id);
    try {
        const record = await Vendors.findAll({
            where: {
                id: id
            }
        })
        if (record == 0) {
            res.send({
                success: false,
                message: "No record found!"
            })
        } else {
            res.send({
                success: true,
                data: record[0].vendorName
            })
        }
    } catch (e) {
        res.send({message: e.message});
    }
});

module.exports = vendorRoute;