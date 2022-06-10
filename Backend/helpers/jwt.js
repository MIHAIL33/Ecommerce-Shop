const expressJwt = require('express-jwt')

function authJwt() {
    const api = process.env.API_URL;
    const secret = process.env.secret
    const regProducts = new RegExp(api + "/products(.*)")
    const regCategories = new RegExp(api + "/categories(.*)")
    const regOrders = new RegExp(api + "/orders(.*)")
    const regPublic = new RegExp(`/${process.env.uploadPath}(.*)`)
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: regPublic, methods: ['GET', 'OPTIONS']},
            {url: regProducts, methods: ['GET', 'OPTIONS']},
            {url: regCategories, methods: ['GET', 'OPTIONS']},
            {url: regOrders, methods: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`
            //{url: /(.*)/}
        ]
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }

    done()
}

module.exports = authJwt