const express = require('express')
const userRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendors');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cartItems')
const db = require('./db').db;
const app = express()
const PORT = process.env.PORT || 8988

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/',
  express.static(__dirname + '/public')
)
app.use('/user', userRoutes)
app.use('/vendors', vendorRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)

db.sync()
  .then(() => {
    app.listen(PORT)
  })