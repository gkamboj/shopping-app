const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite', //mysql, postgress, mssql : other options
    storage: __dirname + '/shop.db' //this storage field has no meaning for server based dbs
})

const Vendors = db.define('vendor', {
    vendorName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
})

const Users = db.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email : {
        type : Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

const Products = db.define('product',
{
    productName : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price : {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

const CartItems = db.define('cartItem',
{
    productName : {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalPrice : {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Users.hasMany(CartItems, {onDelete:"CASCADE"})
CartItems.belongsTo(Users, {onDelete: "CASCADE"})

Vendors.hasMany(Products, {onDelete:"CASCADE"})
Products.belongsTo(Vendors, {onDelete:"CASCADE"})

Products.hasMany(CartItems, {onDelete:"CASCADE"})
CartItems.belongsTo(Products, {onDelete:"CASCADE"})

module.exports = {
    db, Vendors, Users, Products, CartItems
}