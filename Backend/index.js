const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

const productsRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories')
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders')

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const { application } = require('express');

require('dotenv/config')

const app = express();

const api = process.env.API_URL;

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use(`/${process.env.uploadPath}`, express.static(__dirname + `/${process.env.uploadPath}`))
app.use(errorHandler)

app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connection is ready...')
    }).catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {

})